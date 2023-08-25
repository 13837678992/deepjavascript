## 2 模块机制
### 2.2 node模块实现
#### 2.2.3 模块编译
> 在Node中，每个文件模块都是一个对象，它的定义如下：
```js
class Module {
    constructor(id, parent) {
        this.id = id;
        this.exports = {};
        this.parent = parent;
        if (parent && parent.children) {
            parent.children.push(this);
        }
        this.filename = null;
        this.loaded = false;
        this.children = [];
    }
}
```
+ .js文件。通过fs模块同步读取文件后编译执行。
+ .node文件。这是用C/C++编写的扩展文件，通过`dlopen()`方法加载最后编译生成的文件。
+ .json文件。通过fs模块同步读取文件后，用JSON.parse()解析返回结果。
+ 其余扩展名文件。它们都被当做js文件载人。

> 每一个编译成功的模块都会将其文件路径作为索引缓存在`Module._cache`对象上，以提高2次引入的性能。

>根据不同的文件扩展名，Node会调用不同的读取方式，如json文件的调用如下：
