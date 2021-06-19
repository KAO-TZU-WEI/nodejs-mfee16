const express = require("express");
const router = express.Router();
const data = require("../utils/db");

router.get("/", async function (req, res) {
  let result = await data.connection.queryAsync(`SELECT * FROM stock `);
  //console.log(result);
  res.render("stock/list", { result });
});
router.get("/:stockCode", async (req, res) => {
  // req.params.stockCode 可以取得路由變數
  let resultList = await data.connection.queryAsync(
    `SELECT * FROM stock_price WHERE stock_id = ?`,
    req.params.stockCode
  );
  res.render("stock/detail", { resultList });
});

module.exports = router;
