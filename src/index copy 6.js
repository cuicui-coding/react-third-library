import {
  observable,
  computed,
  autorun,
  when,
  reaction,
  action,
  runInAction
} from "mobx";

// 使用修饰器decorator声明可被观察的属性，类型都是用@observable,原始类型不应该用observable.box(), 原因是mobx为了简化api,优化体验，在observerable这个函数上做了手脚，它能识别当前是被当做普通函数调用还是被当做修饰器调用的，如果是修饰器调用，自动识别变量类型，并使用不同的包装转换方案，经过这样设计后，是不是觉得存储变量状态的类很整齐。

class Store {
  @observable array = [];
  @observable obj = {};
  @observable map = new Map();

  @observable string = "hello";
  @observable number = 20;
  @observable bool = false;

  // computed第二种作为decorator，修饰类的get属性成员。在修饰器的情况下，是没有办法使用observe方法，通过store.mixed只能获取最终的计算值。
  @computed get mixed() {
    return store.string + "/" + store.number;
  }

  // action的一个变种是action.bound，想对于action多了把被修饰方法的上下文强制缓存到改对象上而已
  @action.bound bar() {
    store.string = "world";
    store.number = 30;
  }
}

// computed 两种使用方法，1. 作为普通函数，2.作为decorator装饰器
var store = new Store();

// // computed第一种使用方法
// var foo = computed(function(){ return store.string + '/' + store.number; })
// // 为了能监视两个可观察数据的变化, 调用observe方法，入参change存储修改前后变量的值
// foo.observe(function(change){
//   console.log(change)
// })

// // 修改变量，查看change对象值
// store.string = 'world';
// store.number = 30;
// console.log(foo.get());

// autorun 思考两个问题，1.自动运行什么？ 2.什么触发自动运行？

// // 作用是在可观察数据的修改后，自动执行依赖和可观察的行为，这个行为是指传入autorun的函数，再想想autorun这种行为有什么用处？设想如果应用程序状态是可观察数据，而应用程序渲染UI写入缓存等副作用，都是autorun,那么我们可以无视这个副作用，专心写代码，只与数据状态打交道，这种想法令人兴奋，但我们遇到一个问题，状态数据数量众多，每修改一个数据就会触发autorun副作用，岂不是浪费计算资源，这个问题下一节讲解。
// autorun(() => {
//   console.log(store.string + "/" + store.number);
//   // console.log(store.mixed) // 修改string和number会被调用两次，执行结果一样，说明computed值是可以作为新的可观察数据看待的
// });

// store.string = "world";
// store.number = 30;

// // when 只有条件A成立，才会执行条件B, 使用when函数特别注意两点：1.第一个参数是根据可观察数据计算bool返回值，2.第一参数函数一开始返回真，第二个参数函数就会立即同步执行
// when(() => store.bool, () => console.log("It's true"));
// store.bool = true;

// 我们知道autorun是无论是否修改可观察数据，autorun会先行执行一次，这种行为是可以理解的，毕竟如果不执行的话，根本无从知晓有哪些数据被引用，更做不到这些数据被更改时触发autorun逻辑，但假如我们单独告诉mobx,我们引用哪些可观察数据，是不是后面这些副作用逻辑不必先行执行呢？确实mobx提供reaction API可以很好的解决这个问题
// reaction使用场景，举个例子，在没有数据之前，我们不想也没有必要调用写缓存的逻辑，可以用reaction来实现数据第一次被填充后，才启用写缓存逻辑。
// reaction 第一参数函数引入可观察数据，并返回一个值，这个值作为第二个函数的参数，初始化阶段reaction第一个参数函数会被先执行一次，这样mobx就知道有那些可观察数据被引用了。
reaction(() => [store.string, store.number], arr => console.log(arr.join("/")));
// store.string = "world";
// store.number = 30;

// action的作用修改多个状态数据，reaction只触发了一次
// store.bar()

// var bar = store.bar
// bar();

// mobx提供了语法糖，允许你随时定义匿名action方法去运行，这个API是runInAction
runInAction('modify',() => {
  store.string = "world";
  store.number = 30;
});

