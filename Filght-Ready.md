# 原生基础

1. 同源策略与跨域
https://www.jianshu.com/p/2b9db9d0a63d

2. 闭包

3. 创建对象/类

4. 继承

5. 数组的内建方法
`Array.prototype.entries()` 返回迭代器，含有数组对象的键值对
`Array.prototype.find(callbackfn(element,index,array))`：返回值; 在数组中找到符合条件的第一个值
`Array.protoType.some(callback(currentValue,index,array),thisArg)`：返回布尔值; 判断数组中是否有满足回调方法中的值
`Array.protoType.every(callback(currentValue,index,array),thisArg)`：返回布尔值; 判断数组是否**所有元素**满足回调方法中的值

6. 什么是重绘重排? 什么情况会引起?
重排是需要重新分析页面元素尺寸；重绘是元素样式的改变

添加或者删除可见的DOM元素
元素位置改变
元素尺寸改变
元素内容改变（例如：一个文本被另一个不同尺寸的图片替代）
页面渲染初始化（这个无法避免）
浏览器窗口尺寸改变


7. 防抖和节流

8. this的理解
函数, 构造函数, 对象方法, 箭头函数

9. 跨域同源
跨域是浏览器引起的;
实现跨域: 
  a.jsonp;
  b.window.name(当页面加载另一个新的页面时，window的name属性是不会变的);
  c.cors同源;
  d.nodejs中间件代理跨域

**cors**:
前端: 
服务器: `Access-Control-Allow-Origin` `Access-Control-Allow-Credentials`(可选, 是否发cookie)

>当浏览器发送跨域请求时，如果请求不是GET或者特定POST（Content-Type只能是 application/x-www-form-urlencoded, multipart/form-data 或 text/plain的一种）时，浏览器会要求先以 OPTIONS 请求方式发送一个预请求(preflight request)，从而获知服务器端对跨源请求所支持 HTTP 方法。`服务器设置:'Access-Control-Allow-Methods:POST, GET'`

区别:
JSONP只支持GET请求，CORS支持所有类型的HTTP请求

注意:


## ES6
### 1. iterator遍历器
在对象中添加`[Symbol.iterator]`属性并实现遍历器, 可以实现解构赋值, `for..of`
遍历器实现: 
1. () => (function next() => {return {value: ..., done: false}})
2. Generator遍历器 `yield 1; yield 2;`

//类数组对象(有length属性)
1. 如果对象本身的有数字属性名1,2,3, 而且有length属性, 加上`[Symbol.iterator]:Array.prototype[Symbol.iterator]`即可实现转为`for .. of`; (?)
2. `Array.from(arrayLike)`直接转为真数组;

# react
## react常用面试题


### 1. react 生命周期
分为3个时期: 创建期, 存活期, 销毁期;
1. 创建期来自父组件的render, 由父到子完成constructor/componentWillMount/render, 然后子到父完成componentDidMount; componentDidMoutn完成一些依赖DOM的更新或监听;
2. 存活期至组件的更新, 更新来源setState/forceupdate/父props变化, setState/props变化要经过shoudComponentUdpate的判断; 而componentWillReceiveProps由父props变化触发(但具体是父render触发, 虽然render不一定改变props), forceupdate不经过这2个函数; 确定要更新就会进入componentWillUpdate/render, 子componentDidUpdate, 父跟着componentDidUpdate
3. 销毁期, 由父的render触发, 子组件告知孙组件完成卸载触发componentWillMount, 然后子组件componentWillMount;

### 2. setState之后发生什么
setState触发了 shouldComponentUpdate->componentWillUpdate->render, react会自动计算新的Dom tree和旧的Dom tree节点的差异, 进行最小化的渲染;

### 3. react element和react component的差异
react element是有`react.createElement`函数返回的一个virtual node对象, JSX语法就是转化为createElement结果的组合;
react component是返回react element组合结果的 **函数** 或者 **类**

### 4. 在什么情况下你会优先选择使用 Class Component 而不是 Functional Component？
需要使用到 生命周期或者组件内部状态时; 不需要的他们的都可以直接使用**functional component/stateless component**, 这些组件也叫**展示组件**

### 5. React 中 refs 的作用是什么？
获取非受控组件, 仅仅react控制渲染, 之后用ref获得真正的DOM以便jQuery插件使用它;

### 6. React 中 keys 的作用是什么？
让react可以追踪元素的变化, 如果缺少会报警告; 不能用数组index, 因为元素的数组中的数据可能会变化;
React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。

### 7. 在生命周期中的哪一步你应该发起 AJAX 请求？
在componentDidMount 发起, 在componetWillMount 取消;

### 8. 如何告诉 React 它应该编译生产环境版本？
Webpack 的 `DefinePlugin` 方法来将 `NODE_ENV` 变量值设置为 `production`。编译版本中 React 会忽略 propType 验证以及其他的告警信息，同时还会降低代码库的大小，React 使用了 Uglify 插件来移除生产环境下不必要的注释等信息。

### 9. 为什么我们需要使用 React 提供的 Children API 而不是 JavaScript 的 map？
`props.children` 不一定是个数组;

### 10. 概述下 React 中的事件处理逻辑
React 会将原生的事件封装成自有的事件, 然后传入自有的事件处理器, 避免了浏览器兼容的问题; 而且事件绑定在最顶层而不是子元素, react更新子元素时不用考虑如果处理这些绑定了的事件;

### 11. createElement 与 cloneElement 的区别是什么？
createElement 函数是 JSX 编译之后使用的创建 React Element 的函数，而 cloneElement 则是用于复制某个元素并传入新的 Props。
cloneElement 相当于:
`<element.type {...element.props} {...props}>{children}</element.type>`

## 12. setSate的注意问题以及优化方案
**1. 问题**: setState是异步: 
后面的操作如果依赖它的结果, 可能会出错;  


## 13. react事件为什么要`bind(this)`

**优化**:
添加回调函数, 如下: 将setState封装为Promise对象, 这样可以用`then`或者`async/await`来控制回调行为;
```js
setStateAsync(state) {
    return new Promise((resolve) => {
        this.setState(state, resolve)
    });
}
```

**2. 问题**: setState会被合并
`this.setState({a : ture}); this.setState({showForm : !this.state.a});` 如果有多个setState, 就会被合并
`this.setState({showForm : !this.state.showForm})` 即使依赖自身原来的state也能有问题 (?)

**优化**:
使用: 函数模式; setState不在被合并, 且会按顺序运行;



## react的整个项目构建流程
redux
react-router

build


## react 优化
1. shouldComponentUpdate, pureComponent, react-redux-connect
2. 单个item的数据来自父的Array/object格式的props时, 单个item触发的父props的改变, 会引起全部item执行render(虽然react最终通过diff没有更新, 但仍有性能损失). 优化方法如下:
    2.1. item的组件中加shouldComponentUpdate/pureComponent
    2.2. 如果必须结合redux, 必然改变父组件的props; 可以添加conenct, 设置`mapPropsToState = (state, props) => {item: this.state.list[props.id]}`, **但这个其实相当于 2.1 方案, connect其实也是添加了shouldComponentUpdate, 保证绑定的数据有变化才更新组件** (?)

## react 组件模式
1. 高阶组件
    1.1 代理形式: 操作props(加/删/改)[函数], 包装组件[函数], 添加生命周期操作(如 connect函数)[class]
    1.2 继承形式: 中间类是继承参数类, 所以可以修改原来的生命周期(一般不会去改), 而且对比函数方法的代理形式, 它要多一次完整的生命周期运行;
2. 函数为子组件的父组件
```jsx
function Parent() {
    const num = 100;
    return (
        props.children(num)
    )
}
//使用
<Parent>
    {
        (num) => <div>{num}</div>
    }
<Parent>
```

# 开发工具

## 包管理 npm, yarn
import用于引入外部模块。
require不仅可以引用文件和模块，而且使用位置不受限制，可以在代码中使用


## webpack, gulp





# 前端优化
## 网路请求
1. 网页Gzip
2. CDN托管, 图片服务器
3. 缓存ajax结果, 减少频繁的请求;


## JS
0. 脚本放最后(除非是非同构的spa)
1. 避免寻找上层数据, 尽量转位局部变量; 
2. 多次使用的数据, 尽量转为局部变量; 如`var len = arr.length;` `var height = $node.height();`  //速度: 字面量 > 局部变量 > 数据 > 对象
3. 判断: 多余2用`switch`, 多余10用`数组或对象储存结果`
4. 循环: length转为局部变量, 使用`i--`优于`i++`
5. 定时器挂起需要长时间执行的同步代码
6. 优化递归 (6.1,6.2都是要做到当前函数执行不需要上次的变量;)
    6.1 循环
    6.2 return模式: 转为ES6模式的尾递归 a. return 结果; b. 'use strict'(禁用 arguments, callee);
    6.3 非return模式: `setTimeout`包装;

## 重排重绘
1. innerHTML代替DOM操作
2. 如果多个元素要插入, 先插入一个container, 再将container插入DOM

## HTML
减少DOM的数量, 压缩文档
使用svg/css动画替代gif动画以及js动画
移除iframe, 或者用js在合适时机加载
避免table, table要等其中的内容完全下载之后才会显示出来，显示比div+css布局慢

## css
合并压缩
必要的css才放head, 不必要的放body最后(因为 Renderer进程中 JS线程和渲染线程是互斥的)


## 图片
小图:
转base64, svg, css, iconFont

大图:
压缩
js动态检测设备尺寸加载适配的图片
img标签/业务图片/(产品图片): 懒加载
非业务图片(icon): 转背景图, 雪碧图

## 其他
1. 启动硬件加速
最常用的方式：translate3d、translateZ、transform



# 前端动态

# 项目经验



# HTTP
1xx：信息状态码
2xx：请求成功
3xx：重定向
4xx：客户端错误
5xx：服务器错误


# nodeJs



# 面试
表现效果:
    有潜力
    学习能力强

表现状态:
    热情
