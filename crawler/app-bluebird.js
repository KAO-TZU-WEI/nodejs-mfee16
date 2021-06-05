const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const Promise = require("bluebird");
//雖不是原生套件，但業界使用度很高。
//變數命名promise是因為要蓋掉原生的，可以很自然的使用。
//可將callback函式包成promise版本。

// 方法1: 一個函式一個函式包
// 用 bluebird 包 callback 版本的 readFile
// const readFile = Promise.promisify(fs.readFile);

// 方法2: 整個 fs 都包起來
// 把 fs 所有的 function 都包成 promise
// 但是原本的函式名稱後面會被加上 Async
const fsBlue = Promise.promisifyAll(fs);

fsBlue
  .readFileAsync("stock.txt", "utf8")
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
