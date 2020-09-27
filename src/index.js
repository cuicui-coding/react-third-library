import { get, set, observable, values, autorun, computed, toJS, action } from 'mobx'

debugger
// 1. 封装可观测值
const store = observable({
  a: 1,
  b: 2,
})

console.log(store, 'store')

// debugger
// const divided = computed(() => {
//   debugger
//   return store.a + 10
// })
// 2. 依赖收集，打印 1

autorun(() => {
  console.log(store.a, 'a')
})

autorun(() => {
  console.log(store.b, 'b')
})
console.log(store, 'store1')

// debugger
// divided.get()

// debugger
// divided.observe((change) => console.log(change.newValue, 'change'))
debugger
const actionA = action(()=>{
    debugger
    store.a = 22;
})
debugger
actionA();

// 3. 推导，触发 derivation 的重新执行，打印 2
store.a = 2

console.log(store, 'store2')
