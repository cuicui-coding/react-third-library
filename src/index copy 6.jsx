import {
  get,
  set,
  observable,
  values,
  autorun,
  computed,
  toJS,
  action,
} from 'mobx'

// 1. 封装可观测值
debugger
const store = observable({
  a: 'initialA',
  b: 2,
})

console.log(store, '最开始封装后store的值')
debugger

// 2. 依赖收集，打印 1

autorun(() => {
  console.log(store.a, 'a')
})

autorun(() => {
  console.log(store.b, 'b')
})

console.log(store, '收集依赖之后store的值')

debugger

// // computed计算属性，纯函数
// const divided = computed(() => {
//   return store.a + '-computedA'
// })
// divided.get()
// divided.observe((change) => console.log(change.newValue, 'change'))


const actionA = action(() => {
  store.a = store.a + '-actionA'
})


// 3. 推导，触发 derivation 的重新执行，打印 initialA-actionA, 4

actionA()

store.b = 2 * 2


console.log(store, '触发更新后store的值')

