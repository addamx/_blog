###  withRouter
- 增强React组件, 使它在不是`<Route/>`组件打包的情况下, 仍能访问`history`, `match`, `location`
**应用**:
    - 增强或添加Route的行为, 含子组件`<Route />`并且返回值是`this.props.children`, 用法如`<ScrollToTop>...</ScrollToTop>`;
    - 仅仅为了使用Router的api, 不含子组件`<Route />`, 用法如`<AuthButton />`

### Route
- component指定组件: `<Route path="/user/:username" component={User}/>`;
- render渲染: `props`可以作为参数
    1. `<Route path="/home" render={() => <div>Home</div>}/>`
    2. `<Route {...rest} render={props => (<Component {...props}/>)}/>`
- children渲染: 使用和render类似, 但参数含有match, 即`({match, ...rest})`, match在没匹配到是为`null`
    - 应用: 在match后返回`Loading`或过渡的`Animate`组件
- strict属性: 匹配到的字符的后面的如果有右划线`\`也要严格地被匹配, `<Route strict path="/one/" component={About}/>`, `/one/`和`/one/two`匹配到, `/one`不匹配

### Switch
- 在没有`<Switch />`时, url位'/about'时以下组件都会被渲染;
    - 适合用在sidebars, breadcrumbs, tabs;
- 而Swich包含他们后, Router会在匹配到第一个Route之后就停止;
```js
<Route path="/about" component={About}/>
<Route path="/:user" component={User}/>
<Route component={NoMatch}/>
```

# 数据结构

### history
- length - (number)
- action - (string) The current action (PUSH, REPLACE, or POP)
- location - (object)

- properties:
- pathname - (string) The path of the URL
- search - (string) The URL query string
- hash - (string) The URL hash fragment
- state (Only available in browser and memory history.)
- push(path, [state]) - (function) 
- replace(path, [state]) - (function)
- go(n) - (function)
- goBack() - (function) Equivalent to go(-1)
- goForward() - (function) Equivalent to go(1)
- block(prompt) - (function)

###`location`:
- Route component as `this.props.location`
- Route render as `({ location }) => ()`
- Route children as `({ location }) => ()`
- withRouter as `this.props.location`
```json
{
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```


### `match`:
- Route component as `this.props.match`
- Route render as `({ match }) => ()`
- Route children as `({ match }) => ()`
- withRouter as `this.props.match`
- matchPath as the return value
```json
{
    isExact: true,
    params: {topicId: "123"},
    path: "/topics/:topicId",
    url: "/topics/123"
}
```