# 《JavaScript 权威指南第七版》
## [在线阅读权威指南第七版](https://js.okten.cn/posts/)
## [github项目](https://github.com/ten-ltw/JavaScript-The-Definitive-Guide-7th-zh)
## [笔记所在github地址](https://github.com/13837678992/deepjavascript/blob/main/%E3%80%8AJavaScript%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%E7%AC%AC%E4%B8%83%E7%89%88%E3%80%8B.md)
> 前言：`node：18.8.0`、 `"performance-now": "^2.1.0"`
## 3 类型、值和变量
### 3.7 The Global Object
> ES2020 最终定义了 `globalThis` 作为在任何上下文中引用全局对象的标准方式。到 2020 年初，所有现代浏览器和 `Node` 都实现了该特性。
### 3.9 类型转换
#### 3.9.3 对象到原始类型的转换
> + `prefer-string`算法首先尝试`toString()`方法。如果该方法被定义并返回一个原语值，那么`JavaScript`将使用该原语值(即使它不是字符串!)如果`toString()`不存在或者它返回一个对象，那么`JavaScript`会尝试`valueOf()`方法。如果该方法存在并返回一个原始值，那么`JavaScript`将使用该值。否则，转换将失败，并出现`TypeError`。
> + `prefer-number`算法的工作原理与`prefer-string`算法相似，不同之处是它首先尝试`valueOf()`，然后尝试`toString()`。
> + 无优先级算法取决于被转换对象的类。如果对象是`Date`对象，那么`JavaScript`使用`prefer-string`算法。对于任何其他对象，`JavaScript`都使用`prefer-number`算法。
## 4 表达式和运算符
### 4.5 调用表达式
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
### 4.9 关系表达式
#### 4.9.3 in 运算符
> `in` 运算符需要一个左侧操作数，该操作数是字符串、符号或可以转换为字符串的值。它需要一个作为对象的右侧操作数。如果左侧值是右侧对象的属性名称，则其计算结果为 `true`。例如
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
## 5 语句
### 5.3 条件句
#### 5.3.3 `switch`
> 请注意，对于`switch`来说，`case` 关键字后面一般跟有数字或字符串。这是实践中最经常使用 `switch` 语句的方式，但是请注意，`ECMAScript` 标准允许每种情况后面都可以有一个任意表达式。
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
+ `for`
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
+ `for/await`
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
### 5.5 Jumps

#### 5.5.1 标记语句
任何语句都可以在其前面加上标识符和冒号来标记。
eg：标识符配合`break`和`continue`使用
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
## 6 对象
### 6.5 测试属性
+ `in`
> `in` 运算符的左侧是属性名，右侧是对象。如果对象的自有属性或继承属性中包含这个属性则返回 `true`：
```js
let o = { x: 1 };
"x" in o         // => true: o has an own property "x"
"y" in o         // => false: o doesn't have a property "y"
"toString" in o  // => true: o inherits a toString property
```
+ `hasOwnProperty()`
> 对象的 `hasOwnProperty()` 方法用来检测给定的名字是否是对象的自有属性。对于继承属性它将返回 `false`：
```js
let o = { x: 1 };
o.hasOwnProperty("x")        // => true: o has an own property x
o.hasOwnProperty("y")        // => false: o doesn't have a property y
o.hasOwnProperty("toString") // => false: toString is an inherited property

```
+ `propertyIsEnumerable()`
> 对象的 `propertyIsEnumerable()` 方法用来检测给定的属性是否能够使用 `for/in` 语句来枚举。对于继承属性以及不可枚举的自有属性它将返回 `false`,`propertyIsEnumerable()` 是 `hasOwnProperty()` 的增强版。只有检测到是自有属性且这个属性的可枚举性为 `true` 时它才返回 `true`。某些内置属性是不可枚举的。通常由 `JavaScript` 代码创建的属性都是可枚举的，除非在 ECMAScript 5 中通过 `defineProperty()` 设置它们的可枚举性为 `false`。
```js
let o = { x: 1 };
o.propertyIsEnumerable("x")  // => true: o has an own enumerable property x
o.propertyIsEnumerable("toString")  // => false: not an own property
Object.prototype.propertyIsEnumerable("toString") // => false: not enumerable
```
### 6.6 枚举属性
#### 6.6.1属性枚举顺序
> ES6 正式定义元素的自有属性的枚举顺序。`Object.keys()`、`Object.values()`、`Object.getOwnPropertyNames()`、`Object.getOwnPropertyNames()`、`Object.getOwnPropertySymbols()`、`Reflect.ownKeys()` 和相关方法如 `JSON.stringify()` 属性列表都按以下顺序排列的，受它们自身是否是不可枚举属性列表或者属性是字符串或者 `Symbol` 影响：

> 1. 所有数字键按升序排序。
> 2. 所有字符串键按照它们被加入对象的顺序排序。
> 3. 所有 `Symbol` 键按照它们被加入对象的顺序排序。
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
### 6.10 扩展对象文字语法
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
## 7 数组
### 7.1 数组的创建
+ `Array` 构造函数
+ 数组字面量
+ `Array.of()` 静态方法
+ `Array.from()` 静态方法
+ 可迭代数组`...`运算符
> 对于`Array.of`当 `Array()` 构造函数调用时有一个数值型实参，它会将实参作为数组的长度。但当调用时不止一个数值型实参时，它会将那些实参作为数组的元素创建。这意味着 `Array()` 构造函数不能创建只有一个数值型元素的数组。在 ES6 中，`Array.of()` 函数修复了这个问题：它是一个将其实参值（无论有多少个实参）作为数组元素创建并返回一个新数组的工厂方法：
```js
Array.of()        // => []; returns empty array with no arguments
Array.of(10)      // => [10]; can create arrays with a single numeric argument
Array.of(1,2,3)   // => [1, 2, 3]
```

#### 7.1.5 `Array.from()`
> `Array.from()` 也很重要，因为它定义了一个将类数组对象拷贝成数组的方法。类数组对象是一个不是数组的对象，它有一个数值型的 `length` 属性，并且它的值碰巧保存在属性名为整数的属性中。当使用客户端 `JavaScript` 时，一些浏览器方法的返回值是类数组的，并且当将其转化成真正的数组后会更容易操作它们：
```js
var arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
var array = Array.from(arrayLike);
console.log(array); // ['a', 'b', 'c']
    
```
### 7.8 数组方法
#### 7.8.6 Array Searching and Sorting Methods
+ `includes() findeIndex() some()`
> `includes()` 方法用来判断一个数组是否包含一个指定的值，如果是返回 `true`，否则 `false`。但是在实际的业务中，我们更关心的是数组中是否包含某个对象，而不是某个值。这时候我们可以使用 `Array.prototype.some()`或者`Array.prototype.findIndex()` 方法来实现：

```js
const performance = require('performance-now');

function testArrayIncludes(arr, value) {
  return arr.map(item => item.id).includes(value.id);
}
function testMapHas(map, value) {
  return map.has(value.id);
}
function arrayToMap(arr) {
  return new Map(arr.map((obj) => [obj.id, obj]));
}
function testSetHas(set, value) {
  return [...set].some(item => item.id === value.id);
}

function testArraySome(arr, value) {
  return arr.some(item => item.id === value.id);
}

function testArrayFindIndex(arr, value) {
  return arr.findIndex(item => item.id === value.id) !== -1;
}

// Performance test function
function runPerformanceTest(testFunction, data, value, testName) {
  const startTime = performance();
  const result = testFunction(data, value);
  const endTime = performance();
  console.log(`${testName} took ${(endTime - startTime).toFixed(4)} ms. Result: ${result}`);
  return result
}

// Create an array with 100,000 elements, each element is an object type
const largeArray = Array.from({ length: 100000 }, (_, index) => ({ id: index }));

// Convert the above array to a Set object
const largeSet = new Set(largeArray);

const largeMap = runPerformanceTest(arrayToMap, largeArray, null, 'Array to Map conversion');


const valueToFind = { id: 99999 }; // Object to find

// Run performance tests
runPerformanceTest(testMapHas, largeMap, valueToFind, 'Map.has()');
runPerformanceTest(testArrayIncludes, largeArray, valueToFind, 'Array.includes()');
runPerformanceTest(testMapHas, largeMap, valueToFind, 'Map.has()');

runPerformanceTest(testArraySome, largeArray, valueToFind, 'Array.some()');
runPerformanceTest(testArrayFindIndex, largeArray, valueToFind, 'Array.findIndex()');
runPerformanceTest(testSetHas, largeSet, valueToFind, 'Set.has()');
/**
 * Array to Map conversion took 9.7451 ms. Result: [object Map]
 Array.includes() took 2.5821 ms. Result: true
 Map.has() took 0.0127 ms. Result: true
 Array.some() took 1.0827 ms. Result: true
 Array.findIndex() took 1.0773 ms. Result: true
 Set.has() took 2.6590 ms. Result: true
 * 
 */
```
> 可以看到Map在查找时所带来的性能上的提升，但是实际业务较少，Set也具有优秀的性能，但是实际的使用场景更少，对于简单数据具有优秀的性能，但是对于复杂对象的查找却是只能通过值引用的对比。还是以`some`和`findIndex`为主。`findIndex`不经可以判断是否存在而且可以在对应的索引进行操作。

**但是在某些特使场景具有优势，以下是对应场景：**
```js
const performance = require('performance-now');
console.log('-----------------------------------------------------------------')

// Function to add data to Map
function populateMap(map, data) {
  data.forEach(item => map.set(item.id, item.value));
}

// Function to add data to Set
function populateSet(set, data) {
  data.forEach(item => set.add(item));
}

// Function to test Map.get()
function testMapGet(map, id) {
  return map.get(id);
}

// Function to test Set.has()
function testSetHas(set, item) {
  return set.has(item);
}
// Function to test Array.findIndex()
function testArrayFindIndex(array, id) {
  return array.findIndex(item => item.id === id);
}

// Performance test function
function runPerformanceTest(testFunction, data, testName) {
  const startTime = performance();
  testFunction(data);
  const endTime = performance();
  console.log(`${testName} took ${(endTime - startTime).toFixed(4)} milliseconds.`);
}

// 创建一个包含100000个元素的数组，每个元素都是一个对象类型
const largeArray = Array.from({ length: 100000 }, (_, index) => ({
  id: index,
  value: {
    arrayValue: Array.from({ length: 50 }, (_, i) => i),
    nestedObject: {
      key1: 'value1',
      key2: 'value2',
    },
  },
}));

// 创建一个空的 Map 对象
const largeMap = new Map();
// 创建一个空的 Set 对象
const largeSet = new Set();

// Populate the Map and Set
runPerformanceTest(() => populateMap(largeMap, largeArray), null, 'Populate Map');
runPerformanceTest(() => populateSet(largeSet, largeArray), null, 'Populate Set');

// 测试 Map.get()，Set.has()，和 Array.findIndex()
runPerformanceTest(() => testMapGet(largeMap, largeArray[99999].id), null, 'Map.get()');
runPerformanceTest(() => testSetHas(largeSet, largeArray[99999]), null, 'Set.has()');
runPerformanceTest(() => testArrayFindIndex(largeArray, largeArray[99999].id), null, 'Array.findIndex()');
// 第一次
/**
 * Populate Map took 5.8271 milliseconds.
 * Populate Set took 3.8953 milliseconds.
 * Map.get() took 0.0586 milliseconds.
 * Set.has() took 0.0101 milliseconds.
 * Array.findIndex() took 1.4440 milliseconds.
 */
// 第二次
/**
 * Populate Map took 5.7992 milliseconds.
 * Populate Set took 3.7873 milliseconds.
 * Map.get() took 0.0423 milliseconds.
 * Set.has() took 0.0095 milliseconds.
 * Array.findIndex() took 1.4344 milliseconds.
 */

```
> 总结。对于特定的场景，`Map` 的性能是最优的，但是对于简单的数据，`Set` 的性能是最优的，但是对于复杂的数据，`Array` 的性能是最优的。
#### 7.8.7 Array to String Conversions
> Array 类定义了三个方法来将数组转化为字符串，`join() `,`toString()` 和 `toLocaleString()`。以及`JSON.stringify()`,它可以将任意 `JavaScript` 值转化为 `JSON` 字符串。这些方法的区别在于它们的参数和返回值。
> 对比在项目中的深拷贝所带来的性能区别
```js
const lodash = require('lodash');
const now = require('performance-now');

function deepCopy(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  let copy = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }

  return copy;
}

let data = {};
for (let i = 0; i < 10000; i++) {
  data[i] = { a: i, b: { c: i } };
}

let t0 = now();
for (let i = 0; i < 1000; i++) {
  const copy = JSON.parse(JSON.stringify(data));
}
let t1 = now();
console.log('JSON.stringify/JSON.parse time:', (t1 - t0).toFixed(4), 'ms');

t0 = now();
for (let i = 0; i < 1000; i++) {
  const copy = lodash.cloneDeep(data);
}
t1 = now();
console.log('lodash.cloneDeep time:', (t1 - t0).toFixed(4), 'ms');

t0 = now();
for (let i = 0; i < 1000; i++) {
  const copy = deepCopy(data);
}
t1 = now();
console.log('Recursive deepCopy time:', (t1 - t0).toFixed(4), 'ms');
// 第一次
/**
 * JSON.stringify/JSON.parse time: 3940.4420 ms
 * lodash.cloneDeep time: 6408.5781 ms
 * Recursive deepCopy time: 1230.8562 ms
 */
// 第二次
/**
 * JSON.stringify/JSON.parse time: 4043.3091 ms
 * lodash.cloneDeep time: 6377.0055 ms
 * Recursive deepCopy time: 1254.2543 ms
 */
```
> `lodash` 的 `cloneDeep` 方法会处理循环引用、函数、日期、正则表达式等特殊对象，这需要额外的检查和逻辑，可能导致性能下降。
> 另一方面，`JSON.stringify` 和 `JSON.parse` 方法需要将对象转换为字符串，然后再将字符串转换回对象。这个过程涉及到序列化和反序列化，可能比直接复制对象的属性更耗时。
> 递归的深拷贝方法在性能上表现最好，但是它不能处理循环引用，因此在实际的业务中，我们需要根据实际的需求来选择合适的方法。

### 7.9 Array-Like Objects
>  `JavaScript` 数组和常规的对象有明显的区别。但是没有定义数组的本质特性。一种常常完全合理的看法是把拥有一个数值型 `length` 属性和对应非负整数属性的对象看作数组的同类。
> 实际上这些“类数组”对象在实践中偶尔出现，虽然不能通过它们直接调用数组方法或者期望 `length` 属性有什么特殊的行为，但是仍然可以用针对真正数组遍历代码来遍历它们。结论就是很多数组算法针对类数组对象同样奏效，就像针对真正的数组一样。尤其是这种情况，算法把数组看成只读的或者如果保持数组长度不变
> 以下代码为一个常规对象增加了一些属性使其变成类数组对象，然后遍历生成的伪数组的“元素”：
```js
let a = {};  // Start with a regular empty object

// Add properties to make it "array-like"
let i = 0;
while(i < 10) {
    a[i] = i * i;
    i++;
}
a.length = i;

// Now iterate through it as if it were a real array
let total = 0;
for(let j = 0; j < a.length; j++) {
    total += a[j];
}
console.log(total);  // => 285
```
> 大多数 `JavaScript` 数组方法都特意定义为泛型，以便它们在应用于除数组之外的类数组可以正常工作。由于类数组对象不会从 `Array.prototype` 继承，因此不能直接在它们上调用数组方法。但是，可以使用 `Function.call` 方法间接调用它们：
```js
let a = {"0": "a", "1": "b", "2": "c", length: 3}; // An array-like object
Array.prototype.join.call(a, "+")                  // => "a+b+c"
Array.prototype.map.call(a, x => x.toUpperCase())  // => ["A","B","C"]
Array.prototype.slice.call(a, 0)   // => ["a","b","c"]: true array copy
Array.from(a)                      // => ["a","b","c"]: easier array copy
```
### 7.10 Strings as Arrays
> 字符串的行为类似于数组，也意味着我们可以对它们应用泛型数组方法。例如：
```js
Array.prototype.join.call("JavaScript", " ")  // => "J a v a S c r i p t"
```
> 请记住，字符串是不可变值，因此当字符串被视为数组时，它们是只读数组。数组方法 `push()`、`sort()`、`reverse()` 和 `splice()` 直接修改数组，它们不能处理字符串。但是，尝试使用数组方法修改字符串不会引发异常：它只是静默失败。

## 8 函数
### 8.6 闭包
> 从技术的角度讲，所有的 `JavaScript` 函数都是闭包，但是大多数函数调用和定义在同一个作用域内，通常不会注意这里有涉及到闭包。当调用函数不和其定义处于同一作用域内时，事情就变得非常微妙。当一个函数嵌套了另外一个函数，外部函数将嵌套的函数对象作为返回值返回的时候往往会发生这种事情。
```js
function constfuncs() {
  let funcs = [];
  for (var i = 0; i < 10; i++) { // changed var to let
    funcs[i] = () => i;
  }
  return funcs;
}

let funcs = constfuncs();
console.log(funcs[5]()) // => 10


let add = null
{
  {
    var a = 2;
    console.log(a);  //2
    add = () => { console.log(a) } // 3
  }
  {
    var a = 3;
    console.log(a) //3
  }
  console.log(a) // 3
}
console.log(a)// 3
add()
```
> 在`JavaScript`中，当创建一个函数并访问其外部作用域的变量时，函数实际上保存的是对这个变量的引用，而不是那个变量的值。这种行为产生的环境就是我们称之为"闭包"的东西。
### 8.8 函数式编程
#### 8.8.3 函数的部分应用
> `bind()` 方法只是将实参放在（完整实参列表的）左侧，也就是说传入 `bind()` 的实参都是放在传入原始函数的实参列表开始的位置，但有时我们期望将传入 `bind()` 的实参放在（完整实参列表的）右侧：
```js
// 参数在左边传入
function partialLeft(f, ...outerArgs) {
    return function(...innerArgs) { // Return this function
        let args = [...outerArgs, ...innerArgs]; // Build the argument list
        return f.apply(this, args);              // Then invoke f with it
    };
}

// 参数在右边传入
function partialRight(f, ...outerArgs) {
    return function(...innerArgs) {  // Return this function
        let args = [...innerArgs, ...outerArgs]; // Build the argument list
        return f.apply(this, args);              // Then invoke f with it
    };
}

// 如果存在undefined就使用后传入的参数填入
function partial(f, ...outerArgs) {
    return function(...innerArgs) {
        let args = [...outerArgs]; // local copy of outer args template
        let innerIndex=0;          // which inner arg is next
        // Loop through the args, filling in undefined values from inner args
        for(let i = 0; i < args.length; i++) {
            if (args[i] === undefined) args[i] = innerArgs[innerIndex++];
        }
        // Now append any remaining inner arguments
        args.push(...innerArgs.slice(innerIndex));
        return f.apply(this, args);
    };
}

// Here is a function with three arguments
const f = function(x,y,z) { return x * (y - z); };
// Notice how these three partial applications differ
partialLeft(f, 2)(3,4)         // => -2: Bind first argument: 2 * (3 - 4)
partialRight(f, 2)(3,4)        // =>  6: Bind last argument: 3 * (4 - 2)
partial(f, undefined, 2)(3,4)  // => -6: Bind middle argument: 3 * (2 - 4)
```
> 书本提供的一个有趣的练习：求平均数和标准差的代码，这种编码风格是非常纯粹的函数式编程：
```js
// sum() and square() functions are defined above. Here are some more:
const map = function(a, ...args) { return a.map(...args); };
const reduce = function(a, ...args) { return a.reduce(...args); };
const product = (x,y) => x*y;
const neg = partial(product, -1);
const sqrt = partial(Math.pow, undefined, .5);
const reciprocal = partial(Math.pow, undefined, neg(1));
const sum = (x,y) => x+y;
const square = x => x*x;

function compose(f, g) {
    return function(...args) {
        // We use call for f because we're passing a single value and
        // apply for g because we're passing an array of values.
        return f.call(this, g.apply(this, args));
    };
}
function partial(f, ...outerArgs) {
    return function(...innerArgs) {
        let args = [...outerArgs]; // local copy of outer args template
        let innerIndex=0;          // which inner arg is next
        // Loop through the args, filling in undefined values from inner args
        for(let i = 0; i < args.length; i++) {
            if (args[i] === undefined) args[i] = innerArgs[innerIndex++];
        }
        // Now append any remaining inner arguments
        args.push(...innerArgs.slice(innerIndex));
        return f.apply(this, args);
    };
}
// Now compute the mean and standard deviation.
let data = [1,1,3,5,5];   // Our data
let mean = product(reduce(data, sum), reciprocal(data.length));
let stddev = sqrt(product(reduce(map(data,
                                     compose(square,
                                             partial(sum, neg(mean)))),
                                 sum),
                          reciprocal(sum(data.length,neg(1)))));
[mean, stddev]  // => [3, 2]
```


## 9 class
### 9.3 带有类关键字的类声明
#### 9.3.3 Public, Private, and Static Fields
> 假设你正在编写一个这样的类，其中一个构造函数初始化了三个字段：
```js
class Buffer {
    constructor() {
        this.size = 0;
        this.capacity = 4096;
        this.buffer = new Uint8Array(this.capacity);
    }
}
```
> 使用可能标准化的新实例字段语法，可以这样编写：
```js
class Buffer {
    size = 0;
    capacity = 4096;
    buffer = new Uint8Array(this.capacity);
}
```

> 字段初始化代码已移出构造函数，现在直接显示在类正文中。（当然，该代码仍作为构造函数的一部分运行。如果不定义构造函数，则字段初始化为隐式创建的构造函数的一部分。赋值左侧的 `this.` 前缀消失，但请注意即使是在初始化赋值的右侧，仍必须使用 `this.` 前缀引用这些字段。这种方式初始化实例字段的优点是，此语法允许（但不需要）将初始化放在类定义的顶部，使读者清楚地了解字段在每个实例将保存的状态。可以通过字段名后面跟一个分号来只声明不初始化一个字段。如果这样做，字段的初始值将是 `undefined`。显式设定初始化字段的值是比较好的风格。

> 标准化中的实例字段同时也定义了私有实例字段。如果使用上例中所示的实例字段初始化语法来定义其名称以 # 开头的字段（在 `JavaScript` 标识符中通常不是合法字符），则该字段在类正文中可用（使用 # 前缀），但对类正文之外的任何代码不可见且不可访问（因此不可变）。如果对于前面的 `Buffer` 类，要确保类的用户不会无意中修改实例的 `size` 字段，可以改为使用私有 `#size` 字段，然后定义 `getter` 函数以提供对值的只读访问：
```js
class Buffer {
    #size = 0; // 更加推荐 static ,并且只能在class正文里面定义 ，下面的定义就是错误的
    get size() { return this.#size; }
}
// 错误示例
class Buffer {
    constructor() {
        this.#size = 0;
    }
}
```
> 示例：`Sets.js`：抽象类和实体类的层次
```js
/**
 * AbstractSet类定义了一个抽象方法has()。
 */
class AbstractSet {
  // 在这里抛出一个错误，以强制子类定义自己的此方法的工作版本。
  has(x) { throw new Error("抽象方法"); }
}

/**
* NotSet是AbstractSet的一个具体子类。
* 这个集合的成员是某个其他集合中不是成员的所有值。
* 因为它是根据另一个集合定义的，所以它不可写，因为它有无穷个成员，所以它不可枚举。
* 我们能做的就是测试成员资格并将它转换成字符串，用数学符号表示。
*/
class NotSet extends AbstractSet {
  constructor(set) {
    super();
    this.set = set;
  }

  // 我们实现了继承的抽象方法
  has(x) { return !this.set.has(x); }
  // 我们也覆盖了这个Object方法
  toString() { return `{ x| x ∉ ${this.set.toString()} }`; }
}

/**
* RangeSet是AbstractSet的一个具体子类。它的成员是
* 所有在from和to边界之间的值，包括边界值。
* 因为它的成员可以是浮点数，所以它不可枚举，没有有意义的大小。
*/
class RangeSet extends AbstractSet {
  constructor(from, to) {
    super();
    this.from = from;
    this.to = to;
  }

  has(x) { return x >= this.from && x <= this.to; }
  toString() { return `{ x| ${this.from} ≤ x ≤ ${this.to} }`; }
}

/*
* AbstractEnumerableSet是AbstractSet的一个抽象子类。 它定义
* 一个抽象的getter，返回集合的大小，还定义了一个抽象迭代器。
* 然后它在这些基础上实现了具体的isEmpty()，toString()，
* 和equals()方法。实现了迭代器，大小getter，和has()方法的子类得到了这些具体
* 方法的免费实现。
*/
class AbstractEnumerableSet extends AbstractSet {
  get size() { throw new Error("抽象方法"); }
  [Symbol.iterator]() { throw new Error("抽象方法"); }

  isEmpty() { return this.size === 0; }
  toString() { return `{${Array.from(this).join(", ")}}`; }
  equals(set) {
    // 如果其他集合也不是Enumerable，那么它不等于这个集合
    if (!(set instanceof AbstractEnumerableSet)) return false;

    // 如果它们的大小不同，那么它们不相等
    if (this.size !== set.size) return false;

    // 循环遍历这个集合的元素
    for (let element of this) {
      // 如果一个元素不在其他集合中，它们不相等
      if (!set.has(element)) return false;
    }

    // 元素匹配，所以集合是相等的
    return true;
  }
}

/*
* SingletonSet是AbstractEnumerableSet的一个具体子类。
* 单例集是一个只有一个成员的只读集。
*/
class SingletonSet extends AbstractEnumerableSet {
  constructor(member) {
    super();
    this.member = member;
  }

  // 我们实现了这三个方法，然后继承了基于这些方法的isEmpty, equals()
  // 和toString()的实现。
  has(x) { return x === this.member; }
  get size() { return 1; }
  *[Symbol.iterator]() { yield this.member; }
}

/*
* AbstractWritableSet是AbstractEnumerableSet的一个抽象子类。
* 它定义了insert()和remove()的抽象方法，这两个方法分别插入和
* 删除集合中的单个元素，然后在这两个方法的基础上实现了具体的
* add(), subtract(),和 intersect()方法。注意我们的API在这里
* 和标准的JavaScript Set类有所不同。
*/
class AbstractWritableSet extends AbstractEnumerableSet {
  insert(x) { throw new Error("抽象方法"); }
  remove(x) { throw new Error("抽象方法"); }

  add(set) {
    for (let element of set) {
      this.insert(element);
    }
  }

  subtract(set) {
    for (let element of set) {
      this.remove(element);
    }
  }

  intersect(set) {
    for (let element of this) {
      if (!set.has(element)) {
        this.remove(element);
      }
    }
  }
}

/**
* BitSet是AbstractWritableSet的一个具体子类，它的
* 实现是一个非常高效的固定大小集合，用于存储
* 元素是小于某个最大大小的非负整数的集合。
*/
class BitSet extends AbstractWritableSet {
  constructor(max) {
    super();
    this.max = max;  // 我们可以存储的最大整数。
    this.n = 0;      // 集合中有多少个整数
    this.numBytes = Math.floor(max / 8) + 1;   // 我们需要多少字节
    this.data = new Uint8Array(this.numBytes); // 字节数据
  }

  // 内部方法，检查一个值是否是这个集合的合法成员
  _valid(x) { return Number.isInteger(x) && x >= 0 && x <= this.max; }

  // 测试我们的数据数组的指定字节的指定位是否设置。返回true或false。
  _has(byte, bit) { return (this.data[byte] & BitSet.bits[bit]) !== 0; }

  // 值x是否在这个BitSet中？
  has(x) {
    if (this._valid(x)) {
      let byte = Math.floor(x / 8);
      let bit = x % 8;
      return this._has(byte, bit);
    } else {
      return false;
    }
  }


  // 将值x插入到BitSet中
  insert(x) {
    if (this._valid(x)) {               // 如果值x在合理的范围内
      let byte = Math.floor(x / 8);   // 计算要设置的字节
      let bit = x % 8;                // 以及该字节中要设置的位
      if (!this._has(byte, bit)) {    // 如果该位没有设置
        this.data[byte] |= BitSet.bits[bit];  // 则设置它
        this.n++;                   // 并增加集合大小
      }
    } else {
      throw new Error(`无效的集合元素: ${x}`);
    }
  }

  // 将值x从BitSet中移除
  remove(x) {
    if (this._valid(x)) {               // 如果值x在合理的范围内
      let byte = Math.floor(x / 8);   // 计算要设置的字节
      let bit = x % 8;                // 以及该字节中要设置的位
      if (this._has(byte, bit)) {     // 如果该位已设置
        this.data[byte] &= BitSet.masks[bit];  // 则清除它
        this.n--;                   // 并减少集合大小
      }
    } else {
      throw new Error(`无效的集合元素: ${x}`);
    }
  }

  // 返回这个集合的大小
  get size() { return this.n; }

  // 迭代器用于遍历集合成员
  *[Symbol.iterator]() {
    for (let byte = 0; byte < this.numBytes; byte++) {
      for (let bit = 0; bit < 8; bit++) {
        if (this._has(byte, bit)) {
          yield byte * 8 + bit;
        }
      }
    }
  }
}

// BitSet的两个静态属性用于位操作
BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
BitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);
```


## 11 `JavaScript` 标准库
### 11.2 Maps and Sets
#### 11.1.3 WeakMap and WeakSet
> `WeakMap` 类是 `Map` 类的变体（但不是真正的子类），它不会阻止其键值被垃圾回收。垃圾回收是 `JavaScript` 解释器回收不再“可访问”并且无法由程序使用的对象的内存的过程。常规 `map` 保留对其键值的“强”引用，即使对它们的所有其他引用都已消失，它们仍然可以通过映射访问。相比之下，`WeakMap` 保留对其键值的“弱”引用，以使它们无法通过 `WeakMap` 获得，并且它们在 `map` 中的存在也不会阻止对其内存的回收。
> `WeakMap()` 构造函数类似 `Map()` 构造函数，但是有一些重要的不同：
> + `WeakMap` 键必须是对象或数组；原始值不受垃圾回收的限制，不能用作键。
> + `WeakMap` 仅实现 `get()`、`set()`、`has()` 和 `delete()` 方法。 特别是，`WeakMap` 是不可迭代的，并且未定义 `keys()`、`values()` 或 `forEach()`。如果 `WeakMap` 是可迭代的，则其键将是可访问的，这让它不会“弱”
> + 同样，`WeakMap` 也不实现 `size` 属性，因为随着对象被垃圾回收，`WeakMap` 的大小可能随时更改。
> + `WeakMap` 的预期用途是允许将值与对象相关联而不会引起内存泄漏。例如，假设正在编写一个带有对象实参的函数，并且需要对该对象执行一些耗时的计算。为了提高效率，希望将计算出的值进行缓存以备后用。如果使用 `Map` 对象实现缓存，则将防止回收任何对象，但是通过使用 `WeakMap`，可以避免此问题。（通常可以使用私有的 `Symbol` 属性将计算的值直接缓存在对象上，从而获得相似的结果。

> `WeakSet` 实现了一组对象，这些对象不会阻止垃圾回收这些对象。 `WeakSet()` 构造函数的工作方式类似于 `Set()` 构造函数，但 `WeakSet` 对象与 `Set` 对象的区别与 `WeakMap` 对象与 `Map` 对象的区别相同：
> + `WeakSet` 中的值必须是对象或数组；原始值不受垃圾回收的限制，不能用作值。
> + `WeakSet` 仅实现 `add()`、`has()` 和 `delete()` 方法。 特别是，`WeakSet` 是不可迭代的，并且未定义 `keys()`、`values()` 或 `forEach()`。如果 `WeakSet` 是可迭代的，则其值将是可访问的，这让它不会“弱”.
> + `WeakSet` 没有 `size` 属性。
> + `WeakSet` 并不经常使用：其用例类似于 `WeakMap` 的用例。例如，如果要标记（或“烙印”）对象具有某些特殊属性或类型，则可以将其添加到 `WeakSet` 中。然后，在其他位置，当要检查该属性或类型时，可以测试该 `WeakSet` 中的成员身份。使用常规 `Set` 执行此操作将防止所有标记的对象被垃圾回收，但这在使用 `WeakSet` 时不必担心。
### 11.2 类型化数组和二进制数据
#### 11.2.1 类型化数组
> `JavaScript` 没有定义 `TypedArray` 类。相反，有11种类型化数组，每种类型具有不同的元素类型和构造函数：
```js
// 有符号8位整数数组
new Int8Array()

// 无符号8位整数数组
new Uint8Array()

// 无符号8位整数数组（范围在0到255之间，超出范围的值将被截断）
new Uint8ClampedArray()

// 有符号16位短整数数组
new Int16Array()

// 无符号16位短整数数组
new Uint16Array()

// 有符号32位整数数组
new Int32Array()

// 无符号32位整数数组
new Uint32Array()

// ES2020引入的有符号64位BigInt数组
new BigInt64Array()

// ES2020引入的无符号64位BigInt数组
new BigUint64Array()

// 32位浮点数数组
new Float32Array()

// 64位浮点数数组（普通的JavaScript数值）
new Float64Array()

```
#### 11.2.4 使用类型化数组
> 测试类型化数组特定的性能
```js
/**
 * 
 * rss (Resident Set Size)：所有内存占用，包括所有 C++ 和 JavaScript 对象和代码的内存占用。
 * heapTotal：当前已经申请到的堆空间。
 * heapUsed：当前使用的堆空间。
 * external：V8 引擎内部 C++ 对象占用的内存。
 * arrayBuffers：所有 ArrayBuffer 和 SharedArrayBuffer 实例的内存使用量，包括所有的 Node.js Buffer 实例。
 */

function measurePerformance(fn) {
  const startMem = process.memoryUsage();
  const startTime = now();

  fn();  // 运行回调函数

  const endMem = process.memoryUsage();
  const endTime = now();

  const timeElapsed = endTime - startTime;
  const memUsage = {};
  for (let key in endMem) {
    memUsage[key] = ((endMem[key] - startMem[key]) / 1024 / 1024).toFixed(2) + ' MB';
  }

  console.log(`Time elapsed: ${timeElapsed.toFixed(2)} ms`);
  console.log('Memory usage: ', memUsage);

}


measurePerformance(() => {
  (function (n) {
    let a = new Uint8Array(n + 1);
    let max = Math.floor(Math.sqrt(n));
    let p = 2;
    while (p <= max) {
      for (let i = 2 * p; i <= n; i += p)
        a[i] = 1;
      while (a[++p]) /* empty */;
    }
    while (a[n]) n--;
    return n;
  })
    (100000000)
});
measurePerformance(() => {
  (function (n) {
    let a = new Array(n + 1).fill(0);
    let max = Math.floor(Math.sqrt(n));
    let p = 2;
    while (p <= max) {
      for (let i = 2 * p; i <= n; i += p)
        a[i] = 1;
      while (a[++p]) /* empty */;
    }
    while (a[n]) n--;
    return n;
  })
    (100000000)
});
// 输出：
/**
 * Time elapsed: 634.96 ms
 * Memory usage:  {
 *   rss: '95.69 MB',
 *   heapTotal: '0.00 MB',
 *   heapUsed: '0.00 MB',
 *   external: '95.37 MB',
 *   arrayBuffers: '95.37 MB'
 * }
 * Time elapsed: 22510.01 ms
 * Memory usage:  {
 *   rss: '754.75 MB',
 *   heapTotal: '773.47 MB',
 *   heapUsed: '771.35 MB',
 *   external: '-95.37 MB',
 *   arrayBuffers: '-95.37 MB'
 * }
 */
```
>  可以看到在内存和时间上，类型化数组所具有的性能都比普通数组要好太多。使用 `Uint8Array()` 而不是 `Array()` 可以使代码运行速度提高四倍以上，并且使用的内存减少八倍。
### 11.4 Dates and Times
#### 11.4.1 时间戳
>+ **高分辨率时间戳**

> `Date.now()` 返回的时间戳以毫秒为单位。对于计算机而言，毫秒实际上是一个相对较长的时间，有时您可能希望以更高的精度测量经过的时间。`performance.now()` 函数允许这样做：它也返回毫秒级的时间戳，但是返回值不是整数，因此它包含毫秒的分数。 `performance.now()` 返回的值不是像 `Date.now()`那样的绝对时间戳。取而代之的是，它仅指示网页加载成功或 `Node` 进程开始以来已花费了多少时间。
> `performance` 对象是较大的 `Performance API `的一部分，该 `API` 不是由 `ECMAScript` 标准定义的，而是由 `Web` 浏览器和 `Node` 实现的。为了在 `Node` 中使用 `performance` 对象，必须使用以下命令导入它：
```js

import { performance } from "perf_hooks"

```
> `performance` 在 `node16` 后的版本是直接提供全局对象，而在`web`端的`chrome`浏览器中是直接提供全局对象。

### 11.9 URL
```js
let url = new URL("https://example.com/search");
url.search                            // => "": no query yet
url.searchParams.append("q", "term"); // Add a search parameter
url.search                            // => "?q=term"
url.searchParams.set("q", "x");       // Change the value of this parameter
url.search                            // => "?q=x"
url.searchParams.get("q")             // => "x": query the parameter value
url.searchParams.has("q")             // => true: there is a q parameter
url.searchParams.has("p")             // => false: there is no p parameter
url.searchParams.append("opts", "1"); // Add another search parameter
url.search                            // => "?q=x&opts=1"
url.searchParams.append("opts", "&"); // Add another value for same name
url.search                            // => "?q=x&opts=1&opts=%26": note escape
url.searchParams.get("opts")          // => "1": the first value
url.searchParams.getAll("opts")       // => ["1", "&"]: all values
url.searchParams.sort();              // Put params in alphabetical order
url.search                            // => "?opts=1&opts=%26&q=x"
url.searchParams.set("opts", "y");    // Change the opts param
url.search                            // => "?opts=y&q=x"
// searchParams is iterable
[...url.searchParams]                 // => [["opts", "y"], ["q", "x"]]
url.searchParams.delete("opts");      // Delete the opts param
url.search                            // => "?q=x"
url.href                              // => "https://example.com/search?q=x"
url.toString()                        // => same as href
```
## 12 迭代器和生成器
### 12.1 迭代器
> 首先，可迭代的对象：可以迭代的是诸如 `Array`，`Set` 和 `Map` 之类的类型。其次，迭代器对象本身，它执行迭代。第三，一个迭代结果对象，该对象保存迭代的每个步骤的结果
> 任何对象具有特殊迭代器方法，并且该方法返回迭代器对象，那么该对象为可迭代对象。迭代器对象具有 `next()`方法，该方法返回迭代结果对象。迭代结果对象是具有名为 `value` 和 `done` 的属性的对象。要迭代一个可迭代的对象，首先要调用其迭代器方法以获取一个迭代器对象。然后，重复调用迭代器对象的 `next()` 方法，直到返回的值的 `done` 属性设置为 `true`。
```js
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let inerable = arr[Symbol.iterator]()
for (let result = inerable.next(); !result.done; result = inerable.next()) {
  console.log(result.value)
}
```
> 为了使类可迭代，必须实现一个名称为 `Symbol.iterator` 的方法。该方法必须返回一个具有 `next()` 方法的迭代器对象。并且 `next()` 方法必须返回具有 `value` 属性和或或布尔型 `done` 属性的迭代结果对象。示例实现了一个可迭代的 `Range` 类，并演示了如何创建可迭代的、迭代器和迭代结果对象。
```JS
class Range {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
  has(x) { return typeof x === "number" && this.from <= x && x <= this.to; }
  toString() { return `{ x | ${this.from} ≤ x ≤ ${this.to} }`; }
  [Symbol.iterator]() {
    let next = Math.ceil(this.from);  
    let last = this.to;               
    return {                          
      next() {
        return (next <= last) 
          ? { value: next++ } 
          : { done: true };   
      },
      [Symbol.iterator]() { return this; }
    };
  }
}

for (let x of new Range(1, 10)) console.log(x); // Logs numbers 1 to 10
console.log([...new Range(-2, 2)])              // => [-2, -1, 0, 1, 2]
```
> 另一个有用的生成器函数，它交错多个可迭代对象的元素：
```js
function* oneDigitPrimes() { 
  yield 2;                 
  yield 3;                 
  yield 5;                 
  yield 7;                 
}


function* zip(...iterables) {
  let iterators = iterables.map(i => i[Symbol.iterator]());
  let index = 0;
  while (iterators.length > 0) {         
    if (index >= iterators.length) {     
      index = 0;                         
    }
    let item = iterators[index].next();  
    if (item.done) {                     
      iterators.splice(index, 1);     
    }
    else {                            
      yield item.value;               
      index++;                        
    }
  }
}

[...zip(oneDigitPrimes(), [0], "ab")]    // => [2,,0"a",3,"b",5,7]
```
> 我们不使用生成器当然也是可以的
```js

function* oneDigitPrimes() {
  yield 2;
  yield 3;
  yield 5;
  yield 7;
}
function zipOther(...arr) {
    let res = []
    let max = 0
    let arrX = arr.map(i => {
        let arrI = [...i]
        max = Math.max(max, arrI.length)
        return arrI
    });
    for (let i = 0; i < max; i++) {
        for (let j = 0; j < arrX.length; j++) {
            if (arrX[j][i] !== undefined) {
                res.push(arrX[j][i])
            }
        }
    }
    return res
}

zipOther(oneDigitPrimes(), [0], "ab") // => [2,,0"a",3,"b",5,7]
```
> 迭代一个可迭代的对象并产生每个结果值。

```js
function* oneDigitPrimes() {
    yield 2;
    yield 3;
    yield 5;
    yield 7;
}
function* sequence(...iterables) {
    for(let iterable of iterables) {
        yield* iterable;
    }
}

[...sequence("abc",oneDigitPrimes())]  // => ["a","b","c",2,3,5,7]

```
### 12.4 生成器高级功能
#### 12.4.1 生成器函数的返回值
> 生成器函数的返回值是一个迭代器对象。如果生成器函数包含 `return` 语句，则该语句的值将成为迭代器对象的 `value` 属性的值，而 `done` 属性将设置为 `true`。如果生成器函数没有 `return` 语句，则迭代器对象的 `value` 属性将为 `undefined`，而 `done` 属性将设置为 `true`。如果生成器函数包含 `return` 语句，则该语句的值将成为迭代器对象的 `value` 属性的值，而 `done` 属性将设置为 `true`。如果生成器函数没有 `return` 语句，则迭代器对象的 `value` 属性将为 `undefined`，而 `done` 属性将设置为 `true`。
```js
function *oneAndDone() {
    yield 1;
    return "done";
}
[...oneAndDone()]   // => [1]
let generator = oneAndDone();
generator.next()           // => { value: 1, done: false}
generator.next()           // => { value: "done", done: true }
generator.next()           // => { value: undefined, done: true }

function* oneAndDone() {
    return "done";
    yield 1;
}

// The return value does not appear in normal iteration.
[...oneAndDone()]   // => [1]

// But it is available if you explicitly call next()
let generator = oneAndDone();
generator.next()         // => { value: 'done', done: true }
generator.next()         // => { value: undefined, done: true }
```
#### 12.4.2 `yield` 表达式的值
> 调用生成器的 `next()` 方法时，生成器函数将运行直至到达 `yield` 表达式。将评估 `yield` 关键字之后的表达式，该值将成为 `next()` 调用的返回值。此时，生成器函数在评估 `yield` 表达式的中间立即停止执行。下次调用生成器的 `next()` 方法时，传递给 `next()` 的参数成为已暂停的 `yield` 表达式的值。因此，生成器将把 `yield` 的值返回给它的调用者，然后调用者通过 `next()` 将值传递给生成器。生成器和调用者是两个独立的执行流，来回传递值（和控制）。以下代码说明：
```js
function* smallNumbers() {
    console.log("next() invoked the first time; argument discarded");
    let y1 = yield 1;    // y1 == "b"
    console.log("next() invoked a second time with argument", y1);
    let y2 = yield 2;    // y2 == "c"
    console.log("next() invoked a third time with argument", y2);
    let y3 = yield 3;    // y3 == "d"
    console.log("next() invoked a fourth time with argument", y3);
    return 4;
}

let g = smallNumbers();
console.log("generator created; no code runs yet");
let n1 = g.next("a");   // n1.value == 1
console.log("generator yielded", n1.value);
let n2 = g.next("b");   // n2.value == 2
console.log("generator yielded", n2.value);
let n3 = g.next("c");   // n3.value == 3
console.log("generator yielded", n3.value);
let n4 = g.next("d");   // n4 == { value: 4, done: true }
console.log("generator returned", n4.value);

// 输出
// generator created; no code runs yet
// next() invoked the first time; argument discarded
// generator yielded 1
// next() invoked a second time with argument b
// generator yielded 2
// next() invoked a third time with argument c
// generator yielded 3
// next() invoked a fourth time with argument d
// generator returned 4
```
## 13 异步 `JavaScript`
### 13.2 `Promise`
#### 13.2.7 按顺序执行 `promise`
> 有时，您可能希望按顺序执行一系列 `promise`。例如，假设您有一个函数，该函数接受一个 `URL` 并返回一个 `promise`，该 `promise` 将解析为从该 `URL` 下载的文本。您可能希望编写一个函数，该函数接受一个 `URL` 数组并返回一个 `promise`，该 `promise` 将解析为一个数组，该数组包含从每个 `URL` 下载的文本。
```js
function fetchSequentially(urls) {
  let babis = []
  fetchOne = (url) => {
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        babis.push(data)
      })
  }
  let p = Promise.resolve(undefined)
  urls.forEach(url => {
    p = p.then(() => fetchOne(url))
  })
  return p.then(() => babis)
}
```

### 13.4 异步迭代器
#### 13.4.3 异步生成器
> 使用异步生成器和 `for/await` 循环代替 `setInterval()` 回调函数以固定的间隔重复运行代码
```js
let a = 1
function elapsedTime(ms) {
    return new Promise(resolve => setTimeout(()=> resolve(a++), ms));
}
async function* clock(interval, max=Infinity) {
    for(let count = 1; count <= max; count++) {
        let res = await elapsedTime(interval);
        yield res;
    }
}
async function test() {
    for await (let tick of clock(300, 10)) {
        console.log(tick);
    }
}
test()
```
#### 13.4.4 实现异步迭代器
> 除了使用异步生成器来实现异步迭代器外，还可以通过使用 `Symbol.asyncIterator()` 方法定义一个对象来直接实现它们，而 `Symbol.asyncIterator()` 方法将返回一个对象，而 `next()` 方法将返回一个决议为迭代器结果对象的 `Promise`。在下面的代码中，我们重新实现了上一个示例中的 `clock()` 函数，因此它不是生成器，而仅是返回一个异步可迭代的对象。请注意，此示例中的 `next()` 方法未明确返回 `Promise`；相反，我们只声明 `next()` 是异步的：
```js
function clock(interval, max = Infinity) {
  function until(time) {
    return new Promise(resolve => setTimeout(resolve, time - Date.now()));
  }
  return {
    startTime: Date.now(),  
    count: 1,               
    async next() {          
      if (this.count > max) {   
        return { done: true };  
      }
        
      let targetTime = this.startTime + this.count * interval;
      await until(targetTime);
      return { value: this.count++ };
    },
    [Symbol.asyncIterator]() { return this; }
  };
}
async function test() {
  for await (let tick of clock(100, 1000)) {
    console.log(tick);
  }
}
test()
```
> `AsyncQueue` 之上实现了一个简单的异步迭代
```js
class AsyncQueue {
    constructor() {
        this.values = [];
        this.resolvers = [];
        this.closed = false;
    }

    enqueue(value) {
        if (this.closed) {
            throw new Error("AsyncQueue closed");
        }
        if (this.resolvers.length > 0) {
            const resolve = this.resolvers.shift();
            resolve(value);
        }
        else {
            this.values.push(value);
        }
    }

    dequeue() {
        if (this.values.length > 0) {
            const value = this.values.shift();
            return Promise.resolve(value);
        }
        else if (this.closed) {
            return Promise.resolve(AsyncQueue.EOS);
        }
        else {
            return new Promise((resolve) => { this.resolvers.push(resolve); });
        }
    }

    close() {
        while(this.resolvers.length > 0) {
            this.resolvers.shift()(AsyncQueue.EOS);
        }
        this.closed = true;
    }
    [Symbol.asyncIterator]() { return this; }
    next() {
        return this.dequeue().then(value => (value === AsyncQueue.EOS)
            ? { value: undefined, done: true }
            : { value: value, done: false });
    }
}
AsyncQueue.EOS = Symbol("end-of-stream");
let queue = new AsyncQueue();
// 生产者
async function producer() {
    for (let i = 0; i < 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        queue.enqueue(i);
    }
    queue.close();
}

// 消费者
async function consumer() {
    for await (let value of queue) {
        console.log(value);
    }
}

producer();
consumer();
```
## 14 元编程
### 14.4 常见的 `Symbols`
#### 14.4.1 Symbol.iterator and Symbol.asyncIterator
> 迭代器和异步迭代器的标准符号
#### 14.4.2 `Symbol.hasInstance`
> 在 ES6 中，如果 `instanceof` 的右侧是任何具有 `[Symbol.hasInstance] `方法的对象，则以左侧值作为参数来调用该方法，并且该方法的返回值（转换为布尔值）将成为 `instanceof` 运算符的值。当然，如果右侧的值没有 `[Symbol.hasInstance]` 方法，而是一个函数，则 `instanceof` 运算符将按照其普通方式运行。
```js
// Define an object as a "type" we can use with instanceof
let uint8 = {
    [Symbol.hasInstance](x) {
        return Number.isInteger(x) && x >= 0 && x <= 255;
    }
};
128 instanceof uint8     // => true
256 instanceof uint8     // => false: too big
Math.PI instanceof uint8 // => false: not an integer

```
#### 14.4.3 `Symbol.toStringTag`
> 在 ES6 之前，`Object.prototype.toString()` 方法的这种特殊行为仅适用于内置类型的实例，如果您在自己定义的类的实例上调用此 `Object.prototype.toString()`，它会只需返回“对象”。然而，在 ES6 中，`Object.prototype.toString()` 在其参数上查找符号名称为 `Symbol.toStringTag` 的属性，如果存在这样的属性，它将在其输出中使用该属性值。这意味着，如果您定义自己的类，则可以轻松地使用`Object.prototype.toString()`  
```js
class Range {
    get [Symbol.toStringTag]() { return "Range"; }
}
let r = new Range(1, 10);
Object.prototype.toString.call(r)   // => "[object Range]"
```
#### 14.4.4 `Symbol.species`
> 在 ES6 之前，`JavaScript` 没有提供任何真正的方法来创建内置类（如 Array）的健壮子类。然而，在 `ES6` 中，您只需使用 `class` 和 `extends` 关键字即可扩展任何内置类。 
```js
class EZArray extends Array {
    get first() { return this[0]; }
    get last() { return this[this.length-1]; }
}

let e = new EZArray(1,2,3);
let f = e.map(x => x * x);
e.last  // => 3: the last element of EZArray e
f.last  // => 9: f is also an EZArray with a last property
```
> 在 ES6 及更高版本中，`Array()` 构造函数有一个符号名称为 `Symbol.species` 的属性。 （请注意，此 `Symbol` 用作构造函数的属性名称。这里描述的大多数其他众所周知的 `Symbol` 都用作原型对象的方法名称。）当我们使用扩展创建子类时，生成的子类构造函数会继承超类构造函数的属性。 （这是对普通继承的补充，其中子类的实例继承超类的方法。）这意味着 `Array` 的每个子类的构造函数也有一个名为 `Symbol.species` 的继承属性。 （或者，如果需要，子类可以使用此名称定义自己的属性。）在 ES6 及更高版本中，对创建和返回新数组的 `map()` 和 `slice()` 等方法进行了稍微调整。他们（实际上）调用新的 `this.constructor` `Symbol.species` 来创建新数组，而不是仅仅创建常规数组。
```js
// Instead we can use defineProperty():
Object.defineProperty(EZArray, Symbol.species, {value: Array});
class EZArray extends Array {
    static get [Symbol.species]() { return Array; }
    get first() { return this[0]; }
    get last() { return this[this.length-1]; }
}
let e = new EZArray(1,2,3);
let f = e.map(x => x - 1);
e.last  // => 3
f.last  // => undefined: f is a regular array with no last getter
```
#### 14.4.7 `Symbol.toPrimitive`
> [上文对象到原始类型的转换](#393-对象到原始类型的转换)解释了 `JavaScript` 具有三种略有不同的算法来将对象转换为原始值。宽松地说，对于需要或首选字符串值的转换，`JavaScript` 首先调用对象的 `toString()` 方法，如果 `toString()` 未定义或不返回原始值，则退回到 `valueOf()` 方法。对于首选数值的转换，`JavaScript` 首先尝试 `valueOf()` 方法，如果未定义 `valueOf()` 或它不返回原始值，则回退到 `toString()` 方法。最后，在没有偏好的情况下，它让类决定如何进行转换。日期对象首先使用 `toString()` 进行转换，所有其他类型首先尝试 `valueOf()`。

> 在 ES6 中，Symbol.toPrimitive 允许您覆盖此默认的对象到基元行为，并让您完全控制自己的类的实例如何转换为基元值。为此，请使用此符号名称定义一个方法。该方法必须返回一个以某种方式表示该对象的原始值。您定义的方法将使用单个字符串参数来调用，该参数告诉您 `JavaScript` 尝试对您的对象执行哪种类型的转换：
> + 如果参数是“string”，则意味着 `JavaScript` 正在期望或更喜欢（但不要求）字符串的上下文中进行转换。例如，当您将对象插入模板文字时，就会发生这种情况。
> + 如果参数是“number”，则意味着 `JavaScript` 正在期望或更喜欢（但不要求）数字值的上下文中进行转换。当您将对象与 < 或 > 运算符或算术运算符（例如 - 和 *）一起使用时，就会发生这种情况。
> + 如果参数是“default”，则意味着 `JavaScript` 正在数字或字符串值可以工作的上下文中转换您的对象。使用 +、== 和 != 运算符时会发生这种情况。
## 15 Web 浏览器中的 `JavaScript`
### 15.1 网络编程基础知识
#### 15.1.5 `JavaScript` 程序的执行
> 您可以将 JavaScript 程序的执行视为分两个阶段进行。在第一阶段，加载文档内容，并运行 <script> 元素中的代码（内联脚本和外部脚本）。脚本通常按照它们在文档中出现的顺序运行，尽管可以通过我们描述的 `async` 和 `defer` 属性来修改此默认顺序。任何单个脚本中的 `JavaScript` 代码都是从上到下运行的，当然，受 `JavaScript` 的条件、循环和其他控制语句的影响。有些脚本在第一阶段实际上并不执行任何操作，而只是定义在第二阶段使用的函数和类。其他脚本可能在第一阶段执行重要工作，然后在第二阶段执行任何操作。想象一下文档末尾的脚本，该脚本查找文档中的所有 `<h1>` 和 `<h2>` 标记，并通过在文档开头生成和插入目录来修改文档。这完全可以在第一阶段完成。

> 一旦文档加载并且所有脚本运行完毕，`JavaScript` 执行就进入第二阶段。此阶段是异步且事件驱动的。如果脚本要参与第二阶段，那么它在第一阶段必须完成的一件事是注册至少一个将异步调用的事件处理程序或其他回调函数。在事件驱动的第二阶段中，Web 浏览器调用事件处理函数和其他回调来响应异步发生的事件。事件处理程序最常被调用以响应用户输入（鼠标单击、击键等），但也可能由网络活动、文档和资源加载、经过的时间或 `JavaScript` 代码中的错误触发。

> 事件驱动阶段最先发生的一些事件是`DOMContentLoaded`和`load`事件。当 `HTML` 文档完全加载和解析时，会触发`DOMContentLoaded`。当所有文档的外部资源（例如图像）也完全加载时，将触发`load`事件。 `JavaScript` 程序通常使用这些事件之一作为触发器或启动信号。常见的情况是，程序的脚本定义了函数，但除了在事件驱动执行阶段开始时注册由“load”事件触发的事件处理函数之外，不采取任何其他操作。然后，正是这个`load`事件处理程序操纵文档并执行程序应该执行的任何操作。请注意，在 `JavaScript` 编程中，事件处理程序函数（例如此处描述的`load`事件处理程序）用于注册其他事件处理程序是很常见的。
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>加载事件测试</title>
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        console.log('DOMContentLoaded event fired')
        checkReadyState()
      })

      window.addEventListener('load', function () {
        console.log('Load event fired')
        checkReadyState()
      })

      function checkReadyState() {
        console.log('Document readyState:', document.readyState)
      }
    </script>
  </head>
  <body>
    <h1>加载事件测试</h1>
    <img
      src="https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo_2x.jpg!0x0.webp"
      alt="用于延迟加载事件的大图像"
    />
    <p>打开浏览器的控制台查看各种加载事件和readyState检查的输出</p>
  </body>
</html>
```
>+ 浏览器在 `Document` 对象上触发`DOMContentLoaded`事件。这标志着从同步脚本执行阶段到异步、事件驱动的程序执行阶段的转变。但请注意，此时可能仍有异步脚本尚未执行
>+ 此时文档已完全解析，但浏览器可能仍在等待加载其他内容，例如图像。当所有此类内容完成加载，并且所有异步脚本已加载并执行时，`document.readyState` 属性将更改为`complete`，并且 Web 浏览器会在 `Window` 对象上触发`load`事件
>+ 从此时起，将异步调用事件处理程序以响应用户输入事件、网络事件、计时器到期等。

#### 15.1.6 程序输入输出
>+ 客户端 JavaScript 可以使用所显示文档的 `URL` 作为 `document.URL`。如果将此字符串传递给 `URL()` 构造函数
>+ HTTP“Cookie”请求标头的内容可作为 `document.cookie` 供客户端代码使用
>+ 全局 `navigator` 属性提供对有关 Web 浏览器、其运行的操作系统以及每个浏览器功能的信息的访问。例如，`navigator.userAgent` 是标识 Web 浏览器的字符串，`navigator.language` 是用户的首选语言，`navigator.hardwareConcurrency` 返回可用于 Web 浏览器的逻辑 CPU 数量。同样，全局屏幕属性通过 `screen.width` 和 `screen.height` 属性提供对用户显示尺寸的访问。
#### 15.1.7 程序错误
> 与直接在操作系统之上运行的应用程序（例如 Node 应用程序）不同，Web 浏览器中的 JavaScript 程序不会真正“崩溃”。如果 JavaScript 程序运行时发生异常，并且没有 catch 语句来处理该异常，则开发人员控制台中将显示错误消息，但已注册的任何事件处理程序将继续运行并响应事件

> 如果您想定义一个在发生此类未捕获的异常时调用的最后手段的错误处理程序，请将 Window 对象的 onerror 属性设置为错误处理程序函数。当未捕获的异常在调用堆栈中一直向上传播并且错误消息即将在开发人员控制台中显示时，将使用三个字符串参数调用 window.onerror 函数。 window.onerror 的第一个参数是描述错误的消息。第二个参数是一个字符串，其中包含导致错误的 JavaScript 代码的 URL。第三个参数是文档中发生错误的行号。如果 onerror 处理程序返回 true，它会告诉浏览器该处理程序已处理错误并且不需要采取进一步的操作，换句话说，浏览器不应显示自己的错误消息。

> 当 Promise 被拒绝并且没有 .catch() 函数来处理它时，这种情况很像未处理的异常：程序中出现意外错误或逻辑错误。您可以通过定义 window.onunhandledrejection 函数或使用 window.addEventListener() 注册“unhandledrejection”事件的处理程序来检测这一点。传递给此处理程序的事件对象将具有一个 Promise 属性，其值为被拒绝的 Promise 对象，以及一个 Reason 属性，其值为将传递给 .catch() 函数的值。与前面描述的错误处理程序一样，如果您对未处理的拒绝事件对象调用 PreventDefault()，它将被视为已处理，并且不会在开发人员控制台中导致错误消息。

> 通常不需要定义 onerror 或 onunhandledrejection 处理程序，但如果您想向服务器报告客户端错误（例如，使用 fetch() 函数发出 HTTP POST 请求），它作为遥测机制非常有用），以便您可以获得有关用户浏览器中发生的意外错误的信息。 
### 15.2 `events`
#### 15.2.6 调度自定义事件
```js
// 调度自定义事件，携带的属性为 `detail`
document.dispatchEvent(new CustomEvent("busy", { detail: true }));

fetch(url)
  .then(handleNetworkResponse)
  .catch(handleNetworkError)
  .finally(() => {
      // 请求结束，事件调度为空闲
      document.dispatchEvent(new CustomEvent("busy", { detail: false }));
  });

// 监听事件（自定义事件`busy`）
document.addEventListener("busy", (e) => {
    if (e.detail) {
        showSpinner();
    } else {
        hideSpinner();
    }
});

```
### 15.3 Scripting Documents
> 使用 DOM API 生成目录
```js
/**
 * TOC.js: 为文档创建目录。
 *
 * 当DOM内容加载事件触发时运行此脚本，并自动为文档生成目录。
 * 它没有定义任何全局符号，所以不会与其他脚本冲突。
 *
 * 当此脚本运行时，它首先寻找一个ID为 "TOC" 的文档元素。
 * 如果没有这样的元素，它将在文档开始处创建一个。接下来，该
 * 函数查找所有 <h2> 到 <h6> 的标签，将它们视为节标题，
 * 并在TOC元素内创建目录。生成的锚名以 "TOC" 开头，因此您
 * 应避免在自己的HTML中使用此前缀。
 *
 * 可以用CSS对生成的TOC条目进行样式设置。所有条目都有一个
 * "TOCEntry" 类。条目还具有与节标题级别相对应的类。
 * 例如: <h1> 标签生成 "TOCLevel1" 类的条目，<h2> 标签生成 "TOCLevel2" 类的条目，依此类推。
 **/
document.addEventListener("DOMContentLoaded", () => {
    // 寻找TOC容器元素。如果没有，就在文档开始处创建一个。
    let toc = document.querySelector("#TOC");
    if (!toc) {
        toc = document.createElement("div");
        toc.id = "TOC";
        document.body.prepend(toc);
    }

    // 找到所有章节标题元素。
    let headings = document.querySelectorAll("h2,h3,h4,h5,h6");

    // 初始化一个跟踪节编号的数组。
    let sectionNumbers = [0,0,0,0,0];

    // 循环遍历我们找到的章节标题元素。
    for(let heading of headings) {
        // 如果标题在TOC容器内，就跳过。
        if (heading.parentNode === toc) {
            continue;
        }

        // 找出是哪个级别的标题。
        let level = parseInt(heading.tagName.charAt(1)) - 1;

        // 递增此标题级别的节编号并将所有较低标题级别的编号重置为零。
        sectionNumbers[level-1]++;
        for(let i = level; i < sectionNumbers.length; i++) {
            sectionNumbers[i] = 0;
        }

        // 现在组合所有标题级别的节编号以产生像2.3.1这样的节编号。
        let sectionNumber = sectionNumbers.slice(0, level).join(".");

        // 将节编号添加到章节标题中。
        let span = document.createElement("span");
        span.className = "TOCSectNum";
        span.textContent = sectionNumber;
        heading.prepend(span);

        // 将标题包装在命名锚中以便我们可以链接到它。
        let anchor = document.createElement("a");
        let fragmentName = `TOC${sectionNumber}`;
        anchor.name = fragmentName;
        heading.before(anchor);
        anchor.append(heading);

        // 现在创建一个链接到此章节的链接。
        let link = document.createElement("a");
        link.href = `#${fragmentName}`;

        // 将标题文本复制到链接中。这是对innerHTML的安全使用。
        link.innerHTML = heading.innerHTML;

        // 将链接放在可基于级别进行样式设置的div中。
        let entry = document.createElement("div");
        entry.classList.add("TOCEntry", `TOCLevel${level}`);
        entry.append(link);

        // 将div添加到TOC容器中。
        toc.append(entry);
    }
});
```
### 15.6 web 组件
#### 15.6.5 示例： <search-box> Web 组件
```js
/**
 * 这个类定义了一个自定义HTML <search-box> 元素，它显示了一个<input>文本输入框和两个图标或表情符号。
 * 默认情况下，它在文本字段的左侧显示一个放大镜表情符号（表示搜索），在文本字段的右侧显示一个X表情符号（表示取消）。
 * 它隐藏了输入字段的边框，并围绕自己显示边框，从而营造了两个表情符号在输入字段内的外观。
 * 同样地，当内部输入字段被聚焦时，焦点环将显示在<search-box>周围。
 *
 * 您可以通过包括具有slot="left"和slot="right"属性的<span>或<img><search-box>的子元素来覆盖默认图标。
 *
 * <search-box>支持正常的HTML disabled和hidden属性，
 * 还支持size和placeholder属性，它们对于此元素与<input>元素的含义相同。
 *
 * 内部<input>元素的输入事件冒泡，并以其目标字段设置为<search-box>元素显示。
 *
 * 当用户点击左侧表情符号（放大镜）时，元素会触发一个"search"事件，并将详细属性设置为当前输入字符串。
 * 当内部文本字段生成"change"事件时（文本已更改，并且用户键入Return或Tab时），“搜索”事件也会被触发。
 *
 * 当用户点击右侧表情符号（X）时，元素会触发一个"clear"事件。
 * 如果没有处理程序调用preventDefault()在事件上，则元素在事件调度完成后清除用户的输入。
 *
 * 请注意，没有onsearch和onclear属性或属性：只能使用addEventListener()注册"search"和"clear"事件的处理程序。
 */
class SearchBox extends HTMLElement {
    constructor() {
        super(); // 调用超类构造函数；必须首先。

        // 创建一个shadow DOM树，并将其附加到此元素，设置this.shadowRoot的值。
        this.attachShadow({mode: "open"});

        // 克隆定义此自定义组件的后代和样式表的模板，并将该内容附加到shadow root。
        this.shadowRoot.append(SearchBox.template.content.cloneNode(true));

        // 获取shadow DOM中重要元素的引用
        this.input = this.shadowRoot.querySelector("#input");
        let leftSlot = this.shadowRoot.querySelector('slot[name="left"]');
        let rightSlot = this.shadowRoot.querySelector('slot[name="right"]');

        // 当内部输入字段获得或失去焦点时，设置或删除
        // "focused"属性，这将导致我们的内部样式表
        // 在整个组件上显示或隐藏虚假焦点环。注意
        // "blur"和"focus"事件冒泡并似乎起源于
        // <search-box>。
        this.input.onfocus = () => { this.setAttribute("focused", ""); };
        this.input.onblur = () => { this.removeAttribute("focused");};

        // 如果用户点击放大镜，触发"search"事件。
        // 如果输入字段触发"change"事件也触发它。
        // （“change”事件不会冒泡到Shadow DOM之外。）
        leftSlot.onclick = this.input.onchange = (event) => {
            event.stopPropagation();    // 防止点击事件冒泡
            if (this.disabled) return;  // 禁用时不执行任何操作
            this.dispatchEvent(new CustomEvent("search", {
                detail: this.input.value
            }));
        };

        // 如果用户点击X，触发"clear"事件。
        // 如果未在事件上调用preventDefault()，清除输入。
        rightSlot.onclick = (event) => {
            event.stopPropagation();    // 不要让点击冒泡
            if (this.disabled) return;  // 如果禁用，不要执行任何操作
            let e = new CustomEvent("clear", { cancelable: true });
            this.dispatchEvent(e);
            if (!e.defaultPrevented) {  // 如果事件未被"取消"
                this.input.value = "";  // 清除输入字段
            }
        };
    }

    // 当我们的一些属性被设置或更改时，我们需要在内部<input>元素上设置
    // 相应的值。这个生命周期方法，与下面的静态observedAttributes属性一起，
    // 负责此项工作。
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "disabled") {
            this.input.disabled = newValue !== null;
        } else if (name === "placeholder") {
            this.input.placeholder = newValue;
        } else if (name === "size") {
            this.input.size = newValue;
        } else if (name === "value") {
            this.input.value = newValue;
        }
    }

    // 最后，我们为与我们支持的HTML属性对应的属性定义属性getter和setter。
    // getter简单地返回属性的值（或存在）。setter只是设置属性的值（或存在）。
    // 当setter方法更改属性时，浏览器将自动调用上面的attributeChangedCallback。

    get placeholder() { return this.getAttribute("placeholder"); }
    get size() { return this.getAttribute("size"); }
    get value() { return this.getAttribute("value"); }
    get disabled() { return this.hasAttribute("disabled"); }
    get hidden() { return this.hasAttribute("hidden"); }

    set placeholder(value) { this.setAttribute("placeholder", value); }
    set size(value) { this.setAttribute("size", value); }
    set value(value) { this.setAttribute("value", value); }
    set disabled(value) { this.toggleAttribute("disabled", value); }
    set hidden(value) { this.toggleAttribute("hidden", value); }
}

// 由于模板的内容不会更改，因此我们可以创建一次模板并在所有<search-box>元素中共享该模板。
// 我们在外部代码中定义它，以便不在构造函数中反复克隆它。
SearchBox.template = document.createElement("template");
SearchBox.template.innerHTML = `
  <style>
    :host { display: inline-block; border: solid thin black; padding: 4px; }
    #input { border: none; outline: none; padding: 4px; }
    :host([focused]) { outline: Highlight auto 5px; outline-color: -webkit-focus-ring-color; }
    slot[name="left"], slot[name="right"] { cursor: pointer; }
    slot[name="left"]::slotted(*) { margin-right: 4px; }
    slot[name="right"]::slotted(*) { margin-left: 4px; }
    :host([disabled]) slot[name="left"], :host([disabled]) slot[name="right"] { cursor: not-allowed; }
  </style>
  <slot name="left"><span>🔍</span></slot><input id="input"><slot name="right"><span>❌</span></slot>
`;

// 最后，定义这个元素的标签名和类名，以便浏览器知道如何将它实例化。
customElements.define('search-box', SearchBox);

```
### 15.10 Location, Navigation, and History
#### 15.10.4 History Management with pushState()
> 示例1
```js
// 定义导航函数
function navigate(page, replace = false) {
  const state = { page };
  const title = `Page ${page}`;
  const url = `/page${page}`;
  
  if (replace) {
    window.history.replaceState(state, title, url);
  } else {
    window.history.pushState(state, title, url);
  }
  
  renderPage(page); // 渲染页面的函数
}

// 监听popstate事件来处理浏览器的前进和后退按钮
window.addEventListener('popstate', (event) => {
  const state = event.state;
  if (state && state.page) {
    renderPage(state.page);
  }
});

// 初始导航
navigate(1, true);

// 示例使用
document.getElementById('link1').addEventListener('click', () => navigate(2));
document.getElementById('link2').addEventListener('click', () => navigate(3));

```
> 示例2
```js
// 设置初始状态
window.history.replaceState({ color: 'red' }, '', '/color/red');
changeColor('red');

// 监听颜色按钮点击
document.getElementById('blueButton').addEventListener('click', () => {
  window.history.pushState({ color: 'blue' }, '', '/color/blue');
  changeColor('blue');
});

// 监听popstate事件来处理浏览器的前进和后退按钮
window.addEventListener('popstate', (event) => {
  const state = event.state;
  if (state && state.color) {
    changeColor(state.color);
  }
});

// 定义颜色更改函数
function changeColor(color) {
  document.body.style.backgroundColor = color;
}
    
```
> 示例3 （随书案例）
```html
<html lang="zh">
  <head>
    <title>我正在想一个数字...</title>
    <style>
      body {
        height: 250px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
      }
      #heading {
        font: bold 36px sans-serif;
        margin: 0;
      }
      #container {
        border: solid black 1px;
        height: 1em;
        width: 80%;
      }
      #range {
        background-color: green;
        margin-left: 0%;
        height: 1em;
        width: 100%;
      }
      #input {
        display: block;
        font-size: 24px;
        width: 60%;
        padding: 5px;
      }
      #playagain {
        font-size: 24px;
        padding: 10px;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <h1 id="heading">我正在想一个数字...</h1>
    <!-- 没有被排除的数字的可视化表示 -->
    <div id="container"><div id="range"></div></div>
    <!-- 用户输入猜测的地方 -->
    <input id="input" type="text" />
    <!-- 游戏结束后才显示的一个按钮，重新加载并没有搜索字符串 -->
    <button id="playagain" hidden onclick="location.search='';">重新玩</button>
    <script>
      /**
       * 这个GameState类的实例代表我们的数字猜测游戏的内部状态。该类定义了用于
       * 从不同来源初始化游戏状态的静态工厂方法、基于新猜测更新状态的方法，以及基于
       * 当前状态修改文档的方法。
       */
      class GameState {
        // 这是一个创建新游戏的工厂函数
        static newGame() {
          let s = new GameState()
          s.secret = s.randomInt(0, 100) // 一个整数：0 < n < 100
          s.low = 0 // 猜测必须大于此值
          s.high = 100 // 猜测必须小于此值
          s.numGuesses = 0 // 已经猜了多少次
          s.guess = null // 上一次的猜测是什么
          return s
        }

        // 当我们使用history.pushState()保存游戏状态时，保存的只是一个普通的
        // JavaScript对象，而不是GameState的实例。所以这个工厂函数基于我们从
        // popstate事件获取的普通对象重新创建GameState对象。
        static fromStateObject(stateObject) {
          let s = new GameState()
          for (let key of Object.keys(stateObject)) {
            s[key] = stateObject[key]
          }
          return s
        }

        // 为了能够启用书签功能，我们需要能够将任何游戏的状态编码为URL。
        // 使用URLSearchParams很容易做到这一点。
        toURL() {
          let url = new URL(window.location)
          url.searchParams.set('l', this.low)
          url.searchParams.set('h', this.high)
          url.searchParams.set('n', this.numGuesses)
          url.searchParams.set('g', this.guess)
          // 注意，我们不能在url中编码秘密数字，否则它
          // 会泄露秘密。如果用户用这些参数将页面标记为书签，
          // 然后返回，我们将在low和high之间简单地选择一个新的随机数字。
          return url.href
        }

        // 这是一个工厂函数，根据指定的URL创建并初始化一个新的GameState对象。
        // 如果URL不包含我们需要的参数，或者它们格式不正确，它就会返回null。
        static fromURL(url) {
          let s = new GameState()
          let params = new URL(url).searchParams
          s.low = parseInt(params.get('l'))
          s.high = parseInt(params.get('h'))
          s.numGuesses = parseInt(params.get('n'))
          s.guess = parseInt(params.get('g'))

          // 如果URL缺少我们需要的任何参数，或者
          // 它们没有解析为整数，那么返回null；
          if (isNaN(s.low) || isNaN(s.high) || isNaN(s.numGuesses) || isNaN(s.guess)) {
            return null
          }

          // 每次从URL还原游戏时，都会选择正确范围内的新秘密数字。
          s.secret = s.randomInt(s.low, s.high)
          return s
        }

        // 返回一个整数n，min < n < max
        randomInt(min, max) {
          return min + Math.ceil(Math.random() * (max - min - 1))
        }

        // 修改文档以显示游戏的当前状态。
        render() {
          let heading = document.querySelector('#heading') // 顶部的<h1>
          let range = document.querySelector('#range') // 显示猜测范围
          let input = document.querySelector('#input') // 猜测输入框
          let playagain = document.querySelector('#playagain')

          // 更新文档标题和标题
          heading.textContent =
            document.title = `我正在想一个数字，介于 ${this.low} 和 ${this.high} 之间。`

          // 更新数字的可视范围
          range.style.marginLeft = `${this.low}%`
          range.style.width = `${this.high - this.low}%`

          // 确保输入字段为空并聚焦。
          input.value = ''
          input.focus()

          // 基于用户的最后一个猜测显示反馈。输入字段为空，
          // 占位符将显示。
          if (this.guess === null) {
            input.placeholder = '输入你的猜测并按回车'
          } else if (this.guess < this.secret) {
            input.placeholder = `${this.guess} 太低了。再猜一次`
          } else if (this.guess > this.secret) {
            input.placeholder = `${this.guess} 太高了。再猜一次`
          } else {
            input.placeholder = document.title = `${this.guess} 是正确的!`
            heading.textContent = `你在 ${this.numGuesses} 次猜测中赢了!`
            playagain.hidden = false
          }
        }

        // 基于用户猜测更新游戏状态。如果状态已更新，则返回true，
        // 否则返回false。
        updateForGuess(guess) {
          // 检查猜测是否合法。如果不是，则返回false，状态未改变。
          if (isNaN(guess) || guess < this.low || guess > this.high) {
            return false
          }
          this.guess = guess
          this.numGuesses++

          // 根据猜测更新范围。
          if (guess < this.secret) {
            this.low = guess + 1
          } else if (guess > this.secret) {
            this.high = guess
          }

          // 如果用户赢了，就隐藏猜测输入字段和再玩一次的按钮。
          if (guess === this.secret) {
            document.querySelector('#input').hidden = true
          }

          return true // 状态已更新
        }
      }

      // 有了GameState类的定义，使游戏工作只是在适当的时候初始化、更新、保存和渲染状态对象的问题。

      // 当我们首次加载时，我们尝试从URL获取游戏状态，如果失败，则开始新游戏。
      // 因此，如果用户添加书签，该游戏可以从URL还原。但是，如果我们加载没有查询参数的页面，我们将只得到一个新游戏。
      let gamestate = GameState.fromURL(window.location) || GameState.newGame()

      // 使用replaceState将游戏的初始状态保存到浏览器历史记录中，而不是用pushState()来保存此初始页面
      history.replaceState(gamestate, '', gamestate.toURL())

      // 显示这个初始状态
      gamestate.render()

      // 当用户猜测时，根据他们的猜测更新游戏状态，然后将新状态保存到浏览器历史记录中并呈现新状态
      document.querySelector('#input').onchange = event => {
        let guess = parseInt(event.target.value)
        if (gamestate.updateForGuess(guess)) {
          // 如果状态改变了...
          history.pushState(gamestate, '', gamestate.toURL())
          gamestate.render()
        }
      }

      // 如果用户在历史记录中向前或向后浏览，我们将在窗口对象上收到一个popstate事件，并附带我们用pushState保存的状态对象副本。
      // 当发生这种情况时，呈现新状态。
      window.onpopstate = event => {
        gamestate = GameState.fromStateObject(event.state)
        gamestate.render()
      }
    </script>
  </body>
</html>
```
### 15.11 networking
#### 15.11.2 Server-Sent Events
> 主要是`EventSource` 
> 示例1:
+ 客户端
```html
<html lang="">
<head><title>SSE 聊天</title></head>
<body>
<!-- 聊天界面只是一个文本输入字段 -->
<!-- 在这个输入字段前插入新的聊天消息 -->
<input id="input" style="width:100%; padding:10px; border:solid black 2px"/>
<script>
    // 处理一些UI细节
    let nick = prompt("输入你的昵称");              // 获取用户的昵称
    let input = document.getElementById("input"); // 找到输入字段
    input.focus();                                // 设置键盘焦点

    // 使用 EventSource 注册新消息的通知
    let chat = new EventSource("/chat");
    chat.addEventListener("chat", event => {   // 当聊天消息到达时
        let div = document.createElement("div"); // 创建一个 <div>
        div.append(event.data);                  // 从消息中添加文本
        input.before(div);                       // 在输入前添加 div
        input.scrollIntoView();                  // 确保输入元素可见
    });

    // 使用 fetch 将用户的消息发布到服务器
    input.addEventListener("change", ()=>{  // 当用户按下回车键时
        fetch("/chat", {                    // 启动一个HTTP请求到此URL。
            method: "POST",                 // 将其设为带有主体的POST请求
            body: nick + ": " + input.value // 设置为用户的昵称和输入。
        })
                .catch(e => console.error);         // 忽略响应，但记录任何错误。
        input.value = "";                   // 清空输入
    });
</script>
</body>
</html>

```
+ 服务端
```js
// 这是服务器端的 JavaScript，意在通过 NodeJS 运行。
// 它实现了一个非常简单、完全匿名的聊天室。
// 通过 /chat 发布新消息，或从同一 URL 获取文本/事件流的消息。
// 对 / 发出 GET 请求返回包含客户端聊天 UI 的简单 HTML 文件。
const http = require("http");
const fs = require("fs");
const url = require("url");

// 聊天客户端的HTML文件。下面使用。
const clientHTML = fs.readFileSync("chatClient.html");

// 我们将向其发送事件的 ServerResponse 对象数组
let clients = [];

// 创建新的服务器，并在端口8080上监听。
// 连接到http://localhost:8080/来使用它。
let server = new http.Server();
server.listen(8080);

// 当服务器收到新请求时，运行此函数
server.on("request", (request, response) => {
    // 解析请求的URL
    let pathname = url.parse(request.url).pathname;

    // 如果请求是 "/", 发送客户端聊天 UI。
    if (pathname === "/") {  // 请求聊天UI
        response.writeHead(200, {"Content-Type": "text/html"}).end(clientHTML);
    }
    // 除了 "/chat"，或者方法不是 "GET" 和 "POST" 之外的任何路径或方法，都返回404错误
    else if (pathname !== "/chat" ||
        (request.method !== "GET" && request.method !== "POST")) {
        response.writeHead(404).end();
    }
    // 如果 /chat 请求是 GET，则客户端正在连接。
    else if (request.method === "GET") {
        acceptNewClient(request, response);
    }
    // 否则 /chat 请求是新消息的 POST
    else {
        broadcastNewMessage(request, response);
    }
});

// 这处理了 /chat 端点的 GET 请求，当
// 客户端创建新的 EventSource 对象时生成（或 EventSource 自动重新连接时）。
function acceptNewClient(request, response) {
    // 记住响应对象，以便我们可以向其发送将来的消息
    clients.push(response);

    // 如果客户端关闭连接，则从活动客户端数组中删除相应的响应对象
    request.connection.on("end", () => {
        clients.splice(clients.indexOf(response), 1);
        response.end();
    });

    // 设置头部并向这个客户端发送初始聊天事件
    response.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Connection": "keep-alive",
        "Cache-Control": "no-cache"
    });
    response.write("event: chat\ndata: 已连接\n\n");

    // 注意，我们有意不在此处调用 response.end()。
    // 保持连接打开是 Server-Sent Events 工作的原因。
}

// 此函数在响应 /chat 端点的 POST 请求时调用
// 客户端在用户输入新消息时发送
async function broadcastNewMessage(request, response) {
    // 首先，读取请求体以获取用户的消息
    request.setEncoding("utf8");
    let body = "";
    for await (let chunk of request) {
        body += chunk;
    }

    // 一旦我们读取了主体，就发送空响应并关闭连接
    response.writeHead(200).end();

    // 将消息格式化为 text/event-stream 格式，每行前缀为 "data: "
    let message = "data: " + body.replace("\n", "\ndata: ");

    // 给消息数据一个前缀，定义它为 "chat" 事件
    // 并给它一个双换行后缀，标记事件的结束。
    let event = `event: chat\n${message}\n\n`;

    // 现在将此事件发送给所有监听的客户端
    clients.forEach(client => client.write(event));
}

```
> 示例2:
+ 客户端HTML文件（位于public文件夹）
```html
<!DOCTYPE html>
<html>
<head>
  <title>Chat Room</title>
</head>
<body>
  <div id="chat"></div>
  <input id="message" type="text" placeholder="Type your message here">
  <button onclick="sendMessage()">Send</button>
  <script src="chat.js"></script>
</body>
</html>
```
+ 客户端JS文件（`chat.js`,位于public文件夹）
```js
const eventSource = new EventSource('/events');

eventSource.onmessage = function(e) {
  const chat = document.getElementById('chat');
  const message = document.createElement('div');
  message.textContent = e.data;
  chat.appendChild(message);
};

function sendMessage() {
  const messageInput = document.getElementById('message');
  const message = messageInput.value;
  fetch('/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message })
  });
  messageInput.value = '';
}
```
+ 服务器端代码（使用Node.js和Express）
```js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const clients = [];

app.post('/send', (req, res) => {
  const message = req.body.message;
  clients.forEach(client => client.write(`data: ${message}\n\n`));
  res.status(204).end();
});

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.flushHeaders();

  clients.push(res);
  req.on('close', () => {
    const index = clients.indexOf(res);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

app.listen(port, () => {
  console.log(`Chat app listening at http://localhost:${port}`);
});
```
### 15.13 Worker Threads and Messaging
#### 15.13.2 The Global Object in Workers
> 当您使用 `Worker() `构造函数创建新的工作线程时，您可以指定 `JavaScript` 代码文件的 `URL`。该代码在一个新的、原始的 `JavaScript` 执行环境中执行，与创建工作线程的脚本隔离。该新执行环境的全局对象是 `WorkerGlobalScope` 对象。
> `WorkerGlobalScope` 对象有一个 `postMessage()` 方法和一个 `onmessage` 事件处理程序属性，它们与 `Worker` 对象的方法和 `onmessage` 事件处理程序属性类似，但工作方向相反：在工作程序内部调用 `postMessage()` 会在工作程序外部生成消息事件，并从工作程序发送消息在 `worker` 外部被转化为事件并传递给 `onmessage` 处理程序。因为 `WorkerGlobalScope` 是工作程序的全局对象，所以 `postMessage()` 和 `onmessage` 对于工作程序代码来说看起来就像是全局函数和全局变量。
> 由于 `WorkerGlobalScope` 是`worker`的全局对象，因此它具有核心 `JavaScript` 全局对象的所有属性，例如 `JSON` 对象、`isNaN()` 函数和 `Date()` 构造函数。不过除此之外，`WorkerGlobalScope` 还具有客户端 `Window` 对象的以下属性：
> + `self` 是对全局对象本身的引用。 `WorkerGlobalScope` 不是 `Window` 对象，并且没有定义 `Window` 属性。
> + 定时器方法 `setTimeout()`、`clearTimeout()`、`setInterval()` 和`clearInterval()`。
> + `location`,属性引用 Location 对象，就像 `Window` 的 `location` 属性一样。 Location 对象具有属性 `href`, `protocol`, `host`, `hostname`, `port`, `pathname`, `search`,  `hash`。然而，在`worker`线程中，这些属性是只读的。
> + `navigator` 属性引用 `Navigator` 对象，就像 `Window` 的 `navigator` 属性一样。`Navigator` 对象具有属性 `appName`、`appVersion`、`platform`、`userAgent` 和 `onLine`。
> + 常用的事件目标方法 `addEventListener()` 和 `removeEventListener()` 。
#### 15.13.3 Importing Code into a Worker
>  WorkerGlobalScope 将 importScripts() 定义为所有`worker`都可以访问的全局函数：
```js
// Before we start working, load the classes and utilities we'll need
importScripts("utils/Histogram.js", "utils/BitSet.js");

```
> `importScripts()` 接受一个或多个 URL 参数，每个参数都应引用一个 `JavaScript` 代码文件。相对 URL 是相对于传递给 `Worker() `构造函数的 URL 进行解析的（而不是相对于包含的文档）。 `importScripts()` 按照指定的顺序逐个同步加载并执行这些文件。如果加载脚本导致网络错误，或者执行引发任何类型的错误，则不会加载或执行任何后续脚本。使用 `importScripts()` 加载的脚本本身可以调用 `importScripts() `来加载它所依赖的文件。但请注意，`importScripts() `不会尝试跟踪已加载的脚本，也不会采取任何措施来防止依赖循环。
> `importScripts()` 是一个同步函数：直到所有脚本加载并执行后它才会返回。 `importScripts()` 返回后，您就可以开始使用加载的脚本：不需要回调、事件处理程序、then() 方法或等待。一旦您内化了客户端 JavaScript 的异步特性，再次回到简单的同步编程就会感觉很奇怪。但这就是线程的美妙之处：您可以在工作线程中使用阻塞函数调用，而不会阻塞主线程中的事件循环，也不会阻塞其他工作线程中同时执行的计算。
> `WORKERS` 中的模块 为了在 `Workers` 中使用模块，您必须将第二个参数传递给 `Worker()` 构造函数。第二个参数必须是一个类型属性设置为字符串“module”的对象。将 `type:“module”` 选项传递给 Worker() 构造函数非常类似于在 HTML <script> 标记上使用 `type=“module”` 属性：这意味着代码应被解释为模块，并且允许进口报关。如果您不指定 `type:“module”`，则代码将被解释为脚本，并且不允许导入。
#### 15.13.5 postMessage(), MessagePorts, and MessageChannels
> `MessageChannel` 是 HTML5 中引入的一个 API，用于创建新的消息通道。消息通道有两个端口，通过这两个端口，不同的文档或者 `web workers` 可以彼此通信。这在浏览器环境中的不同上下文之间进行消息传递是非常有用的。
> `Web Workers` 允许在后台线程中运行 `JavaScript` 代码，不会影响主线程的执行。您可以通过使用 `MessageChannel` 在主线程和 `Worker` 之间进行通信。这是一个简单的例子：
```js
//主线程代码
// 创建一个 Worker
const myWorker = new Worker('worker.js');

// 创建一个 MessageChannel
const channel = new MessageChannel();
// 
// 向 Worker 发送 port2，以便在 Worker 中进行通信
myWorker.postMessage('Here is your port', [channel.port2]);

// 设置 port1 的消息处理程序
channel.port1.onmessage = (e) => {
  console.log('Received message from worker:', e.data);
};

// 可以通过 port1 向 Worker 发送消息
channel.port1.postMessage('Message from main thread');
//Worker 代码 (worker.js)
// 监听主线程传来的消息
self.onmessage = (e) => {
  const port = e.ports[0];

  port.onmessage = (event) => {
    console.log('Received message from main thread:', event.data);
    port.postMessage('Message from worker');
  };
};
```
>  `postMessage` 方法的第二个参数:
> + 转移对象
> 在 postMessage 方法中，第二个参数是一个转移对象的数组。这些对象会从发送方的上下文完全转移至接收方，而不是复制。转移后的对象在发送方的上下文中将不再可用。 这与传统的对象复制不同，传统的对象复制会在源和目标上下文中都保留该对象的副本。 例如，当您通过 postMessage 将 MessagePort 或 ArrayBuffer 对象转移时，该对象在发送方的上下文中将不再可用，只能在接收方的上下文中访问。
> + 高效性
> 对象的转移要比复制更高效，因为它不涉及对象内容的实际复制。它只是改变了对象的所有权，从而使对象从一个上下文转移到另一个上下文。 考虑一个包含大量数据的 ArrayBuffer 对象。通过传统的复制方式传输这样的对象可能需要相当多的时间和资源，因为必须创建对象的完整副本。而通过转移对象，可以几乎立即完成操作，因为不需要复制对象的内容。
#### 15.13.6 使用 postMessage() 进行跨源消息传递
> `Window` 的 `postMessage()` 方法与 `Worker` 的 `postMessage()` 方法略有不同。第一个参数仍然是一个任意消息，将由结构化克隆算法复制。但是列出要传输而不是复制的对象的可选第二个参数将成为可选的第三个参数。`window`的 `postMessage() `方法将字符串作为其所需的第二个参数。第二个参数应该是一个来源（协议、主机名和可选端口），指定您希望接收消息的人。如果您传递字符串“https://good.example.com”作为第二个参数，但您要发布消息的窗口实际上包含来自“https://malware.example.com”的内容，则您发送的消息发布的将不会被传递。如果您愿意将消息发送到来自任何来源的内容，则可以传递通配符“*”作为第二个参数。
### 15.14 例子：mandelbrot 
```js
/*
 * 这个类表示画布或图像的子矩形。我们使用Tiles来
 * 将画布划分成可以由Workers独立处理的区域。
 */
class Tile {
    constructor(x, y, width, height) {
        this.x = x;                     // Tile对象的属性
        this.y = y;                     // 表示瓦片在更大
        this.width = width;             // 的矩形内的位置和大小
        this.height = height;           // 。
    }

    // 这个静态方法是一个生成器，它将指定的宽度和高度的矩形
    // 划分为指定的行数和列数，并生成numRows*numCols个Tile对象来覆盖矩形。
    static *tiles(width, height, numRows, numCols) {
        let columnWidth = Math.ceil(width / numCols);
        let rowHeight = Math.ceil(height / numRows);

        for(let row = 0; row < numRows; row++) {
            let tileHeight = (row < numRows-1)
                ? rowHeight                          // 大部分行的高度
                : height - rowHeight * (numRows-1);  // 最后一行的高度
            for(let col = 0; col < numCols; col++) {
                let tileWidth = (col < numCols-1)
                    ? columnWidth                    // 大部分列的宽度
                    : width - columnWidth * (numCols-1); // 最后一列的宽度

                yield new Tile(col * columnWidth, row * rowHeight,
                    tileWidth, tileHeight);
            }
        }
    }
}

/*
 * 这个类表示一个工人池，所有工人运行相同的代码。您指定的
 * 工人代码必须对收到的每条消息做出响应，通过执行某种计算
 * 然后用计算结果发布一条消息。
 *
 * 给定WorkerPool和表示要执行的工作的消息，只需调用
 * addWork()，并将消息作为参数。如果有一个Worker对象当前
 * 处于空闲状态，该消息将立即发布给该工人。如果没有空闲的
 * Worker对象，消息将排队，等待工人可用时再发布。
 *
 * addWork()返回一个Promise，当工作完成时，将解析为工人的
 * 响应，或者如果工人抛出未处理的错误则会拒绝。
 */
class WorkerPool {
    constructor(numWorkers, workerSource) {
        this.idleWorkers = [];       // 当前未工作的工人
        this.workQueue = [];         // 当前未处理的工作
        this.workerMap = new Map();  // 将工人映射到resolve和reject函数

        // 创建指定数量的工人，添加消息和错误处理程序，
        // 并将它们保存在idleWorkers数组中。
        for(let i = 0; i < numWorkers; i++) {
            let worker = new Worker(workerSource);
            worker.onmessage = message => {
                this._workerDone(worker, null, message.data);
            };
            worker.onerror = error => {
                this._workerDone(worker, error, null);
            };
            this.idleWorkers[i] = worker;
        }
    }

    // 当工人完成工作时，通过发送消息或抛出错误，
    // 调用此内部方法。
    _workerDone(worker, error, response) {
        // 查找此工人的resolve()和reject()函数，
        // 然后从映射中删除工人的条目。
        let [resolver, rejector] = this.workerMap.get(worker);
        this.workerMap.delete(worker);

        // 如果没有排队的工作，将此工人放回空闲工人列表。
        // 否则，从队列中取出工作并发送给此工人。
        if (this.workQueue.length === 0) {
            this.idleWorkers.push(worker);
        } else {
            let [work, resolver, rejector] = this.workQueue.shift();
            this.workerMap.set(worker, [resolver, rejector]);
            worker.postMessage(work);
        }

        // 最后，解析或拒绝与工人关联的承诺。
        error === null ? resolver(response) : rejector(error);
    }

    // 此方法将工作添加到工人池，并返回一个Promise，
    // 当工作完成时，将解析为工人的响应。工作是通过postMessage()
    // 传递给工人的值。如果有空闲的工人，工作消息将立即发送。
    // 否则，它将排队直到工人可用。
    addWork(work) {
        return new Promise((resolve, reject) => {
            if (this.idleWorkers.length > 0) {
                let worker = this.idleWorkers.pop();
                this.workerMap.set(worker, [resolve, reject]);
                worker.postMessage(work);
            } else {
                this.workQueue.push([work, resolve, reject]);
            }
        });
    }
}

/*
 * 此类包含了渲染Mandelbrot集所需的状态信息。
 * cx和cy属性给出了复平面中图像中心的点。perPixel属性指定
 * 每个图像像素的复数的实部和虚部是如何变化的。
 * maxIterations属性指定了我们为计算集合所付出的努力。
 * 较大的数字需要更多的计算，但会产生更清晰的图像。
 * 请注意，画布的大小不是状态的一部分。给定cx、cy和
 * perPixel，我们只是按照当前大小渲染画布适合的Mandelbrot集的部分。
 *
 * 这种类型的对象用于history.pushState()，并用于从
 * 书签或共享URL中读取所需的状态。
 */
class PageState {
    // 这个工厂方法返回一个初始状态以显示整个集合。
    static initialState() {
        let s = new PageState();
        s.cx = -0.5;
        s.cy = 0;
        s.perPixel = 3/window.innerHeight;
        s.maxIterations = 500;
        return s;
    }

    // 此工厂方法从URL获取状态，或返回null，如果
    // 无法从URL读取有效状态。
    static fromURL(url) {
        let s = new PageState();
        let u = new URL(url); // 从url的搜索参数中初始化状态。
        s.cx = parseFloat(u.searchParams.get("cx"));
        s.cy = parseFloat(u.searchParams.get("cy"));
        s.perPixel = parseFloat(u.searchParams.get("pp"));
        s.maxIterations = parseInt(u.searchParams.get("it"));
        // 如果我们得到有效的值，返回PageState对象，否则返回null。
        return (isNaN(s.cx) || isNaN(s.cy) || isNaN(s.perPixel)
            || isNaN(s.maxIterations))
            ? null
            : s;
    }

    // 此实例方法将当前状态编码到浏览器当前位置的搜索参数中。
    toURL() {
        let u = new URL(window.location);
        u.searchParams.set("cx", this.cx);
        u.searchParams.set("cy", this.cy);
        u.searchParams.set("pp", this.perPixel);
        u.searchParams.set("it", this.maxIterations);
        return u.href;
    }
}

// 这些常量控制Mandelbrot集计算的并行性。
// 您可能需要调整它们以在您的计算机上获得最佳性能。
const ROWS = 3, COLS = 4, NUMWORKERS = navigator.hardwareConcurrency || 2;

// 这是我们的Mandelbrot集程序的主类。只需调用
// 构造函数，传入要渲染的<canvas>元素。程序
// 假设<canvas>元素的样式使其始终与浏览器窗口一样大。
class MandelbrotCanvas {
    constructor(canvas) {
        // 存储画布，获取其上下文对象，并初始化WorkerPool
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.workerPool = new WorkerPool(NUMWORKERS, "mandelbrotWorker.js");

        // 定义一些稍后将使用的属性
        this.tiles = null;          // 画布的子区域
        this.pendingRender = null;  // 我们目前没有渲染
        this.wantsRerender = false; // 目前没有请求渲染
        this.resizeTimer = null;    // 防止我们频繁调整大小
        this.colorTable = null;     // 将原始数据转换为像素值。

        // 设置我们的事件处理程序
        this.canvas.addEventListener("pointerdown", e => this.handlePointer(e));
        window.addEventListener("keydown", e => this.handleKey(e));
        window.addEventListener("resize", e => this.handleResize(e));
        window.addEventListener("popstate", e => this.setState(e.state, false));

        // 从URL初始化我们的状态或从初始状态开始。
        this.state =
            PageState.fromURL(window.location) || PageState.initialState();

        // 用历史机制保存此状态。
        history.replaceState(this.state, "", this.state.toURL());

        // 设置画布大小并获得覆盖它的瓦片数组。
        this.setSize();

        // 并将Mandelbrot集渲染到画布中。
        this.render();
    }

    // 设置画布大小并初始化Tile对象的数组。这个方法被
    // 构造函数调用，也被handleResize()方法调用，
    // 当浏览器窗口调整大小时。
    setSize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.tiles = [...Tile.tiles(this.width, this.height, ROWS, COLS)];
    }

    // 这个函数更改PageState，然后重新渲染
    // Mandelbrot集使用新的状态，并通过
    // history.pushState()保存新状态。如果第一个参数是
    // 一个函数，那么它将用状态对象作为其参数，并应该对状态进行更改。
    // 如果第一个参数是一个对象，那么我们只是将该对象的属性复制到状态对象中。
    // 如果可选的第二个参数为false，则不会保存新状态。
    // （当我们收到popstate事件时，我们用第二个参数为false调用setState。）
    setState(f, save=true) {
        // 如果参数是一个函数，调用它以更新状态。
        // 否则，将其属性复制到当前状态中。
        if (typeof f === "function") {
            f(this.state);
        } else {
            for(let property in f) {
                this.state[property] = f[property];
            }
        }

        // 无论如何，尽快开始渲染新状态。
        this.render();

        // 通常我们保存新的状态。除非我们被带着
        // 第二个参数为false调用，这样我们会得到一个popstate事件。
        if (save) {
            history.pushState(this.state, "", this.state.toURL());
        }
    }

    // 此方法异步将PageState对象指定的Mandelbrot集的一部分绘制到画布中。
    // 它由构造函数调用，当状态改变时由setState()调用，
    // 当画布大小改变时由resize事件处理程序调用。
    render() {
        // 有时用户可能会使用键盘或鼠标更快地请求渲染
        // 比我们可以执行的要多。我们不想将所有渲染提交到工作人员池。
        // 相反，如果我们正在渲染，我们会注意到需要重新渲染，当当前
        // 渲染完成时，我们将渲染当前状态，可能跳过多个中间状态。
        if (this.pendingRender) {        // 如果我们已经在渲染，
            this.wantsRerender = true;   // 注意稍后重新渲染
            return;                      // 现在不要做更多的事情。
        }

        // 获取我们的状态变量，并计算画布的左上角的复杂数字。
        let {cx, cy, perPixel, maxIterations} = this.state;
        let x0 = cx - perPixel * this.width/2;
        let y0 = cy - perPixel * this.height/2;

        // 对于我们的ROWS*COLS个瓦片，用消息调用addWork()
        // 给mandelbrotWorker.js中的代码。将生成的Promise对象收集到数组中。
        let promises = this.tiles.map(tile => this.workerPool.addWork({
            tile: tile,
            x0: x0 + tile.x * perPixel,
            y0: y0 + tile.y * perPixel,
            perPixel: perPixel,
            maxIterations: maxIterations
        }));

        // 使用Promise.all()从promise数组中获得一个响应数组。
        // 每个响应都是我们的瓦片之一的计算。
        // 请注意，每个响应都包括Tile对象，其中包括
        // ImageData对象，该对象包括迭代计数而不是像素值，
        // 以及该瓦片的最小和最大迭代次数。
        this.pendingRender = Promise.all(promises).then(responses => {

            // 首先，在所有瓦片上找到最大和最小迭代次数。
            // 我们需要这些数字，以便我们可以为像素分配颜色。
            let min = maxIterations, max = 0;
            for(let r of responses) {
                if (r.min < min) min = r.min;
                if (r.max > max) max = r.max;
            }

            // 现在我们需要一种方法将工人的原始迭代计数转换为
            // 将在画布中显示的像素颜色。我们知道所有像素都有
            // 在min和max迭代之间，所以我们预先计算每次迭代的颜色
            // 并将它们存储在colorTable数组中。

            // 如果我们还没有分配颜色表，或者它不再是正确的大小，
            // 那么分配一个新的。
            if (!this.colorTable || this.colorTable.length !== maxIterations+1){
                this.colorTable = new Uint32Array(maxIterations+1);
            }

            // 给定最大和最小值，在颜色表中计算适当的值。属于集合的像素将是
            // 完全不透明的黑色。集合外的像素将是半透明的黑色，较高的迭代计数将
            // 导致较高的不透明度。具有最小迭代计数的像素将是透明的，并且白色的背景
            // 将透视出来，从而产生灰度图像。
            if (min === max) {                // 如果所有像素都是一样的，
                if (min === maxIterations) {  // 那么把它们都变成黑色
                    this.colorTable[min] = 0xFF000000;
                } else {                      // 或者都透明。
                    this.colorTable[min] = 0;
                }
            } else {
                // 在min和max不同的正常情况下，使用
                // 对数刻度将每个可能的迭代计数分配一个介于0和255之间的不透明度，
                // 然后使用左移运算符将其转换为像素值。
                let maxlog = Math.log(1+max-min);
                for(let i = min; i <= max; i++) {
                    this.colorTable[i] =
                        (Math.ceil(Math.log(1+i-min)/maxlog * 255) << 24);
                }
            }

            // 现在将每个响应的ImageData中的迭代数字翻译成colorTable中的颜色。
            for(let r of responses) {
                let iterations = new Uint32Array(r.imageData.data.buffer);
                for(let i = 0; i < iterations.length; i++) {
                    iterations[i] = this.colorTable[iterations[i]];
                }
            }

            // 最后，使用putImageData()将所有imageData对象渲染到
            // 其对应的画布瓦片中。
            // （首先，尽管如此，删除可能已由pointerdown事件处理程序设置的画布上的任何CSS转换。）
            this.canvas.style.transform = "";
            for(let r of responses) {
                this.context.putImageData(r.imageData, r.tile.x, r.tile.y);
            }
        })
            .catch((reason) => {
                // 如果我们的任何承诺中的任何事情出错，我们将在这里记录
                // 一个错误。这不应该发生，但这将有助于调试，如果它确实发生。
                console.error("Promise rejected in render():", reason);
            })
            .finally(() => {
                // 当我们完成渲染时，清除pendingRender标志
                this.pendingRender = null;
                // 如果在我们忙的时候收到了渲染请求，现在重新渲染。
                if (this.wantsRerender) {
                    this.wantsRerender = false;
                    this.render();
                }
            });
    }

    // 这里是我们的事件处理程序。可以通过阅读代码来理解它们的工作方式。
    // 请注意，这些方法调用setState()更改状态，而不是直接调用render()。
    handlePointer(event) { /* ... */ }
    handleKey(event) { /* ... */ }
    handleResize(event) { /* ... */ }
}

// 当DOM准备好时，我们创建MandelbrotCanvas对象。
document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById("mandelbrot");
    new MandelbrotCanvas(canvas);
});

```
+ 初始化
> 通过 `DOMContentLoaded` 事件在 DOM 加载完成后创建 `MandelbrotCanvas` 对象。 定义了渲染的初始状态，如复数平面的中心、每像素的大小、最大迭代次数等。
+ 并行渲染
> 使用 `WorkerPool` 类创建工人池，每个工人负责一个瓦片的渲染。 将画布划分为多个瓦片，每个瓦片代表一部分图像。通过` Web Workers` 并行处理每个瓦片的渲染，计算每个像素的迭代次数。 使用 `Promises` 管理并行任务，确保所有任务完成后进行下一步。
+ 颜色映射
> 计算每个瓦片的最大和最小迭代次数。 创建颜色表，将迭代次数映射到颜色值。 通过颜色表将每个瓦片的迭代计数转换为像素颜色。
+ 图像渲染
> 使用 `putImageData` 方法将所有 `ImageData` 对象渲染到对应的画布瓦片中。 清除任何可能由事件处理程序设置的画布上的 CSS 转换。
+ 事件处理
> 定义了处理鼠标、键盘和窗口调整大小的事件处理程序。 通过事件处理程序更改状态并重新渲染，实现用户交互功能。
+ 错误处理和重渲染
> 在 `Promise` 链中捕获任何可能的错误，并在控制台中记录。 如果在渲染过程中收到新的渲染请求，将在当前渲染完成后重新渲染

### 15.15 总结和进一步阅读的建议
#### 15.15.8 移动设备 API

> + `Geolocation API` 允许 `JavaScript`（在用户许可的情况下）确定用户的物理位置。它在桌面和移动设备（包括 iOS 设备）上得到了很好的支持。使用 `navigator.geolocation.getCurrentPosition()` 请求用户的当前位置，并使用 `navigator.geolocation.watchPosition()` 注册当用户位置发生变化时调用的回调。
> + `navigator.vibrate()` 方法使移动设备（但不是 iOS）振动。通常，这只允许响应用户手势，但调用此方法将允许您的应用程序提供手势已被识别的无声反馈。
> + `ScreenOrientation API` 使 Web 应用程序能够查询移动设备屏幕的当前方向，并将自身锁定为横向或纵向。
> + 窗口对象上的 `devicemotion` 和 `deviceorientation` 事件报告设备的加速计和磁力计数据，使您能够确定设备如何加速以及用户如何在空间中定位它。 （这些事件在 iOS 上有效。）
> + 除了 `Android` 设备上的 `Chrome` 之外，传感器 API 尚未得到广泛支持，但它使 `JavaScript` 能够访问全套移动设备传感器，包括加速度计、陀螺仪、磁力计和环境光传感器。例如，这些传感器使 `JavaScript` 能够确定用户面向的方向或检测用户何时摇动手机。
#### 15.15.9 Binary APIs
+ Blob 类
> Blob 对象表示不可变的原始二进制数据。`Blob` 表示的数据不一定是 `JavaScript` 原生格式。可以使用 `FileReader` 对象或 Blob 方法来读取内容。
> + `size`: Blob 对象的大小，以字节为单位。
> + `type`: Blob 对象的MIME类型。
```js
// 创建 Blob 对象
const blob = new Blob(['Hello World'], { type: 'text/plain' });

// 输出属性
console.log(blob.size); // 11
console.log(blob.type); // "text/plain"

```
+ `File` 类
> `File` 类是 `Blob` 的子类，用于表示用户系统上的文件。
> + `name`: 文件的名称。
> + `lastModified`: 文件的最后修改时间，以毫秒为单位。
```js
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', function() {
  const file = this.files[0];

  // 输出属性
  console.log(file.name);
  console.log(file.lastModified);
});
```
+ FileReader 类
> `FileReader` 类用于异步读取存储在用户计算机上的文件（Blob对象包括File对象）
> + `readAsArrayBuffer(blob)`: 读取文件内容为 `ArrayBuffer`。
> + `readAsText`(blob, [encoding]): 读取文件内容为文本。
```js
const reader = new FileReader();

reader.onload = function() {
  console.log(this.result); // 文件内容
};

const file = fileInput.files[0];
reader.readAsText(file); // 读取文件为文本
```
+ Blob 的 text() 和 arrayBuffer() 方法
```js
blob.text().then(text => console.log(text)); // Hello World
blob.arrayBuffer().then(buffer => console.log(new Uint8Array(buffer))); // Uint8Array(11) [ 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100 ]

```
+  Stream() 方法
> Blob 的 stream() 方法返回一个可读流，可以逐块读取 Blob 的内容。
```js
const stream = blob.stream();
const reader = stream.getReader();

reader.read().then(({ value, done }) => {
  console.log(new TextDecoder().decode(value)); // Hello World
});

```


#### 15.15.10 Media APIs
> `navigator.mediaDevices.getUserMedia()` 函数允许 `JavaScript` 请求访问用户的麦克风和/或摄像机。成功的请求会生成 `MediaStream` 对象。视频流可以显示在 `<video>` 标记中（通过将 `srcObject` 属性设置为流）。可以使用 `canvas drawImage()` 函数将视频的静止帧捕获到屏幕外 `<canvas>` 中，从而生成分辨率相对较低的照片。 `getUserMedia()` 返回的音频和视频流可以使用 `MediaRecorder` 对象记录并编码为 `Blob`。
#### 15.15.11 密码学和相关 API
> `Window` 对象的 `crypto` 属性公开了用于加密安全伪随机数的 `getRandomValues()` 方法。其他加密、解密、密钥生成、数字签名等方法可通过 `crypto.subtle` 获得。该属性的名称是对每个使用这些方法的人的警告，正确使用加密算法很困难，并且除非您真正知道自己在做什么，否则不应使用这些方法。此外，`crypto.subtle` 的方法仅适用于在通过安全 HTTPS 连接加载的文档中运行的 `JavaScript` 代码。

