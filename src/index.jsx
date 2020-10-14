import { observable, action, computed } from 'mobx'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { inject, observer, Provider } from 'mobx-react';
import { HashRouter, Route } from 'react-router-dom';


class User {
  @observable name = 'Jerry';

  @observable age = '11';

  @action.bound
  setName = (name) => {
      this.name = name;
  };

  @action.bound
  setName = (age) => {
      this.age = age;
  };
}

const store = {
  user: new User()
};

window.store = store

debugger
@inject('user')
@observer
class Todo extends Component {
    render() {
        const {user} = this.props;

        return (
            <div onClick={() => {user.setName("Tom")}}> {user.name} {user.age} </div>
        );
    }
}

const container = (
  <HashRouter>
      <Provider {...store}>
          <Route path="/" component={Todo} />
      </Provider>
  </HashRouter>
);

ReactDOM.render(
  container,
  document.querySelector('#root')
)
