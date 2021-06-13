//npm init -f和npm i express指令後，導入express這個package
// module < package < framework
// express is a package，但完整到足以被稱為是框架
const express = require("express");
//利用express 建立一個express application app
let app = express();

//middleware中間件,中介函式
// req -> router
// req -> middlewares..... -> router
app.use(function (req, res, next) {
  let current = new Date();
  console.log(`有人來訪了，在${current}`);
  // 幾乎都要呼叫，讓他往下繼續
  next();
});
//路由router
//exprerr由上而下執行，找到就停住
app.get("/", function (req, res) {
  res.send("hello Express");
});
app.get("/about", function (req, res) {
  res.send("about Express");
});
app.get("/test", function (req, res) {
  res.send("test Express");
});

app.listen(3000, () => {
  console.log("我飛起來了，在3000 port");
});

//網頁出現Cannot GET