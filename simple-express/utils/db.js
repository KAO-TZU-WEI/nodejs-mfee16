//建立 utils/db.js 負責資料庫連線模組
//使用dotenv-密碼隱藏
require("dotenv").config();
const mysql = require("mysql");
const Bluebird = require("bluebird");
//連線資料庫
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dateStrings: true,
});
//connection->Promise化
connection = Bluebird.promisifyAll(connection);
exports.connection = connection;
