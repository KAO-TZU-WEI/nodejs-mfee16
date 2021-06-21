//npm init -f和npm i express指令後，導入express這個package
// module < package < framework
// express is a package，但完整到足以被稱為是框架
//利用express 建立一個express application app
const express = require("express");
let app = express();

// 第一個是變數 第二個是檔案夾名稱
app.set("views", "views");
// 告訴express我們用view engine是pug
app.set("view engine", "pug");

// 加上這個中間鍵就能解讀POST的資料
app.use(express.urlencoded({ extended: false }));
//利用 res.cookie 去設定 cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());
//產生一個session ID可以透過此ID來找到在伺服器的session
// 問題是怎麼知道這一個 request 的 session 是誰？？？？
// ==> 把 session id 存在 cookie
// （express-session 預設的 cookie name: connect.sid）
//console.log(process.env.SESSION_SECRET);

// 處理session
require("dotenv").config();
const expressSession = require("express-session");
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    //當session
    saveUninitialized: false,
  })
);

//這個動作在每個路由做，也都可以，但是用中間函式共用會更好
//建立一個中間函式-把 req.session.member 設定給 res.locals
//可以透過這個方式把資料傳給view
app.use(function (req, res, next) {
  //把request的session資料設定給res的local
  //views就可以取得資料
  //locals是response物件提供的一個屬性，讓我們可以傳遞到view
  res.locals.member = req.session.member;
  next();
});

//紀錄來訪中間件
app.use(function (req, res, next) {
  let current = new Date();
  console.log(`有人來訪了，在${current}`);
  // 幾乎都要呼叫，讓他往下繼續
  next();
});

//因為訊息只希望顯示一次
//所以傳到views一次後就刪掉
app.use(function (req, res, next) {
  if (req.session.message) {
    res.locals.message = req.session.message;
    delete req.session.message;
  }
  next();
});
let stockRouter = require("./routes/stock");
let apiRouter = require("./routes/api");
let authRouter = require("./routes/auth");
let memberRouter = require("./routes/member");
app.use("/stock", stockRouter);
app.use("/api", apiRouter);
app.use("/auth", authRouter);
app.use("/member", memberRouter);
app.use(express.static("public"));

//路由router
//exprerr由上而下執行，找到就停住
app.get("/", function (req, res) {
  res.cookie("lang", "zh-TW");
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
