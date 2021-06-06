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
//使用dotenv-密碼隱藏
require("dotenv").config();
//連線資料庫
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
// mysql本身是沒有Promise的，所以用bluebird來將連線Promise化
//connection = Promise.promisifyAll(connection);
// connection.connectAsync();
//確認是否連線
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: ");
    return;
  }
  console.log("connected");
});
//讀取成功

//建立非同步函式連結資料庫後，讀取連結
//(async function () {
//建立連結，(blue後需加上Async)

fsBlue
  .readFileAsync("stock.txt", "utf8")
  .then((value) => {
    return axios.get("https://www.twse.com.tw/zh/api/codeQuery", {
      params: {
        query: value,
      },
    });
  })
  .then(function (response) {
    connection.query(
      `SELECT stock_id FROM stock WHERE stock_id ='${response.data.query}'`,
      function (error, results, fields) {
        //console.log("結果是", results.length, fields);
        if (results.length == 0) {
          console.log("結果是", results.length);
          judge();
        } else if (error) throw error;
      }
    );
    //judge();
    function judge() {
      if (response.status == "200") {
        //確定可以抓到狀態是200時的資料，接著取出response.data.suggestion的內容（物件）
        //股票代號所搜尋出來相對應的值可能不止一個，但在本次練習只需要抓取一個，並拆分成股票id和名稱
        let data = response.data.suggestions.shift();
        let newdata = data.split("\t");
        console.log("這是抓出來並要keyin到資料庫的", newdata);
        if (data.length > 1) {
          connection.query(
            `INSERT INTO stock(stock_id, stock_name) VALUES ('${newdata[0]}','${newdata[1]}')`
          );
          //若是資料已經有資料，則會出現code: 'ER_DUP_ENTRY'和errno: 1062和sqlState: '23000'的錯誤代碼
        }
      }
    }
  })
  .catch((reason) => {
    console.log(`因為${reason}所以錯誤`);
  })

  .finally(() => {
    console.log("跑到我嘍");
    //connection.end();
  });
// connection.end();
// console.log("關閉資料庫連結嘍");
//})();
