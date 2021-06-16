//查詢資料庫，看此代碼是否存在
//存在：不做事
//不存在:去 https://www.twse.com.tw/zh/api/codeQuery?query=${stockCode} 查詢名稱
//      查回來後，處理資料，取得該股票代碼的名稱
//      把股票代碼存進去資料庫

const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
//使用bluebird套件
const Promise = require("bluebird");
const fsBlue = Promise.promisifyAll(fs);
//使用mysql套件
const mysql = require("mysql");
const Bluebird = require("bluebird");
//const { resolve } = require("bluebird");
//使用dotenv-密碼隱藏
require("dotenv").config();
//連線資料庫
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
connection = Bluebird.promisifyAll(connection);
// mysql本身是沒有Promise的，所以用bluebird來將連線Promise化

//寫法一：await
(async function () {
  try {
    await connection.connectAsync();
    let stockNum = await fsBlue.readFileAsync("stock.txt", "utf8");
    stockNum = stockNum.split(",");
    //console.log("在這裏", stockNum[0], stockNum[1]);
    for (let i = 0; i < stockNum.length; i++) {
      let result = await connection.queryAsync(
        `SELECT stock_id FROM stock WHERE stock_id =${stockNum[i]}`
      );
      if (result.length >= 1) {
        console.log(`${stockNum[i]}這一支股票已經存在`);
      } else {
        let search = await axios.get(
          `https://www.twse.com.tw/zh/api/codeQuery?query=${stockNum[i]}`
        );
        let results = search.data.suggestions;
        let result = results.shift().split("\t");
        if (result.length > 1) {
          let final = await connection.queryAsync(
            `INSERT INTO stock(stock_id, stock_name) VALUES ('${result[0]}','${result[1]}')`
          );
        } else {
          console.log("您輸入的代號錯誤");
        }
      }
      console.log(`查詢股票代號：${stockNum[i]}成交資料`);
      let detail = await axios.get(
        `https://www.twse.com.tw/exchangeReport/STOCK_DAY`,
        {
          params: {
            response: "json",
            date: moment().format("YYYYMMDD"),
            stockNo: stockNum[i],
          },
        }
      );
      //console.log(moment().format("YYYYMMDD"));
      if ((detail.stat = "OK")) {
        //let stockDetail = detail.data.data;
        //console.log(stockDetail.length);
        let stockDetail = detail.data.data.map((item) => {
          item = item.map((value) => {
            return value.replace(/,/g, "");
          });
          //原先"110/06/09","312,756,840","7,655,573,035","24.85",25.25","23.80","23.85","-1.00","79,012",];
          //修正後'2021-06-01', '666680370','17473424042', '26.30','26.80','25.70','25.70','-0.15','151625']
          item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000;
          item[0] = moment(item[0], "YYYYMMDD").format("YYYY-MM-DD");
          item.unshift(stockNum[i]);
          return item;
        });
        //console.log(stockDetail);
        let insertDetail = await connection.queryAsync(
          "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
          [stockDetail]
        );
        console.log(insertDetail); //OkPacket是成功時會出現的
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
})();

// //寫法二：promise-blue後需加上Async
// var insertNum = "";
// fsBlue
//   .readFileAsync("stock.txt", "utf8")
//   .then((stockNum) => {
//     console.log("目前查詢的是", stockNum);
//     insertNum = stockNum;
//     return (numResult = new Promise((resolve, reject) => {
//       connection.query(
//         `SELECT stock_id FROM stock WHERE stock_id = ${stockNum}`,
//         function (err, results) {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(results);
//           }
//         }
//       );
//     }));
//   })
//   .then((resultNum) => {
//     //console.log("我在這", resultNum.length);
//     if (resultNum.length >= 1) {
//       //throw console.log("已經存在這支股票");
//       return Promise.resolve(false);
//     } else {
//       return axios.get(
//         `https://www.twse.com.tw/zh/api/codeQuery?query=${insertNum} `
//       );
//     }
//   })
//   .then((results) => {
//     if (results != false) {
//       let result = results.data.suggestions.shift().split("\t");
//       console.log("那我呢:", result);
//       return (final = new Promise((resolve, reject) => {
//         connection.queryAsync(
//           `INSERT INTO stock(stock_id, stock_name) VALUES ('${result[0]}','${result[1]}')`,
//           function (err, results) {
//             if (err) {
//               reject(err);
//             } else {
//               resolve(results);
//             }
//           }
//         );
//       }));
//     } else {
//       console.log("存入失敗");
//     }
//   })
//   .catch((reason) => {
//     console.log(`因為${reason}所以錯誤`);
//   })
//   .finally(() => {
//     console.log("要關門嘍");
//     connection.end();
//   });
