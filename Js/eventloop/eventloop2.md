- Process > Promise
- setInterval = setTimeout, 没有优先级
- Process / Promise 可以有多个队列, 遇到同类型的事件则加入当前队列, 否则加入下一个Micro队列; 只有当前周期的微任务结束后, 才会进入下一个周期
- setInterval / setTimeout 只有一个队列, 计时器触发按照顺序

1, 7, 

----

Micro queue (

    Process [
        6
    ]

    Promise [
        8
    ]
)

Micro queue (

    Process [
    ]

    Promise [
        
    ]
)

-----------------------
2, 4, 3, 5

Micro queue (

    Process [
    ]

    Promise [
    ]
)

---------------

9, 11

Micro queue (

    Process [
        10
    ]

    Promise [
        12
    ]
)

```js
function test () {
    console.log('start')
    setTimeout(() => {
        console.log('children2')
        Promise.resolve().then(() => {console.log('children2-1')})
    }, 0)
    setTimeout(() => {
        console.log('children3')
        Promise.resolve().then(() => {console.log('children3-1')})
    }, 0)
    Promise.resolve().then(() => {console.log('children1')})
    console.log('end') 
}
 
test()
```
 
 // 以上代码在node11以下版本的执行结果(先执行所有的宏任务，再执行微任务)
 // start
 // end
 // children1
 // children2
 // children3
 // children2-1
 // children3-1
 
 // 以上代码在node11及浏览器的执行结果(顺序执行宏任务和微任务)
 // start
 // end
 // children1
 // children2
 // children2-1
 // children3
 // children3-1
