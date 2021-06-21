const express = require("express");
const router = express.Router();
const data = require("../utils/db");

router.get("/", async function (req, res) {
  let result = await data.connection.queryAsync(`SELECT * FROM stock `);
  //console.log(result);
  res.render("stock/list", { result });
  //另一個寫法是
  //res.lacals.stocks = result;
  //res.render("stock/detail");
});
router.get("/:stockCode", async (req, res) => {
  // req.params.stockCode 可以取得路由變數
  let stock = await data.connection.queryAsync(
    `SELECT * FROM stock WHERE stock_id=?`,
    req.params.stockCode
  );
  if (stock.length === 0) {
    throw new Error("不存在此代碼");
  } else {
    //一頁有幾筆？
    const perPage = 5;
    //現在在第幾頁？
    const currentPage = req.query.page || 1;
    const offset = (currentPage - 1) * perPage;
    //抓取全部資料
    let resultList = await data.connection.queryAsync(
      `SELECT * FROM stock_price WHERE stock_id = ? ORDER BY date LIMIT ? OFFSET ?`,
      [req.params.stockCode, perPage, offset]
    );
    //總共有幾筆
    let totalPage = await data.connection.queryAsync(
      `SELECT COUNT(*) as total FROM stock_price WHERE stock_id=?`,
      req.params.stockCode
    );
    //總頁數
    let lastPage = Math.ceil(totalPage[0].total / perPage);
    res.render("stock/detail", {
      resultList,
      stock,
      pagination: { currentPage, lastPage },
    });
    //console.log(currentPage, totalPage[0], lastPage);
    //next();
  }
});

module.exports = router;
