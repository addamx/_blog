# babel
- 特定情景的设置项会被合并、覆盖到没有特定环境的设置项中。env中production/development的preset会被合并/覆盖到没有特定情景的preset中. env的值从`process.env.BABEL_ENV`中获得; (win-cmd)`SET BABEL_ENV=production`





## plugins
**babel-polyfill**
Babel 默认只转换新的 JavaScript 语法，而不转换新的 API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用 babel-polyfill

**babel-runtime**
https://segmentfault.com/q/1010000005596587?from=singlemessage&isappinstalled=1
1. Babel的转译需要借助一工具函数如`_defineProperty`, 这些帮助可能重复出现在一些模块里; babel-runtime主要是将这些帮助函数作为公共模块被使用;
2. 为源代码的非实例方法(`Object.assign`)和babel-runtime/helps的工具函数**自动**引用了polyfill; 以后库和工具只要声明依赖`babel-runtime`, 项目引入它们后会为它们引入polyfill;
**注意**: 
- `babel-runtime`只帮助库导入API类转义, 实例方法如`"foobar".includes("foo")`还是需要`babel-polyfill`

**transform-decorators-legacy**
`@`修饰符

**react-hot-loader/babel**


## Preset
## react-app (dev)
**plugins**:
- daynamic-import-node `import()`转为`require()`, 要和`daynamic-import-node`一起导入
- syntax-dynamic-import 使babel有解析`import`的能力;
- transform-class-properties 私有的(静态)类属性/方法;
```js
class Bork {
  instanceProperty = "bork";
  boundFunction = () => {
    return this.instanceProperty;
  }

  static staticProperty = "babelIsCool";
  static staticFunction = function() {
    return Bork.staticProperty;
  }
}
```
- transform-es2015-destructuring 赋值解构
- transform-object-rest-spread rest解构赋值
- transform-react-constant-elements
- transform-react-jsx //转换jsx语法成react function call
- transform-react-jsx-self `<sometag __self={this} />` 在dev 中让React可以生成runtime warning
- transform-react-jsx-source `<sometag __source={ { fileName: 'this/file.js', lineNumber: 10 } } />` 帮助React知道未编译的源代码的位置
- transform-regenerator generator语法

**preset**:
- babel-preset-react jsx相关的plugins
- babel-preset-env

## react-optimize (生产)
https://github.com/jamiebuilds/babel-react-optimize
集成多个生产环境优化;
- transform-react-constant-elements
- transform-react-inline-elements
- transform-react-remove-prop-types
- transform-react-pure-class-to-function


```json
{
  "env": {
    "production": {
      "presets": ["react-optimize"]
    }
  }
}

//单独使用某一plugins
{
"plugins": "babel-preset-react-optimize/node_modules/babel-plugin-transform-react-constant-elements"
}
```
