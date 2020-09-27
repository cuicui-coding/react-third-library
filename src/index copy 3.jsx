import { trace, spy, toJS, observe, observable, action, computed } from "mobx";
import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import { observer, PropTypes as ObservablePropTypes } from "mobx-react";

const map = observable.map({ key: "value"});
map.set("key", "new value");

console.log(map)




class Todo {
  id = Math.random();
  @observable title = "";
  @observable finished = false;

  constructor(title) {
    this.title = title;
  }

  @action.bound toggle() {
    this.finished = !this.finished;
  }
}

class Store {
  @observable todos = [];

  disposers = [];

  constructor() {
    observe(this.todos, change => {
      console.log('change',change)
      this.disposers.forEach(disposer => disposer());
      this.disposers = [];

      for (let todo of change.object) {
        
        var disposer = observe(todo, change => {
          console.log('todo:',todo)
          this.save();
          console.log('todo change:',change);
        });
        this.disposers.push(disposer);
      }
      this.save();
      // console.log(change);
    });
  }
  save() {
    localStorage.setItem("todos", JSON.stringify(toJS(this.todos)));
    // console.log(this.todos);
    // console.log(toJS(this.todos))
  }
  @action.bound createTodo(title) {
    this.todos.unshift(new Todo(title));
  }

  @action.bound removeTodo(todo) {
    // 这里remove并非js数组原生方法，而是mobx在obervable array数组上为我们提供的
    this.todos.remove(todo);
  }

  @computed get left() {
    return this.todos.filter(todo => !todo.finished).length;
  }
}

const store = new Store();

@observer
class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      finished: PropTypes.bool.isRequired
    }).isRequired
  };

  handleClick = e => {
    this.props.todo.toggle();
  };
  render() {
    trace();
    const todo = this.props.todo;
    return (
      <Fragment>
        <input
          type="checkbox"
          className="toggle"
          value={todo.finished}
          onClick={this.handleClick}
        />
        <span className={["title", todo.finished && "finished"].join(" ")}>
          {todo.title}
        </span>
      </Fragment>
    );
  }
}

@observer
class TodoFooter extends Component {
  static propTypes = {};
  render() {
    trace();
    const store = this.props.store;
    return <footer>{store.left} item(s) unfinished</footer>;
  }
}

@observer
class TodoView extends Component {
  static propTypes = {};
  render() {
    trace();
    const todos = this.props.todos;
    return todos.map(todo => {
      return (
        <li key={todo.id} className="todo-item">
          <TodoItem todo={todo} />
          <span className="delete" onClick={e => store.removeTodo(todo)}>
            X
          </span>
        </li>
      );
    });
  }
}
@observer
class TodoHeader extends Component {
  static propTypes = {};

  state = { inputValue: "" };

  handleSubmit = e => {
    e.preventDefault(); //由于是表单提交，要阻止整个页面被提交
    var store = this.props.store;
    var inputValue = this.state.inputValue;
    store.createTodo(inputValue);
    this.setState({ inputValue: "" });
  };

  handleChange = e => {
    var inputValue = e.target.value;
    this.setState({
      inputValue
    });
  };

  render() {
    trace();
    const store = this.props.store;
    return (
      <header>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.inputValue}
            className="input"
            placeholder="What needs to be finished?"
          ></input>
        </form>
      </header>
    );
  }
}
@observer
class TodoList extends Component {
  static propTypes = {
    store: PropTypes.shape({
      createTodo: PropTypes.func,
      todos: ObservablePropTypes.observableArrayOf(
        ObservablePropTypes.observableObject
      ).isRequired
    }).isRequired
  };

  render() {
    trace();
    const store = this.props.store;
    const todos = store.todos;
    return (
      <div className="todo-list">
        <TodoHeader store={store} />
        <ul>
          <TodoView todos={todos} />
        </ul>
        <TodoFooter store={store} />
      </div>
    );
  }
}

ReactDom.render(<TodoList store={store} />, document.querySelector("#root"));
