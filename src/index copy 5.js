import { observable, isArrayLike } from "mobx";

// 使用修饰器decorator声明可被观察的属性
// 类型都是用@observable,原始类型不应该用observable.box(), 
// 原因是mobx为了简化api,优化体验，在observerable这个函数上做了手脚，它能识别当前是被当做普通函数调用还是被当做修饰器调用的，
// 如果是修饰器调用，自动识别变量类型，并使用不同的包装转换方案，经过这样设计后，是不是觉得存储变量状态的类很整齐。

class Store{
  @observable array= [];
  @observable obj = {};
  @observable map = new Map();

  @observable string = 'hello';
  @observable Number = 20;
  @observable bool = false;
}