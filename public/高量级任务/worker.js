// worker.js
self.addEventListener('message', function(e) {
    if (e.data === 'start') {
        // 执行耗时任务
        let start = Date.now();
        let result = performHeavyTask();
        let end = Date.now();
        self.postMessage('耗时任务执行完毕，结果为：' + result + '，耗时：' + (end - start) + 'ms');
    }
});

function performHeavyTask() {
    // 这里是耗时任务的代码
    // 例如，进行复杂计算或处理大量数据
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
        sum += i;
    }
    return sum;
}
