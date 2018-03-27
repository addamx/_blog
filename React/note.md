[深入迁出React和Reux](http://www.duokan.com/book/143695)

- jsx的onclick的处理: 1. 使用事件委托, 无论多少onclick, 都只在DOM树上添加一个事件处理函数, 挂载最顶层DOM节点; 2. React控制了组件生命周期, 在unmount时清楚相关的所有事件处理函数, 不存在内存泄漏;


# 设计React组件的原则与方法
- 划分组件边界的原则;
- React组件的数据种类;
- React组件的生命周期;

# 状态树的设计
- 一个模块控制一个状态节点(修改权)
- 避免冗余数据
- 树形结构扁平(范式化)

# 优化
## 单个组件的优化
1. jsx不要用匿名函数, 因为可能引起子组件不必要的重新渲染;
`<dv onClick={{() => {alert(1)}}></div>`
2. props赋值不要使用**对象/数组字面量**以及**匿名函数**, 因为`rect-redux-connect`也只进行浅比较, 而字面量赋值的props会使props每次都指向新的对象;
`<ComponentA style={{color: 'red'}} onChang={{() => {console.log(1)}}} />`


## 多个组件的优化
1. 避免包裹功能的DOM节点类型被随意改变, 因为会导致内部所有子节点也被卸载重载; 
`<div><Todos /></div>` => `<span><Todos /></span>`
2. 对于Component list, 一定要添加key, 但不要用数组的index;
React对于多个Component的序列的diff方法是, 直接挨个比较每个Component; 假如在序列最前插入一个Component zero, 在Component first之前, Rect会认为Component first变成了Component zero, 以此类推对序列所有Component实例进行更新;

## 数据获取的优化
1. reselect 实现缓存功能
https://github.com/reactjs/reselect

## 打包优化
1. `require.ensure('')`/`import('')`(es stage3)

# 测试工具
1. react-addons-perf: 支持16版以下; 
```js
import Perf from 'react-addons-perf';
const win = window;
win.Perf = Perf;
```
2. react-perf-devtool: 支持16版及以上;
https://github.com/nitin42/react-perf-devtool

3. redux-immutable-state-invariant: 检测是否改变了state
https://github.com/leoasis/redux-immutable-state-invariant
```js
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant').default());
}
```

# redux
- 每个中间件最里层处理action参数的函数返回值都会影响Store上dispatch函数的返回值。但是，每个中间件中这个函数返回值可能都不一样，像上面的redux-thunk，有可能返回的是下一个中间件返回的结果，也可能返回的是action参数作为函数执行的结果，同时在一个应用中使用的中间件也可能发生变化。所以，**dispatch函数调用的返回结果完全是不可控的，我们在代码中最好不要依赖于dispatch函数的返回值。**


# css
## react-addons-css-transition-group
http://reactcommunity.org/react-transition-group/
- 当我们要给一个数量变化的组件集体做动画的时候，TransitionGroup总是要包住这整个结合，就像TodoList上包住一个map函数产生的TodoItem组件实例数组一样，这也就是为什么TransitionGroup命名中带一个Group的原因
- enter过程并不包括TransitionGroup的首次装载，顾名思义，enter就是“进入”TransitionGroup，TransitionGroup实例装载完成之后，新加入的TodoItem组件算是“进入”，但是随TransitionGroup实例一起装载的TodoItem组件不算“进入”。
- 就想让随TransitionGroup实例一起装载的子组件也有动画呢？那就要使用appear过程，appear过程代表的就是随TransitionGroup一起“出现”的过程。transitionAppear的值默认是false, 为了启用这个过程的动画，我们要在Transi-tioGroup的属性中显示地设定transitionAppear的值为true


# Router
- react-router-redux
> router状态保存在redux中

- createElement
```js
const createElement = (Component, props) => {
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};
<Router history={history} createElement={createElement}>
```

- 代码分片
**component**:
1. require.ensure; 2. import
**router**:
- route的getComponent;
- react-loadable //https://reacttraining.com/react-router/web/guides/code-splitting


不能这样:
```js
const getPageCompnent = (pagePath, chunkName) => (nextState, callback) => {
  require.ensure([], function(require) {
    callback(null, require(pagePath).default);
  }, chunkName);
};
<Route path="home" getComponent={getPageCompnent('./pages/Home.js', 'home')} />
```
因为webpack的打包过程是对代码静态扫描的过程，也就是说，webpack工作的时候，我们缩写的代码并没有运行. 如果webpack看到的import和require参数不是字符串而是一个需要运算的表达式, webpack就无从知道表达式运算结果是什么.
