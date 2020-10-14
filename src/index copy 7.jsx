import {
  observable,
  autorun,
  computed,
  toJS,
  action,
} from 'mobx'

// 1. 封装可观测值
debugger
class OrderLine {
  @observable price = 1;
  @observable amount = 1;

  constructor(price) {
      this.price = price;
  }

  @computed get total() {
    debugger
      return this.price * this.amount;
  }
}

const store = new OrderLine(100)

console.log(store, '最开始封装后store的值')
debugger

// 2. 依赖收集，打印 1

autorun(() => {
  debugger
  console.log(store.price, 'price')
})

autorun(() => {
  console.log(store.amount, 'amount')
})

autorun(() => {
  console.log(store.total + 5, 'total')
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
  store.price = store.price * 2 
})


// 3. 推导，触发 derivation 的重新执行，打印 initialA-actionA, 4

actionA()

// store.amount = store.amount * 2



console.log(store, '触发更新后store的值')

