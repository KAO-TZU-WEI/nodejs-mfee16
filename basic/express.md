# express

- 是用原生 API http.createServer 來實現的。
- express 由路由和中介函式件構成的 web 開發框架，其框架建立在內置的 http 模塊上。
- incoming Request -> middleware(next) -> middleware(next) -> middleware(next) -> response
- Client -> Request -> Server ->time function -> authorization functio -> Server -> Response -> Client
- NodeJS 為了提高效能，我們引入模組後，它都會進行快取。

## router(路由)

- Express 提供了 Router 的功能，透過它我們能更簡便的去設定 API 的 HTTP method 及 API URL。
- 路由是指應用程式端點 (URI) 的定義，以及應用程式如何回應用戶端要求。
- express.Router 類別用來建立可裝載的模組路由處理程式。
- HTTP 的動詞: get, post, put, delete...

```js
var express = require("express");
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.send("hello world");
});
```

## middleware(中介函式)

- 可以對每個請求或針對特定路由的每個請求運行代碼，並對請求或響應數據採取措施。
- 只處理特定 HTTP 動詞的路由處理式。
- 中介函式必須是函式。
- 中介函式的第一個參數必須是路徑。
- 每個中介函式都要呼叫 next()，除非它是送出回應的最後中介函式。
- 存在三個引數的函式 1.請求物件(req) 2.回應物件(res) 3.next()函式。
- 中介軟體的載入順序很重要，先載入的中介軟體函數也會先執行。
- 可以使用下列類型的中介軟體：

  > 1. 應用程式層次的中介函式-（例如 app.use() 、add.post 或 app.METHOD() 函數）
  >
  > ```js
  > //顯示裝載在 /user/:id 路徑的中介軟體函數。會對 /user/:id 路徑上任何類型的 HTTP 要求，執行此函數。
  > app.use("/user/:id", function (req, res, next) {
  >   console.log("Request Type:", req.method);
  >   next();
  > });
  > ```
  >
  > 2. 路由器層次的中介函式-（例如：router.use）
  >
  > 3. 錯誤處理中介函式-一律會使用四個引數。（例如：app.use（err，req，res，next））
  >
  > ```js
  > app.use(function (err, req, res, next) {
  >   console.error(err.stack);
  >   res.status(500).send("Something broke!");
  > });
  > ```
  >
  > 4. 內建中介函式-Express 唯一的內建中介軟體函數是 express.static。
  >
  > ```js
  > var options = {
  >   dotfiles: "ignore",
  >   etag: false,
  >   extensions: ["htm", "html"],
  >   index: false,
  >   maxAge: "1d",
  >   redirect: false,
  >   setHeaders: function (res, path, stat) {
  >     res.set("x-timestamp", Date.now());
  >   },
  > };
  >
  > app.use(express.static("public", options));
  > ```

  > 5. 協力廠商中介函式-在 Express 應用程式中新增功能。（例如：bodyparser、cookieparser）
  >
  > ```js
  > var express = require("express");
  > var app = express();
  > var cookieParser = require("cookie-parser");
  >
  > // load the cookie-parsing middleware
  > app.use(cookieParser());
  > ```

### app.listen

這個方法類似於原生的 server.listen，用來啟動伺服器。

```js
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
```

### app.get

這是處理路由的 API，類似的還有 app.post 等。

```js
app.get("/api/users", (req, res) => {
  const resData = [
    {
      id: 1,
      name: "小明",
      age: 18,
    },
    {
      id: 2,
      name: "小紅",
      age: 19,
    },
  ];
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(resData));
});
```

### app.use

這是中介軟體的呼叫入口，所有中介軟體都要通過這個方法來呼叫。

```js
app.use((req, res, next) => {
  const urlObject = url.parse(req.url);
  const { pathname } = urlObject;

  console.log(`request path: ${pathname}`);

  next();
});
```

### 使用範本引擎

views：範本檔所在的目錄。例如：app.set('views', './views')
view engine：要使用的範本引擎。例如：app.set('view engine', 'pug')

```js
app.set("view engine", "pug");
//然後建立路由，以呈現 index.pug 檔。如果未設定 view engine 內容，您必須指定 view 檔的副檔名。
app.get("/", function (req, res) {
  res.render("index", { title: "Hey", message: "Hello there!" });
});
```

### res.render() ＆ res.send()

- res.render()用於呈現視圖，並將呈現的 HTML 字符串發送給客戶端。
- res.send()只能用一次，和原生的 res.end() 一樣。但 send()已自動幫我們設置了 Content-Type 頭部和 200 狀態碼。

```js
//res.render(view [, locals] [, callback])
res.render("stock/list", { result });
```

### res.redirect & res.location()

- res.location（路徑）<br>
  Express 通過 Location 頭將指定的 URL 字符串傳遞給瀏覽器，它並不會對指定的字符串進行驗證（除'back'外）。
- res.redirect([狀態,] 路徑)<br>
  與 location()相比，redirect()除了要設置 path 外，還可以指定一個狀態碼。而 path 參數則與 location()完全相同。
  > status：{Number}，表示要設置的 HTTP 狀態碼，不指定狀態碼默認為 302<br>
  > path：{String}，要設置到 Location 頭中的 URL

```js
res.location("../member");
res.location("http://google.com");
res.redirect(301, "http://google.com");
```

- 進行 URL 重定向時，服務器只在響應信息的 HTTP 頭信息中設置了 HTTP 状态码和 Location 頭信息。當狀態碼為 301 或 302 時（301－永久重定向、302－臨時重定向、303 See Other），表示資源位置發生了改變，需要進行重定向。Location 頭信息表示了資源的改變的位置，即：要跳重定向的 URL。

- URL 重定向是在瀏覽器端完成的，而 URL 重定向與 HTTP 状态码和 Location 頭有關。瀏覽器首先會判斷狀態碼，只有當狀態碼是：301 或 302 時，才會根據 Location 頭中的 URL 進行跳轉。所以，使用 location()設置頭信息，而不設置狀態碼或狀態碼不是 301 或 302，並不會發生重定向

### app.locals & res.locals

- locals 是 Express 應用中 Application( app)對象和 Response( res)對像中的屬性，該屬性是一個對象。
- 該對象的主要作用是，將值傳遞到所渲染的模板中，返回值：Object。
- app.locals 會在整個生命週期中起作用；而 res.locals 只會有當前請求中起作用。
- 由於 app.locals 在當前應用所有的渲染模中訪問，於是可以在該對像中定義一些頂級/全局的數據，並在渲染模板中使用。

```js
res.render("index", {
  name: "IT筆錄",
  url: "http://itbilu.com",
  introduce: "學習、記錄、整理",
});
// 也可以使用res.locals 變量
// res.locals = {
// name:'IT筆錄',
// url:'http://itbilu.com',
// introduce:'學習、記錄、整理'
// };
// res.render('index');
```

## exports = modules.exports

在模組的底層，exports 和 modules.exports 指向同一個地址。

```js
//exports = modules.exports = {};
exports.getColor = function () {
  console.log("get color");
  return "red";
};
module.exports.setColor = function (color) {
  console.log("set color");
};

return module.exports;
//會得到getColor和setColor

//另一個情境
// const car = {
//   brand: "tesla",
//   color: "red",
// };
// exports = car;
// module.exports=car;
// 傳回是空值，因為export已經被指向另一個地址，而module.exports是空物件
```

### 絕對路徑

- 在 Node.js 中, 大概有 ＿dirname、＿filename、process.cwd() 或者 ./ 和 ../, 前三者都是絕對路徑。
  > ＿dirname： 獲得當前執行文件所在目錄的完整目錄名<br>
  > ＿filename： 獲得當前執行文件的帶有完整絕對路徑的文件名<br>
  > process.cwd()：獲得當前執行 node 命令時候的文件夾目錄名<br>
  > ./： 文件所在目錄
- 為了便於比較 ./ 和 ../ 我們使用 path.resolve('./') 來轉換為絕對路徑。
- path.join() 是 path 核心模組提供的一個方法, 可以幫助開法者在拼接路徑字串時, 減少出錯機率

> 參考資料
>
> > > https://itbilu.com/nodejs/npm/EJD5cyg3l.html <br>https://itbilu.com/nodejs/npm/Ny0k0TKP-.html<br>https://dylan237.github.io/nodejs-dirname-and-filename.html
