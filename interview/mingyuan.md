# Js
1. 闭包
2. 原型
3. 作用域链
4. 对象的深浅拷贝
5. 类型转换的机制
6. js中有两种方法可以侦测到变化: Object.defineProperty 和 ES6 的proxy

# 通信
1. 一个url由发起到返回的整个过程是怎么样的, 浏览器解析和渲染的流程熟悉一遍
2. Http 请求
3. http2
- HTTP2采用二进制格式传输，取代了HTTP1.x的文本格式，二进制格式解析更高效。
- 多路复用代替了HTTP1.x的序列和阻塞机制，所有的相同域名请求都通过同一个TCP连接并发完成。在HTTP1.x中，并发多个请求需要多个TCP连接，浏览器为了控制资源会有6-8个TCP连接都限制。
- HTTP2中 1. 同域名下所有通信都在单个连接上完成，消除了因多个 TCP 连接而带来的延时和内存消耗。2. 单个连接上可以并行交错的请求和响>应，之间互不干扰

**HTTP1 的问题**

>keep-alive: https://zh.wikipedia.org/wiki/HTTP%E6%8C%81%E4%B9%85%E8%BF%9E%E6%8E%A5

在 HTTP/1 中，每次请求都会建立一次HTTP连接，也就是我们常说的3次握手4次挥手，还存在TCP的慢启动导致的传输速度低。其实大部分的http请求传送的数据都很小，就导致每一次请求基本上都没有达到正常的传输速度。即使开启了 Keep-Alive(HTTP1.1默认开启)，可以让一个TCP链接被多次使用，但是同一时刻只能有一个HTTP请求，解决了多次连接的问题，但是依然有两个效率上的问题：
- 第一个：**串行的文件传输**。当请求a文件时，b文件只能等待，等待a连接到服务器、服务器处理文件、服务器返回文件，这三个步骤。我们假设这三步>用时都是1秒，那么a文件用时为3秒，b文件传输完成用时为6秒，依此类推。（注：此项计算有一个前提条件，就是浏览器和服务器是单通道传输） 在keep-alive中，必须等下上一个请求接受才能发起下一个请求，所以会收到前面请求的阻塞.
- 第二个：**连接数过多**。我们假设Apache设置了最大并发数为300，因为浏览器限制，浏览器发起的最大请求数为6，也就是服务器能承载的最高并发为>50，当第51个人访问时，就需要等待前面某个请求处理完成。

HTTP/2的**多路复用**就是为了解决上述的两个性能问题。
在 HTTP/2 中，有两个非常重要的概念，分别是帧（frame）和流（stream）。
- 帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。
- **多路复用**，就是在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。


# react

react的底层实现，包括一些原理，虚拟dom怎么生成，render函数怎执行，jsx词法解析语法解析的流程
类组件、方法组件、setstatus的流程
组件嵌套，那这两个组件的生命周期怎么走




react 16 新特性: https://zhuanlan.zhihu.com/p/52016989

react高级指引 https://zh-hans.reactjs.org/docs/accessibility.html


## react 事件传输/处理
- 单个事件监听器附加到文档的根节点上。当事件被触发时，浏览器告诉我们触发事件的DOM节点。为了通过DOM节点传播事件，React并没有在虚拟DOM层次结构上进行迭代。
- 相反，**每个React组件都有唯一id用来表示他的层级**。 我们可以使用简单的字符串操作来获取所有父节点的id。 通过将事件侦听器存储在哈希映射中，我们发现它比将它们附加到虚拟DOM更好。
- 浏览器为每个事件和监听器创建一个新的事件对象。 这个对象有一个非常好的的属性，你可以保留事件对象的引用甚至修改它。 但是，这意味着要做大量的内存分配。React在一开始会为这些对象**分配内存池**。 每当需要事件对象时，它将从内存池中被重新使用，这大大减少了内存垃圾回收。


## diff算法
https://zhuanlan.zhihu.com/p/20346379

**tree diff** 对比组件树 
>将 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题；

1. Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。
2. 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。
3. 对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。
基于以上三个前提策略，React 分别对 tree diff、component diff 以及 element diff 进行算法优化

- 当出现节点跨层级移动时，并不会出现想象中的移动操作，而是以 A 为根节点的树被整个重新创建，这是一种影响 React 性能的操作，因此 React 官方建议不要进行 DOM 节点跨层级的操作。
- 在开发组件时，保持稳定的 DOM 结构会有助于性能的提升。例如，可以通过 CSS 隐藏或显示节点，而不是真的移除或添加 DOM 节点

**component diff** 对比组件内节点
>相同类生成相似树形结构，不同类生成不同树形

1. 如果是同一类型的组件，按照tree diff策略继续比较 virtual DOM tree。
2. 如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。
3. 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff。

**element diff**
>当节点处于同一层级时，React diff 提供了三种节点操作，分别为：INSERT_MARKUP（插入）、MOVE_EXISTING（移动）和 REMOVE_NODE（删除）。
>设置key, 对element diff进行算法优化

- INSERT_MARKUP，新的 component 类型不在老集合里， 即是全新的节点，需要对新节点执行插入操作。
- MOVE_EXISTING，在老集合有新 component 类型，且 element 是可更新的类型，generateComponentChildren 已调用 receiveComponent，这种情况下 prevChild=nextChild，就需要做移动操作，可以复用以前的 DOM 节点。
- REMOVE_NODE，老 component 类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新，需要执行删除操作，或者老 component 不在新集合里的，也需要执行删除操作。

添加KEY后, 列表内的节点才会进行移动, 而且都是将节点往后移而非往前移
- 在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能



## **redux vs vuex**

[Vuex、Flux、Redux、Redux-saga、Dva、MobX](https://zhuanlan.zhihu.com/p/53599723)
```
Redux： view——>actions——>reducer——>state变化——>view变化（同步异步一样）

Vuex： view——>commit——>mutations——>state变化——>view变化（同步操作） view——>dispatch——>actions——>mutations——>state变化——>view变化（异步操作）
```

# 其他
限滚动列表的实现方法
手写promise
首先bind

#性能
js垃圾回收机制

# webpack
- 各种html作用
- 各种loader作用
- MiniCssExtractPlugin in v4 / https://webpack.docschina.org/plugins/mini-css-extract-plugin/
- Resolve Alias 作用, 精确匹配会怎样
- webpack 依赖 enhanced-resolve 来解析代码模块的路径，webpack 配置文件中和 resolve 相关的选项都会传递给 enhanced-resolve 使用
>- resolve.alias
>- resolve.extensions
>- resolve.modules
>- resolve.mainFiles
>- resolve.resolveLoader

- 4.x 配置文件变化
```js
-module.exports = {
+module.exports = function(env, argv) {
+  return {
+    mode: env.production ? 'production' : 'development',
+    devtool: env.production ? 'source-maps' : 'eval',
     plugins: [
       new TerserPlugin({
         terserOptions: {
+          compress: argv['optimize-minimize'] // 只有传入 -p 或 --optimize-minimize
         }
       })
     ]
+  };
};
```
webpack 时传递的 mode 参数，是可以在我们的应用代码运行时，通过 process.env.NODE_ENV 这个变量获取的, 从而不再需要 DefinePlugin 插件

3.x 以前的版本是使用 CommonsChunkPlugin 来做代码分离的，而 webpack 4.x 则是把相关的功能包到了 optimize.splitChunks 中，直接使用该配置就可以实现代码分离。

- Tree shaking
  - 在 webpack 中，只有启动了 JS 代码压缩功能（即使用 uglify）时，会做 Tree shaking 的优化。webpack 4.x 需要指定 mode 为 production，而 webpack 3.x 的话需要配置 UglifyJsPlugin。启动了之后
  - Babel 会把看似没有副作用的代码，便转化为了(可能)有副作用的。 (https://zhuanlan.zhihu.com/p/32831172) 开启Babel的宽松模式的话, Babel会不严格遵循ES6的语义，而采取更符合我们平常编写代码时的习惯去编译代码(如创建类, 直接用原型链)
```json
{
  "presets": [["env", { "loose": false }]]
}
```
  - 如果你在项目中使用了 Babel 的话，要把 Babel 解析模块语法的功能关掉，在 .babelrc 配置中增加 "modules": false 这个配置：(这样可以把 import/export 的这一部分模块语法交由 webpack 处理，否则没法使用 Tree shaking 的优化)
```json
{
  "presets": [["env", { "modules": false }]]
}
```


**加快构建**
1. 使用别名做重定向
- 使用以下代码定位webpack速度慢的原因
```
webpack --entry ./entry.js --output-path dist --output-file bundle.js \
--colors \
--profile \
--display-modules
```
- 使用别名应用压缩版本;
- 使用`module.noParse`忽略对已知文件的解析;
- 一步到位, 直接用CDN, 用`externals`声明外部依赖
```
externals: {
  moment: true
}
// in HTML
<script src="//apps.bdimg.com/libs/moment/2.8.3/moment-with-locales.min.js"></script>
```
2. 忽略文件
- IgnorePlugin 忽略模块中某些代码文件
`new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)`

3. (https://www.kancloud.cn/hanxuming/webpack/960766)


- webpack-dev-serve
  4.x 当 mode 为 development 时，会具备 hot reload 的功能
  如果你使用了 HMR，那么要设置 publicPath 就必须使用完整的 URL
  contentBase 用于配置提供额外静态文件内容的目录
  before 在 webpack-dev-server 静态资源中间件处理之前，可以用于拦截部分请求返回特定内容，或者实现简单的数据 mock。
  after 在 webpack-dev-server 静态资源中间件处理之后，比较少用到，可以用于打印日志或者做一些额外处理
- webpack-dev-middleware
在 Express 中提供 webpack-dev-server 静态服务能力的一个中间件，利用 Express 来根据需要添加更多的功能，如 mock 服务、代理 API 请求等。


# 计算题
冒泡, 快速, 希尔


# 包工具
1. 打包工具
2. npm的包管理
npm安装以及依赖如何生成: https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/22

# 前端动态
Serverless


# 样式
1. 扇形
2. css3阴影


# 安全
xss, csrf

# 模块化
1. nodejs的模块解析规则
a) 解析相对路径
a.1) 查找相对当前模块的路径下是否有对应文件或文件夹
a.2) 是文件则直接加载
a.3) 是文件夹则继续查找文件夹下的 package.json 文件
a.4) 有 package.json 文件则按照文件中 main 字段的文件名来查找文件
a.5) 无 package.json 或者无 main 字段则查找 index.js 文件
b) 解析模块名
查找当前文件目录下，父级目录及以上目录下的 node_modules 文件夹，看是否有对应名称的模块
c) 解析绝对路径（不建议使用）
直接查找对应路径的文件


# Promise
手写Promise

# Promise, async/await, 回调如何获取错误



# 了解nodejs，了解nginx等web服务器配置，了解linux命令； 



