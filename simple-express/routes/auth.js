const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { connection } = require("../utils/db");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");

// const stoarge = multer.diskStorage({
//   destination: function (req, file, cd) {
//     //routes/auth.js->現在位置
//     //public/uploads ->希望找到的位置
//     //routes/../public/uploads
//     cb(null, path.join(__dirname, "../", "public", "uploads"));
//   },
// });
// //用一個multer做一個上傳工具
// const uploader = multer({
//   storage: myStorage,
//   fileFilter: function (req, file, cb) {
//     if (file.mimetype !== "image/jpeg") {
//       return cb(new Error("不合法的file type"), false);
//     }
//     if(!file.orginalname.match(){
//         return cb(new Error("不合格的副檔名"))
//     }
//   },
// });
router.get("/register", (req, res) => {
  res.render("auth/register");
});
// 註冊表單資料的驗證規則
const registerRules = [
  body("email").isEmail().withMessage("請正確輸入 Email 格式"),
  body("password").isLength({ min: 4 }),
  body("confirmPassword").custom((value, { req }) => {
    return value === req.body.password;
  }),
];

router.post("/register", registerRules, async (req, res, next) => {
  //res.send("這裡是POST register");
  console.log(req.body);
  //要做資料驗證
  const validateResult = validationResult(req);
  console.log(validateResult);
  //不是空的就是有問題
  if (!validateResult.isEmpty()) {
    return next(new Error("註冊表單資料有問題"));
  }
  //先檢查email是否註冊過了
  let checkResult = await connection.queryAsync(
    "SELECT * FROM members WHERE email=?",
    req.body.email
  );
  if (checkResult.length > 0) {
    return next(new Error("已經註冊過了"));
  }
  let result = await connection.queryAsync(
    "INSERT INTO members (email, password, name) VALUES (?)",
    [[req.body.email, await bcrypt.hash(req.body.password, 10), req.body.name]]
  );

  res.send("註冊成功");
});
router.get("/login", function (req, res) {
  res.render("auth/login");
});

module.exports = router;
