# 原生基础






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


作用

## react的整个项目构建流程

### 包管理

### react脚手架


# 前端优化



# 前端动态


# 面试
表现效果:
    有潜力
    学习能力强

表现状态:
    热情