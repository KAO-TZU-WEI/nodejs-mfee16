## bluebird

- bluebird 模組，bluebird 是十分著名的 Promise 實作庫，有兩種 promisify 方法。
- promisify 可對單個想要 promisify 化的函式進行 promisify，
- promisifyAll 則可以一次對整個模組包進行 promisify。

### bluebird.promisify

```js
const Promise = require("bluebird"); // 引入bluebird模組
const fs = require("fs");
const fsStatePromise = Promise.promisify(fs.stat); // 將我們想要promisify的node方法傳入Promise.promisify中
fsStatePromise("./app.js").then((data) => console.log(data)); // fsStatePromise即是fs.stat的Promise版本
```

### bluebird.promisifyAll

雖不是取代掉原本的核心模組，但會加入不同名稱的新方法，並預設加入 async 的後綴。

```js
const Promise = require("bluebird"); // 引入bluebird模組
const fs = Promise.promisifyAll(require("fs"), {
  // 將fs模組進行promisify
  suffix: "Promise", // promisify化後的方法名稱加上Promise的後綴
});

fs.readFilePromise("./app.js", "utf-8").then((data) => console.log(data));
```

## SQL

- 成功修改資料： affectedRows：1, changedRows:1
- 要修改的資料與原資料相同： affectedRows：1, changedRows:0
- 未找到需要修改的資料： affectedRows：0, changedRows:0

```js
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0
}
```

> 參考資料
>
> > > https://kerol2r20.github.io/post/2017-11-16-promisify-node/ <br> > > > http://bluebirdjs.com/docs/api/promise.promisifyall.html <br> > > > https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/245406/<br>
