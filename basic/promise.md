## Event Loop 內部的運作方式

- Node.js 的 Event Loop 和瀏覽器跑的 JS 的 Event Loop 有一點不太一樣。
- Stack: 後進先出 (先進後出) First In Last Out (FILO) 堆疊。
- Queue: 先進先出 First In Fisrt Out (FIFO) 佇列，Node.js 內部的 Event Loop 總共有六個 macrotask queue，或稱 task queue。
  > 1. Timers：執行 setTimeout() 和 setInterval()中到期的 callback。
  > 2. Pending callbacks：作業系統層級使用，上一輪迴圈中少數的 I/O callback 會被延遲到這一輪的這一階段執行。
  > 3. Idle, prepare：Idle handle callback 會被執行、Prepare handles 會在迴圈被 I/O 阻塞前執行 callback。
  > 4. Poll：最重要的一個階段，它會尋找新的 I/O 事件，可能的話會馬上執行 I/O callback，如果無法馬上執行，它會延遲執行並把它註冊為一個 pending callback 在下一輪執行。
  > 5. Check：執行 setImmediate()，跟 prepare 相反，會在迴圈被 I/O 阻塞後執行 callback。
  > 6. Close callbacks：執行 close 事件的 callback，例如 socket.destroy()。

## callback

A function that is to be executed after another function has finished executing.
**「控制流程，並把函式當作另一個函式的參數，透過另一個函式來呼叫它」，回呼常用來延續非同步行動完成後的程式執行：這就叫做非同步回呼（asynchronous callbacks）**

---

常用的地方有 document.addEventListener('click',function(){})和 ajax request。
而使用 callback 有兩個主要缺點：回呼地域(Callback Hell)和控制權轉移(Inversion of Control)所造成的信任問題。

```js
function sum(n, cb) {
  let result = 0;
  for (let i = 1; i <= n; i++) {
    result += i;
  }
  // 回頭呼叫
  cb(result);
}

function reportAns(ans) {
  console.log(`Hi, 答案是 ${ans}`);
}

function reportAns2(ans) {
  console.log(`Hello, 答案是 ${ans}`);
}

sum(10, reportAns2);
```

```js
function greeting(name) {
  alert("Hello " + name);
}

function processUserInput(callback) {
  var name = prompt("輸入你的名字：");
  callback(name);
}

processUserInput(greeting);
```

## promise

promise 在創建時本身帶的函式是同步的，不會進 Event Loop。
Promise 構造函數 (constructor) 接受一個函數作為參數，這個函數會在建立 Promise 物件的同時立刻被執行，該函數有兩個參數分別是 resolve (解決)函數和 reject (拒絕)函數，resolve/reject 這兩個函數會由 JavaScript interpreter 自動傳入。
**每一次呼叫 then() 其實都會產生新的 Promise。一個 Promise 可以呼叫多次 then()，這些 then() 中的程式碼不會在第一時間就被執行，而是當 promise 被 resolve 後，才會執行 then() 中的程式碼。**

---

一個 Promise 物件有以下幾種狀態：
並且一但狀態改變就會固定，永遠不會再改變狀態了。

1. 等待置（pending）：與初始狀態，未完成被拒絕。
2. 實現（fulfilled）：表示操作成功地完成。
3. 拒絕（rejected）：表示操作失敗了。

```js
const promise = new Promise(function (resolve, reject) {
  // 成功時
  resolve(value);
  // 失敗時
  reject(reason);
});
```

then 可以串接非同步程式。講得更精確一點是，.then 不論是非同步或者同步的程式都可以串接
**Promise 物件生成後，可以用 then() 方法來綁定當 fulfilled 或 rejected 狀態時，分別要執行的函數。**
**then 可接受兩個函式作為參數，第一個函式用於成功（resolve）時要執行的任務，第二個函式用於失敗（reject）時要執行的任務**

```js
promise
  .then(
    function (value) {
      // 當狀態是 fulfilled (成功) 時，執行這個函數
      // value 是透過 resolve() 傳進來的參數
    },
    function (reason) {
      // 當狀態是 rejected (失敗) 時，執行這個函數
      // error 是透過 reject() 傳進來的參數
      // 從回调函数裏拋出錯誤
    }
  )
  .catch(handleErrors);
```

- #### Promise.all([ .. ])
  所有的 promise 都回傳成功了才進入下一個任務，在此之前都是等待，但若其一回傳為失敗就進入失敗的處理狀況。常用於需要迭代的狀況。
- #### Promise.race([ .. ])
  只要有任一 promise 回傳成功就進入下一個任務，其餘的都忽略。
- #### Promise.any([ .. ])
  只要有任一 promise 是成功的，就會履行。
- #### Promise.resolve(value)
  Promise.resolve() 函數用來將一個物件轉型為 Promise (如果它不是一個 Promise 物件)，然後立刻 resolve 它。

## try...catch

若 try 區塊中的程式碼無任何錯誤，則忽略 catch 區塊中的程式碼；若 try 區塊中的程式碼發生錯誤，則中斷 try 區塊程式碼的執行，並將控制權轉給 catch 區塊的程式碼。**try...catch 只能用於同步執行的狀況。**

```js
try {
  // 欲執行的程式碼
} catch (e) {
  // 當錯誤發生時，欲執行的程式碼
} finally {
  //不論執行結果好壞，都想要持續進行的程式
}
```

## Async/Await

async function 可以用來定義一個非同步函式，讓這個函式本體是屬於非同步，但其內部以“同步的方式運行非同步”程式碼。
await 則是可以暫停非同步函式的運行（中止 Promise 的運行），直到非同步進入 resolve 或 reject，當接收完回傳值後繼續非同步函式的運行。

---

**該函式是以非同步的方式運行，無法直接使用 console.log 取得其值。在 Promise 中，如果要取得 resolve 的結果會使用 then，而 async function 也是相同使用 then()**

```js
async function getData() {
  const data1 = await promiseFn(1); // 因為 await，promise 函式被中止直到回傳
  const data2 = await promiseFn(2);
  console.log(data1, data2); // 1, 成功 2, 成功
}
getData();
```

await 是屬於一元運算子，它會直接回傳後方表達式的值；但如果是 Promise 時則會 “等待” resovle 的結果並回傳。
雖然是運算子，但是在原始碼中直接運行 await 則會出現錯誤，它只能在 async function 中運行，所以 async/await 基本上是一體的，不會單獨出現。
**await 可以直接回傳後方的表達式，或者將非同步函式中的 Promise 暫停，如以下範例的 await promiseFn(2) 會 “等待” resolve 結果回傳後，在賦予至 data2 才會回傳。**

```js
async function getData() {
  const data1 = await 1;
  const data2 = await promiseFn(2);
  console.log(data1, data2); // 1 "2, 成功"
}
getData();
```

## npm nvm npx

- nvm 是 Node.js 的版本管理器(version manager)
- npm 他是一個套件管理工具，類似一個倉庫，我們可以從裡面去下載東西出來用。
- npm 從 5.2 版開始，增加了 npx 命令。npx 想要解決的主要問題，就是調用項目內部安裝的模塊。**就算想調用的模組不存在在電腦，也會偷偷下載後刪除**

  > > npm uninstall //解除安裝套件，例如：npm uninstall express -g
  > > npm search //搜尋套件
  > > npm ls -g //列出所有全局套件
  > > npm ls -gl //列出全域套件詳細資訊
  > > npm ls -l //列出專案裡的套件詳細資訊
  > > npm update -g //更新全域套件
  > > npm update //更新專案裡的套件

## gitignore

gitignore 顧名思義就是叫 git 忽略掉特定的檔案，而不被紀錄。

```
mkdir file
cd file
git init
touch .gitignore
code .gitignore
git add .
git commit -m'add .gitignore file'
touch 不希望追蹤的檔案
```
