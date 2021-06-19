//加入一個stocks路由，查詢所有股票代碼，並以res.json方式回覆
const express = require("express");
const router = express.Router();
let stockRouter = require("../utils/db");

router.get("/", async function (req, res) {
  let result = await stockRouter.connection.queryAsync(`SELECT * FROM stock `);
  res.json(result);
});

module.exports = router;
