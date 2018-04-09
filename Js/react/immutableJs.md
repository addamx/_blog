
# immutableJs 在redux中的实践
- 还有两个轻量库可以实现不可变数据结构：**seamless-immutable**或者**immutability-helper**，只不过原理完全不一样，效率也没那么高。
- 避免大量使用 toJS 操作，这样会浪费性能。
- 不要将简单的 JavaScript 对象与 Immutable.JS 混合
- 结合 redux 的时候，要使用`import { combineReducers } from 'redux-immutablejs';`，因为redux 的 combineReducers 期望 state 是一个纯净的 js 对象。
- 尽量将 state 设计成扁平状的。
- 展示组件不要使用 Immutable 数据结构。
- 不要在 render 函数里一个 PureComponent 组件的 props 使用 `bind(this)` 或者 `style={ { - width: '100px' } }`，因为 shallowEqual 一定会对比不通过。