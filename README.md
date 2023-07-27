# 《JavaScript 权威指南第七版》
## [在线阅读](https://js.okten.cn/posts/)
## [github项目](https://github.com/ten-ltw/JavaScript-The-Definitive-Guide-7th-zh)
> 前言：`node：18.8.0`、 `"performance-now": "^2.1.0"`
## 3 类型、值和变量
### 3.7 The Global Object
> ES2020 最终定义了 `globalThis` 作为在任何上下文中引用全局对象的标准方式。到 2020 年初，所有现代浏览器和 Node 都实现了该特性。
### 3.9 类型转换
#### 3.9.3 对象到原始类型的转换
> + prefer-string算法首先尝试toString()方法。如果该方法被定义并返回一个原语值，那么JavaScript将使用该原语值(即使它不是字符串!)如果toString()不存在或者它返回一个对象，那么JavaScript会尝试valueOf()方法。如果该方法存在并返回一个原始值，那么JavaScript将使用该值。否则，转换将失败，并出现TypeError。
> + prefer-number算法的工作原理与prefer-string算法相似，不同之处是它首先尝试valueOf()，然后尝试toString()。
> + 无优先级算法取决于被转换对象的类。如果对象是Date对象，那么JavaScript使用prefer-string算法。对于任何其他对象，JavaScript都使用prefer-number算法。
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
## 5 语句
### 5.3 条件句
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
### 5.5 Jumps

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
## 6 对象
### 6.5 测试属性
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
### 6.6 枚举属性
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
+ Array 构造函数
+ 数组字面量
+ Array.of() 静态方法
+ Array.from() 静态方法
+ 可迭代数组...运算符
> 对于`Array.of`当 Array() 构造函数调用时有一个数值型实参，它会将实参作为数组的长度。但当调用时不止一个数值型实参时，它会将那些实参作为数组的元素创建。这意味着 Array() 构造函数不能创建只有一个数值型元素的数组。在 ES6 中，Array.of() 函数修复了这个问题：它是一个将其实参值（无论有多少个实参）作为数组元素创建并返回一个新数组的工厂方法：
```js
Array.of()        // => []; returns empty array with no arguments
Array.of(10)      // => [10]; can create arrays with a single numeric argument
Array.of(1,2,3)   // => [1, 2, 3]
```

#### 7.1.5 Array.from()
> `Array.from()` 也很重要，因为它定义了一个将类数组对象拷贝成数组的方法。类数组对象是一个不是数组的对象，它有一个数值型的 length 属性，并且它的值碰巧保存在属性名为整数的属性中。当使用客户端 JavaScript 时，一些浏览器方法的返回值是类数组的，并且当将其转化成真正的数组后会更容易操作它们：
```js
var arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
var array = Array.from(arrayLike);
console.log(array); // ['a', 'b', 'c']
    
```
### 7.8 数组方法
#### 7.8.6 Array Searching and Sorting Methods
+ `includes() findeIndex() some()`
> `includes()` 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。但是在实际的业务中，我们更关心的是数组中是否包含某个对象，而不是某个值。这时候我们可以使用 `Array.prototype.some()`或者`Array.prototype.findIndex()` 方法来实现：

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
> 总结。对于特定的场景，Map的性能是最优的，但是对于简单的数据，Set的性能是最优的，但是对于复杂的数据，Array的性能是最优的。
#### 7.8.7 Array to String Conversions
> Array 类定义了三个方法来将数组转化为字符串，`join() `,`toString()` 和 `toLocaleString()`。以及`JSON.stringify()`,它可以将任意 JavaScript 值转化为 JSON 字符串。这些方法的区别在于它们的参数和返回值。
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
> lodash 的 cloneDeep 方法会处理循环引用、函数、日期、正则表达式等特殊对象，这需要额外的检查和逻辑，可能导致性能下降。
> 另一方面，JSON.stringify 和 JSON.parse 方法需要将对象转换为字符串，然后再将字符串转换回对象。这个过程涉及到序列化和反序列化，可能比直接复制对象的属性更耗时。
> 递归的深拷贝方法在性能上表现最好，但是它不能处理循环引用，因此在实际的业务中，我们需要根据实际的需求来选择合适的方法。

### 7.9 Array-Like Objects
>  JavaScript 数组和常规的对象有明显的区别。但是定义数组的本质特性。一种常常完全合理的看法是把拥有一个数值型 length 属性和对应非负整数属性的对象看作数组的同类。
> 实际上这些“类数组”对象在实践中偶尔出现，虽然不能通过它们直接调用数组方法或者期望 length 属性有什么特殊的行为，但是仍然可以用针对真正数组遍历代码来遍历它们。结论就是很多数组算法针对类数组对象同样奏效，就像针对真正的数组一样。尤其是这种情况，算法把数组看成只读的或者如果保持数组长度不变
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
> 大多数 JavaScript 数组方法都特意定义为泛型，以便它们在应用于除数组之外的类数组可以正常工作。由于类数组对象不会从 Array.prototype 继承，因此不能直接在它们上调用数组方法。但是，可以使用 Function.call 方法间接调用它们：
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
> 请记住，字符串是不可变值，因此当字符串被视为数组时，它们是只读数组。数组方法 push()、sort()、reverse() 和 splice() 直接修改数组，它们不能处理字符串。但是，尝试使用数组方法修改字符串不会引发异常：它只是静默失败。

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

> 字段初始化代码已移出构造函数，现在直接显示在类正文中。（当然，该代码仍作为构造函数的一部分运行。如果不定义构造函数，则字段初始化为隐式创建的构造函数的一部分。赋值左侧的 this. 前缀消失，但请注意即使是在初始化赋值的右侧，仍必须使用 this. 前缀引用这些字段。这种方式初始化实例字段的优点是，此语法允许（但不需要）将初始化放在类定义的顶部，使读者清楚地了解字段在每个实例将保存的状态。可以通过字段名后面跟一个分号来只声明不初始化一个字段。如果这样做，字段的初始值将是 undefined。显式设定初始化字段的值是比较好的风格。

> 标准化中的实例字段同时也定义了私有实例字段。如果使用上例中所示的实例字段初始化语法来定义其名称以 # 开头的字段（在 JavaScript 标识符中通常不是合法字符），则该字段在类正文中可用（使用 # 前缀），但对类正文之外的任何代码不可见且不可访问（因此不可变）。如果对于前面的 Buffer 类，要确保类的用户不会无意中修改实例的 size 字段，可以改为使用私有 #size 字段，然后定义 getter 函数以提供对值的只读访问：
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
> 示例：Sets.js：抽象类和实体类的层次
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

