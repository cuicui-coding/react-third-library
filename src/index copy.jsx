import { observable, action } from "mobx";
import React, { Component } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import {observer, PropTypes as ObservablePropTypes } from "mobx-react";

class Store {
  @observable cache = { queue: [] };
  @action.bound refresh() {
    this.cache.queue.push(1);
  }
}

const store = new Store();

// Bar Foo

@observer // observe不同于之前接触的修饰器，不是修饰类成员的，而是修饰类本身，也就是react组件类
class Bar extends Component {
  static propTypes = {
    queue: ObservablePropTypes.observableArray
  };
  state={
    a:1
  }
  render() {
    const queue = this.props.queue;
    // 展示数据
  return <span>{queue.length}{this.props.test}{this.state.a}</span>;
  }
}


class Foo extends Component {
  static propTypes = {
    queue: ObservablePropTypes.observableObject
  };
  // 可以取消重渲染
  shouldComponentUpdate(){}
  render() {
    const cache = this.props.cache;
    // 修改数据
    return (
      <div>
        <button onClick={this.props.refresh}>Refresh</button>
        <Bar queue={cache.queue} test="test123"/>
      </div>
    );
  }
}

ReactDom.render(
  <Foo cache={store.cache} refresh={store.refresh} />,
  document.querySelector("#root")
);
