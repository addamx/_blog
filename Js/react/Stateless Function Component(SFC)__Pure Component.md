
# Ref
- (谈一谈创建React Component的几种方式)[https://segmentfault.com/a/1190000008402834]

# Stateless functional components
**优点**
- 语法简洁
- 无 state 的 component（render 是 props 的纯函数）更易读易维护易测试
**缺点**
- 不支持Refs(因为不生成实例)
- 无生命周期, 无法加shouldComponentUpdate

# Pure Components
PureComponent已经定义好了shouldUpdateComponent, 每次对props和state只做浅对比.
- 只改变state/props的属性或数组的元素的话, 是不重新render的, 因为仍指向同一个内存地址 (普通React.Component还是会更新)
  - 数组要render, 要使用`concat`, `slice`或者`数组解构`等方法, 不要用push/unshift/pop/shift等方法
  - Object要render, 要是用`Object.assign({}, ....)`返回新对象
- 结合 `immutable` 数据就可以很好地去做更新判断；

> 参考 `github\_blog\Js\react\Stateless Function Component(SFC)__Pure Component.md`
  
