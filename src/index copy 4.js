import { observable, isArrayLike } from "mobx";
// observable.box

//第一种 array object map。observable, 对其属性监控

// array
const arr = observable(["a", "b", "c"]);
console.log(arr, arr[0], arr[1], Array.isArray(arr), isArrayLike(arr));

// object
const obj = observable({ a: "1", b: "2" });
// extendObservable() 新增属性监听
console.log(obj, obj.a, obj.b);

// map
const map = observable(new Map());
console.log(map)
map.set('a', 1)
console.log(map.has('a'))
map.delete('a')
console.log(map.has('a'))



// 第二种 除了上面的，其他的数据类型，比如原始数据。observable.box(), 对整体赋值（变量引用本身）监控
const num = observable.box(20);
const str = observable.box('hello');
const bool = observable.box(true);
console.log(num, str, bool)

// 调用set方法修改原始类型值
num.set(50);
str.set('world');
bool.set(false);

console.log('调用get方法会返回原始类型值：',num.get(), str.get(), bool.get())