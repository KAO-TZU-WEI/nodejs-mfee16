//npm init -f和npm i express指令後，導入express這個package
// module < package < framework
// express is a package，但完整到足以被稱為是框架
//利用express 建立一個express application app
const express = require("express");
let app = express();
app.use(express.static("public"));

// 第一個是變數 第二個是檔案夾名稱
app.set("views", "views");
// 告訴express我們用view engine是pug
app.set("view engine", "pug");

//middleware中間件,中介函式
// req -> router
// req -> middlewares..... -> router
//const data = require("./utils/db");

// 加上這個中間鍵就能解讀POST的資料
app.use(express.urlencoded({ extended: false }));

let stockRouter = require("./routes/stock");
let apiRouter = require("./routes/api");
let authRouter = require("./routes/auth");
app.use("/stock", stockRouter);
app.use("/api", apiRouter);
app.use("/auth", authRouter);

//紀錄來訪中間件
app.use(function (req, res, next) {
  let current = new Date();
  console.log(`有人來訪了，在${current}`);
  // 幾乎都要呼叫，讓他往下繼續
  next();
});

//路由router
//exprerr由上而下執行，找到就停住
app.get("/", function (req, res) {
  res.render("index");
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/test", function (req, res) {
  res.send("test Express");
});

// 所有的路由的下面
app.use(function (req, res, next) {
  // 表示前面的路由都找不到
  // http status code: 404
  res.status(404);
  res.render("404");
});

// 500 error
// 放在所有的路由的後面
// 這裡一定要有4個參數-->最後的錯誤處理
// express 預設的錯誤處理函式
app.use(function (err, req, res, next) {
  console.log("ERROR:", err.message);
  res.status(500);
  res.send("500 - Internal Sever Error 請洽系統管理員");
});

app.listen(3000, () => {
  console.log("我飛起來了，在3000 port");
});
