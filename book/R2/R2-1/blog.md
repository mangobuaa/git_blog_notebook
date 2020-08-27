# JavaScript 语言精粹 NoteBook

## Chapter1

### true or false
在判断语句中，下列值会被认定为`false`:
- `false`
- `null`
- `undefined`
- `''` 空字符
- `0` 数字0
- `NaN` 数字NaN

注意：
```javascript
null == undefined;      // true
null === undefined;     // false 
NaN == NaN;             // false
```

### 遍历属性

#### 1. 使用 `for...in...` 遍历
- `for...in...` 可以遍历对象所有可枚举属性，包括原型链上的属性。也可以遍历数组的下标。
- `Object.prototype.hasOwnProperty(prop)` 方法可以判断 prop 属性（包括不可枚举属性）是否是非原型链方法。

```javascript
let a = {
    propA: 'a-prop',
    propB: function(){}
}
a.__proto__ = { // 原型链属性
    protoA: 'a-prop-proto'
}
Object.defineProperty(a, 'propC', {
    value: 'prop-c',
    enumerable: false,      // 不可枚举, for in 无法遍历该属性
    configurable: true,
    writable: true
})

// 可以遍历本身和原型链上的属性
for (let prop in a) {
    console.log(`${prop}属性是否是非原型链属性：`, a.hasOwnProperty(prop));
}
const arr = ['a', 'b', 'c'];
// 遍历数组的下标
for (let i in arr) {
    console.log('arr props: ', i);
}
// 遍历数组的值
for (let j of arr) {
    console.log('arr values:', j);
}
```
#### 2. Object.keys
`Object.keys` 只遍历对象**非原型链**的**可枚举**的属性。

```javascript
let a = {
    propA: 'a-prop',
    propB: function(){}
}
a.__proto__ = { // 原型链属性
    protoA: 'a-prop-proto'
}
Object.defineProperty(a, 'propC', {
    value: 'prop-c',
    enumerable: false,      // 不可枚举, for in 无法遍历该属性
    configurable: true,
    writable: true
})

console.log(Object.keys(a));        // 只有 propA, propB
```