## (1) 請問下列程式執行後的結果為何？為什麼？

```js
console.log("start");
(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 1000);
})();

console.log("end");
```

#### 結果解析：
>>start→IIFE→end→Timeout，setTimeout()是屬於BOM提供的功能，Javascript執行時，程序中的代碼依次進入stack中等待執行，
於是會先執行console.log("start")和console.log("IIFE")，但當調用setTimeout()時，會被丟到webapi中並開始延時方法的處理，
當延時方法處理結束後，會被加入到回調的任務陣列中（task queue)，而當stack所有同步任務執行完畢，系統的事件迴圈 (event loop)就會讀取task queue，看看裡面有哪些事件並讓它進入執行棧，開始執行。於是這範例結果依序會是console.log("end")後才是console.log("Timeout")。

## (2) 請問下列程式執行的結果為何？為什麼？

```js
console.log("start");
(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 0);
})();
console.log("end");
```

#### 結果解析：
>>start→IIFE→end→Timeout，setTimeout()是屬於BOM提供的功能，Javascript執行時，程序中的代碼依次進入stack中等待執行，
於是會先執行console.log("start")和console.log("IIFE")，但當調用setTimeout()時，會被丟到webapi中並開始延時方法的處理，
當延時方法處理結束後，會被加入到回調的任務陣列中（task queue)，而當stack所有同步任務執行完畢，系統的事件迴圈 (event loop)就會讀取task queue，看看裡面有哪些事件並讓它進入執行棧，開始執行。於是這範例結果依序會是console.log("end")後才是console.log("Timeout")。

## (3) 請問下列程式執行的結果為何？為什麼？

```js
const bar = () => console.log("bar");
const baz = () => console.log("baz");
const foo = () => {
    console.log("foo");
    bar();
    baz();
};
foo();
```

#### 結果解析：
>>foo→bar→baz，foo()呼叫函式後，會接續執行console.log("foo")和console.log("bar")最後是console.log("baz")。

## (4) 請問下列程式執行的結果為何？為什麼？

```js
const bar = () => console.log("bar");
const baz = () => console.log("baz");
const foo = () => {
    console.log("foo");
    setTimeout(bar, 0);
    baz();
};
foo();
```

#### 結果解析：
>>foo→baz→bar，foo()呼叫函式後，會接續執行console.log("foo")和console.log("baz")，而由於bar()有設定setTimeout()所以是最後執行。

*****
## 關於Philip Roberts | JSConf EU整理
* 了解輸入 / 輸出 (I/O)
I/O 就是 input / output 的簡稱，是程式跟系統記憶體或網路的互動，如讀取、寫入檔案、發送 HTTP 請求、對資料庫 CRUD 操作等等。

* Node.js三個特性：
>>1. 單執行緒 (single-threaded):一次只能執行一件事情，相反是多執行緒 (multi-threaded)
>>2. 非阻塞（non-blocking） 
>>3. 非同步 (asynchronous) 
>>為了達到「讓等待 I/O 時不要卡住其他程式碼」，在多執行緒上Java的解法是開一個新的執行緒，於是「非同步 (asynchronous)」的出現變得非常關鍵。
>JavaScript 實現非同步的方法不斷演進著：從 callback 函式、promises 到最新的 async-await 函式。

* 了解js當中的事件:
>>1. 事件驅動 (event-driven):就 Node.js 而言，事件是交給 Libuv 去處理。
>>2. 事件迴圈 (event loop):Libuv會不斷檢查有沒有callback需要被執行，有的話分配到主執行緒結束手邊的程序時處理。
>> Libuv 在面對非同步作業時，會開啟執行緒池(thread pool/worker pool)，預設共有四個執行緒（worker threads），運算這些 I/O 用的方式是事件迴圈(event loop)。

* 了解Webapi定義:
>>1. 向 API 發送請求
>>2. setTimeout
>>3. document：使用 document.querySelector 去獲得你要操作的 DOM 其實也是瀏覽器提供的，是讓 Javascript 可以和瀏覽器溝通的方法。
>> 瀏覽器提供了很多 WebAPI (ex: document、XMLHttpRequest、setTimeout) 給我們使用，他們不在 V8 引擎中，也是我們無法取得的內容，我們只能呼叫這些功能去執行他，當瀏覽器知道你要呼叫他們來用的時候，就可以和你的程式碼同時一起執行 (Concurrency) ，也不會影響到你的 JS 主程式，