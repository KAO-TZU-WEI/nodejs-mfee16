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

// 註冊表單資料的驗證規則
const registerRules = [
  body("email").isEmail().withMessage("請正確輸入 Email 格式"),
  body("password").isLength({ min: 4 }),
  body("confirmPassword").custom((value, { req }) => {
    return value === req.body.password;
  }),
];
// // 設定上傳檔案儲存方式
// const myStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../", "public", "upload"));
//   },
//   filename: function (req, file, cb) {
//     const ext = file.originalname.split(".").pop();
//     cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });

// // 用multer做上傳工具
// const uploader = multer({
//   storage: myStorage,
//   fileFilter: function (req, file, cb) {
//     // console.log(file)
//     if (file.mimetype !== "image/jpeg") {
//       return cb(new Error("不合法", false));
//     }
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return cb(new Error("不合格的附檔名", false));
//     }

//     cb(null, true);
//   },
//   limits: { fileSize: 1024 * 1024 },
// });

router.get("/register", (req, res) => {
  res.render("auth/register");
});
router.post("/register", registerRules, async (req, res, next) => {
  //res.send("這裡是POST register");
  console.log("這是/register的req.body內容：", req.body);
  //要做資料驗證
  const validateResult = validationResult(req);
  //console.log(validateResult);
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
  //   let result = await connection.queryAsync(
  //     "INSERT INTO members (email, password, name, photo) VALUES (?)",
  //     [
  //       [
  //         req.body.email,
  //         await bcrypt.hash(req.body.password, 10),
  //         req.body.name,
  //         `/upload/${req.file.filename}`,
  //       ],
  //     ]
  //   );
  res.send("註冊成功");
});
router.get("/login", function (req, res) {
  res.render("auth/login");
});
// 登入表單資料的驗證規則
const loginRules = [
  body("email").isEmail(),
  body("password").isLength({ min: 4 }),
];
router.post("/login", loginRules, async function (req, res) {
  const validateResult = validationResult(req);
  if (!validateResult.isEmpty()) {
    return next(new Error("資料格式錯誤"));
  }
  let member = await connection.queryAsync(
    "SELECT * FROM members WHERE email=?",
    req.body.email
  );
  if (member.length === 0) {
    return next(new Error("查無此帳號"));
  }
  member = member[0];
  console.log(member);
  //用bcrypt函式來驗證加密的密碼
  let result = await bcrypt.compare(req.body.password, member.password);
  if (result == true) {
    //req.session.isLogin = true;
    req.session.member = {
      email: member.email,
      name: member.name,
    };
    req.session.message = {
      title: "登入成功",
      text: "歡迎回來",
    };
    //303 see other意思
    res.redirect(303, "/");
  } else {
    req.session.mamber = null;
    // 處理訊息
    req.session.message = {
      title: "登入失敗",
      text: "請填寫正確帳號密碼",
    };
    // 轉跳到登入頁面
    res.redirect(303, "/auth/login");
  }
});
router.get("/logout", (req, res) => {
  req.session.member = null;
  req.session.message = {
    title: "登出成功",
    text: "歡迎再次光臨",
  };
  res.redirect(303, "/");
});
module.exports = router;
