# vue3+typescript完全指南
## 第一章 初遇vue
### 1.3 vue2的缺点
1. 对`typescript`支持不友好：vue2的源码是用`flow`写的，对`typescript`支持不友好，vue3的源码是用`typescript`写的，对`typescript`支持友好
2. Mixin 混入缺陷：`mixin`会造成命名冲突，`mixin`会造成代码不可追踪，`mixin`会造成代码不可复用
3. 响应式系统缺陷：`vue2`的响应式系统是基于`Object.defineProperty`实现的，`Object.defineProperty`只能劫持对象的属性，所以需要深度遍历对象的每个属性，如果对象的层次过多，性能会受到影响，`vue3`的响应式系统是基于`Proxy`实现的，`Proxy`可以劫持整个对象，不需要遍历对象的每个属性，性能更好
4. 逻辑零散：vue2使用`options API`，逻辑零散，不便于维护，vue3使用`composition API`，逻辑聚合，便于维护
