# 《JavaScript 权威指南第七版》
## [在线阅读](https://js.okten.cn/posts/)
## [github项目](https://github.com/ten-ltw/JavaScript-The-Definitive-Guide-7th-zh)
### 3.7 The Global Object
> ES2020 最终定义了 `globalThis` 作为在任何上下文中引用全局对象的标准方式。到 2020 年初，所有现代浏览器和 Node 都实现了该特性。
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
> `in` 运算符需要一个左侧操作数，该操作数是字符串、符号或可以转换为字符串的值。它需要一个作为对象的右侧操作数。如果左侧值是右侧对象的属性名称，则其计算结果为 true。例如
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
> 请注意，对于`switch`来说，case 关键字后面一般跟有数字或字符串。这是实践中最经常使用 switch 语句的方式，但是请注意，ECMAScript 标准允许每种情况后面都可以有一个任意表达式。
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
### 5.4 循环
+ for
```js
// eq1:
for (let i = 0; i < 10; i++) {
  if (i % 2 == 0) continue; // 跳过偶数
  console.log(i);
}
// eq2:
const a = [1, 2, 3, 4, 5];
const b = [];
for (let i = 0; i < a.length; b.push(a[i++]))
    /* empty */;

console.log(b)
// eq3:
for(;;){
    console.log('死循环') // 想当如while(true)
}
// eq4:
let o = { x: 1, y: 2, z: 3 };
let a = [], i = 0;
for(a[i++] in o) /* empty */;

```
+ for/await
> ES2018 引入了一种新型的迭代器，称为异步迭代器，以及 `for/of` 循环的一种变体，即与异步迭代器一起使用的 `for/await` 循环。
```js

const urls = ['https://dog.ceo/api/breeds/image/random', 'https://dog.ceo/api/breeds/image/random', 'https://dog.ceo/api/breeds/image/random']

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}
(async () => {
  for await (const data of urls.map(fetchData)) {
    console.log(data);
  }
})();
```
#### 5.5.1 标记语句
任何语句都可以在其前面加上标识符和冒号来标记。
eg：标识符配合break和continue使用
```js
outerLoop: // 这是一个语句标识符
    for (let i = 0; i < 5; i++) {
        console.log("Outer loop iteration: " + i);
        innerLoop:
            for (let j = 0; j < 5; j++) {
                console.log("Inner loop iteration: " + j);
                if (j === 2) {
                    break outerLoop; // 这会跳出外层循环，因为我们使用了外层循环的标识符
                }
            }
    }

outerLoop: // 这是一个标识符
    for (let i = 0; i < 5; i++) {
        console.log("Outer loop iteration: " + i);
        for (let j = 0; j < 5; j++) {
            if (j === 2) {
                continue outerLoop; // 这会跳过当前的外层循环迭代，并进入下一次外层循环
            }
            console.log("Inner loop iteration: " + j);
        }
    }


```
## 测试属性
+ in
> in 运算符的左侧是属性名，右侧是对象。如果对象的自有属性或继承属性中包含这个属性则返回 true：
```js
let o = { x: 1 };
"x" in o         // => true: o has an own property "x"
"y" in o         // => false: o doesn't have a property "y"
"toString" in o  // => true: o inherits a toString property
```
+ hasOwnProperty()
> 对象的 hasOwnProperty() 方法用来检测给定的名字是否是对象的自有属性。对于继承属性它将返回 false：
```js
let o = { x: 1 };
o.hasOwnProperty("x")        // => true: o has an own property x
o.hasOwnProperty("y")        // => false: o doesn't have a property y
o.hasOwnProperty("toString") // => false: toString is an inherited property

```
+ propertyIsEnumerable()
> 对象的 `propertyIsEnumerable()` 方法用来检测给定的属性是否能够使用 `for/in` 语句来枚举。对于继承属性以及不可枚举的自有属性它将返回 `false`,`propertyIsEnumerable()` 是 `hasOwnProperty()` 的增强版。只有检测到是自有属性且这个属性的可枚举性为 `true` 时它才返回 `true`。某些内置属性是不可枚举的。通常由 `JavaScript` 代码创建的属性都是可枚举的，除非在 ECMAScript 5 中通过 `defineProperty()` 设置它们的可枚举性为 `false`。
```js
let o = { x: 1 };
o.propertyIsEnumerable("x")  // => true: o has an own enumerable property x
o.propertyIsEnumerable("toString")  // => false: not an own property
Object.prototype.propertyIsEnumerable("toString") // => false: not enumerable
```
#### 6.6.1属性枚举顺序
> ES6 正式定义元素的自有属性的枚举顺序。`Object.keys()`、`Object.values()`、`Object.getOwnPropertyNames()`、`Object.getOwnPropertyNames()`、`Object.getOwnPropertySymbols()`、`Reflect.ownKeys()` 和相关方法如 `JSON.stringify()` 属性列表都按以下顺序排列的，受它们自身是否是不可枚举属性列表或者属性是字符串或者 Symbol 影响：

> 1. 所有数字键按升序排序。
> 2. 所有字符串键按照它们被加入对象的顺序排序。
> 3. 所有 Symbol 键按照它们被加入对象的顺序排序。
> 4. 所有剩余的自有属性按照它们被加入对象的顺序排序。
> 5. 所有继承的属性按照它们被加入对象的顺序排序。
```js
let o = { 10: "a", 1: "b", 7: "c" };
Object.keys(o) // => ["1", "7", "10"]; 所有数字键按升序排序
Object.values(o) // => ["b", "c", "a"]; 值的顺序与键的顺序相同
Object.entries(o) // => [["1","b"], ["7","c"], ["10","a"]]; 键值对按照键的顺序排列
Object.getOwnPropertyNames(o) // => ["1", "7", "10"]; 与Object.keys(o)相同
JSON.stringify(o) // => '{"1":"b","7":"c","10":"a"}'; 键按照升序排列

/*
* getOwnPropertySymbols() 方法返回一个数组，它包含了指定对象自身的所有 symbol 属性的键。
* */
let objSymbol = {
    [Symbol('a')]: 'Aaa',
    [Symbol('b')]: 'Bee',
};

console.log(Object.getOwnPropertySymbols(objSymbol));
// 输出： [ Symbol(a), Symbol(b) ]

/**
 * Reflect.ownKeys() 方法返回一个由目标对象自身的属性键组成的数组。
 */
let objCombined = {
    b: 'Bee',
    a: 'Aaa',
    1: '一',
    10: '十',
    [Symbol('a')]: 'Aaa',
    [Symbol('b')]: 'Bee',
};

console.log(Reflect.ownKeys(objCombined));
// 输出： [ '1', '10', 'b', 'a', Symbol(a), Symbol(b) ]

```

#### 6.10.4 运算符
+ ...运算符
> 在 ES2018 之后，可以使用展开运算符 `…` 将现有的对象中的属性复制到新的对象中：
> 对比 `Object.assign()` 方法和展开运算符 `…` 

简单对象的复制
```js

const now = require('performance-now');

// 准备测试数据
const srcObj = {};
for (let i = 0; i < 100000; i++) {
    srcObj['key' + i] = 'value' + i;
}

// 获取初始内存使用
const initialMemoryUsage = process.memoryUsage();

// 使用...来复制对象
let start = now();
let copyWithSpread = { ...srcObj };
let end = now();
console.log('Execution time for spread operator: ', end - start, 'ms');

// 获取内存使用
let afterSpreadMemoryUsage = process.memoryUsage();

// 使用Object.assign来复制对象
start = now();
let copyWithAssign = Object.assign({}, srcObj);
end = now();
console.log('Execution time for Object.assign: ', end - start, 'ms');

// 获取内存使用
let afterAssignMemoryUsage = process.memoryUsage();

console.log('Memory increase after spread: ', (afterSpreadMemoryUsage.heapUsed - initialMemoryUsage.heapUsed) / 1024 /1024, 'MB');
console.log('Memory increase after assign: ', (afterAssignMemoryUsage.heapUsed - afterSpreadMemoryUsage.heapUsed) / 1024 / 1024, 'MB');


// 输出：
// Execution time for spread operator:  36.15412497520447 ms
// Execution time for Object.assign:  46.71483302116394 ms
// Memory increase after spread:  8.301292419433594 MB
// Memory increase after assign:  10.024642944335938 MB
// 对于简单对象，展开运算符的性能与 `Object.assign()` 方法相当，但是展开运算符的语法更简洁。

```
深层对象的复制
```js
const now = require('performance-now');

// 准备测试数据
const srcObj = {};
let currentObj = srcObj;
for (let i = 0; i < 1000; i++) {
    currentObj['key' + i] = { 'value' : i };
    currentObj = currentObj['key' + i];
}

// 获取初始内存使用
const initialMemoryUsage = process.memoryUsage();

// 使用...来复制对象
let start = now();
let copyWithSpread = { ...srcObj };
let end = now();
console.log('Execution time for spread operator: ', end - start, 'ms');

// 获取内存使用
let afterSpreadMemoryUsage = process.memoryUsage();

// 使用Object.assign来复制对象
start = now();
let copyWithAssign = Object.assign({}, srcObj);
end = now();
console.log('Execution time for Object.assign: ', end - start, 'ms');

// 获取内存使用
let afterAssignMemoryUsage = process.memoryUsage();

console.log('Memory increase after spread: ', (afterSpreadMemoryUsage.heapUsed - initialMemoryUsage.heapUsed) / 1024 /1024, 'MB');
console.log('Memory increase after assign: ', (afterAssignMemoryUsage.heapUsed - afterSpreadMemoryUsage.heapUsed) / 1024 /1024, 'MB');

// 输出：
// Execution time for spread operator:  0.006624937057495117 ms
// Execution time for Object.assign:  0.0037081241607666016 ms
// Memory increase after spread:  0.006256103515625 MB
// Memory increase after assign:  0.00249481201171875 MB
// 对于深层对象，`Object.assign()` 方法的性能优于展开运算符 ，而且内存占用更少。
```
> 这里的测试都是给予`node 18.8.0`版本的，如果是其他版本，可能会有不同，在14.17.5版本测试发现对于深层拷贝对于内存的占用展开运算符是`Object.assign()` 方法的5倍以上。
