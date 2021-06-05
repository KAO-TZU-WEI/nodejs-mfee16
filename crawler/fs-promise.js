const axios = require("axios");
const fs = require("fs/promises");
const moment = require("moment");
//使用fs/promise之後，先前自己寫的引用就可以直接刪除

fs.readFile("stock.txt", "utf8")
  .then((value) => {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: value,
      },
    });
  })
  .then(function (response) {
    if (response.data.stat === "OK") {
      console.log(response.data.date);
      console.log(response.data.title);
    }
  })
  .catch((reason) => {
    console.log(`因為${reason}所以錯誤`);
  });
