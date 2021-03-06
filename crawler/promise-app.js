const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
// TODO: 從 stock.txt 讀股票代碼進來
// filesystem
// npm i fs ??? -> 不用

function xhrPromise() {
  return new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
xhrPromise()
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
