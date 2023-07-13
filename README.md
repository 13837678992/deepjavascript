# 《JavaScript 权威指南第七版》
## [在线阅读](https://js.okten.cn/posts/)
## [github项目](https://github.com/ten-ltw/JavaScript-The-Definitive-Guide-7th-zh)
### 3.7 The Global Object
ES2020 最终定义了 globalThis 作为在任何上下文中引用全局对象的标准方式。到 2020 年初，所有现代浏览器和 Node 都实现了该特性。
#### 3.9.3 类型转换
> + prefer-string算法首先尝试toString()方法。如果该方法被定义并返回一个原语值，那么JavaScript将使用该原语值(即使它不是字符串!)如果toString()不存在或者它返回一个对象，那么JavaScript会尝试valueOf()方法。如果该方法存在并返回一个原始值，那么JavaScript将使用该值。否则，转换将失败，并出现TypeError。
> + prefer-number算法的工作原理与prefer-string算法相似，不同之处是它首先尝试valueOf()，然后尝试toString()。
> + 无优先级算法取决于被转换对象的类。如果对象是Date对象，那么JavaScript使用prefer-string算法。对于任何其他对象，JavaScript都使用prefer-number算法。
#### 4.5.1 条件调用

```js

let obj = {
    name: 'zhangsan',
    flag: false,
    flag1: null,
    flag2: undefined,
    flag3: 0,
    flag4: "",
}
console.log('str', obj.name?.toString())        // str zhangsan
console.log('false', obj.flag?.toString())      // false false
console.log('null', obj.flag1?.toString())      // null undefined
console.log('undefined', obj.flag2?.toString()) // undefined undefined
console.log('""', obj.flag4?.toString())        // ""
console.log('0', obj.flag3?.toString())         // 0 0


const undefinedPerson = {
    name: undefined,
    // greet: function () {
    //   console.log("Hello, " + this.name + "!");
    // }
};
undefinedPerson.greet?.(); // 调用不存在的函数
```
#### 4.9.3 in 运算符
in 运算符需要一个左侧操作数，该操作数是字符串、符号或可以转换为字符串的值。它需要一个作为对象的右侧操作数。如果左侧值是右侧对象的属性名称，则其计算结果为 true。例如
```js
    let point = {x: 1, y: 1};  // Define an object
    "x" in point               // => true: object has property named "x"
    "z" in point               // => false: object has no "z" property.
    "toString" in point        // => true: object inherits toString method
    
    let data = [7,8,9];        // An array with elements (indices) 0, 1, and 2
    "0" in data                // => true: array has an element "0"
    1 in data                  // => true: numbers are converted to strings
    3 in data                  // => false: no element 3
    
```
#### 5.3.3 switch
请注意，对于`switch`来说，case 关键字后面一般跟有数字或字符串。这是实践中最经常使用 switch 语句的方式，但是请注意，ECMAScript 标准允许每种情况后面都可以有一个任意表达式。
```js
function convert(x) {
  switch (f1(x)) {
    case caseF1(x):            // Convert the number to a hexadecimal integer
      return x + caseF1(x);
    case caseF2(x):            // Return the string enclosed in quotes
      return x + caseF2(x);
    default:                  // Convert any other type in the usual way
      return String(x);
  }
}

function f1(x) {
  console.log('f1')
  return x + 2
}
function caseF1(x) {
  console.log('caseF1')
  return x + 1
}
function caseF2(x) {
  console.log('caseF2')
  return x + 2
}

console.log(convert(1))
```
