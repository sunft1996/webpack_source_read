webpack build模块时可以并发处理，每个操作都是一个buildTask，放在队列(AsyncQueue.js)中，当前任务遇到异步操作时，就会先处理下一个任务

``` js
// webpack异步队列核心原理

let index = 0

const buildTask = () => {
    let id = ++index
    console.log(id)
    // 异步操作阻塞后会直接执行下一个task
    setTimeout(() => {
        console.log(`${id}_异步`)
    })
}

const queue = [buildTask, buildTask, buildTask]
while(queue.length > 0) {
    const task = queue.shift()
    task()
}


// 1
// 2
// 3
// 1_异步
// 2_异步
// 3_异步

```