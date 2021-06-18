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

## 使用範本引擎

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
