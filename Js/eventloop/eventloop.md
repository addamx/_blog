# ref
- https://github.com/xuqiang521/overwrite/tree/master/src/my-promise


# 1个eventloop->多个task queue
- 一个浏览器环境，只能有一个事件循环eventloop    
    - 一个事件循环eventloop可以多个任务队列
        - 每个任务都有一个任务源（Task source）。
            - 相同任务源的任务，只能放到一个task queue中。
            - 不同任务源的任务，可以放到不同task queue中。
                - 同一个task queue中的task必须按 first in first out 的顺序执行;
                - 客户端会给不同的task列分配优先级，具体实现可能会交叉执行,  以此保证流畅度
                    - 有多个任务队列，目的可能是方便调整优先级

- 如setTimeout/Promise 都是任务源
- setTimeout 与 setInterval 是同源, setImmediate 和它们不同源
- `Promise` 的实现使用了浏览器的一个叫`PromiseJobs`的task queue

- task queue的分类
    - **macro-task (或 task)**: script（整体代码）, setTimeout, setInterval, setImmediate, I/O, UI rendering
    - **micro-task (或 jobs)**: process.nextTick, Promises（这里指浏览器实现的原生 Promise）, Object.observe, MutationObserver
    - 优先级关系如下：
`process.nextTick` > `promise.then` > `setTimeout` > `setImmediate`

**结合下面的例子分析平台的执行eventloop的顺序**:
    1. 首先执行一个macro-task; 这里是执行script(整体代码), 它创建了2个micro-task(nextTick, Promises.then), 2个macro-task(setTimeout, setImmediate)
    2. 取出并执行micro-task的任务
    3. 重复, 回到(1), 执行下一个macro-task


```js
setImmediate(function () {
  console.log(1);
}, 0);
setTimeout(function () {
  console.log(2);
}, 0);
new Promise(function (resolve) {
  console.log(3);
  resolve();
  console.log(4);
}).then(function () {
  console.log(5);
});
console.log(6);
process.nextTick(function () {
  console.log(7);
});
console.log(8);

/*
3
4
6
8
7   //process.nextTick
5   //promise then()
2   //setTimeout
1   //setImmediate
*/
```
**注**:
- `setTimeout/promise` 建立是 `macro-task` 的script/整体代码的的运行, 里面的回调则属于 `micro-task`