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
const data = require("./utils/db");

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
app.get("/stock", async function (req, res) {
  let result = await data.connection.queryAsync(`SELECT * FROM stock `);
  //console.log(result);
  res.render("stock/list", { result });
});
app.get("/stock/:stockCode", async (req, res) => {
  // req.params.stockCode 可以取得路由變數
  let resultList = await data.connection.queryAsync(
    `SELECT * FROM stock_price WHERE stock_id = ?`,
    req.params.stockCode
  );
  res.render("stock/detail", { resultList });
});
app.get("/test", function (req, res) {
  res.send("test Express");
});

app.listen(3000, () => {
  console.log("我飛起來了，在3000 port");
});

//網頁出現Cannot GET
