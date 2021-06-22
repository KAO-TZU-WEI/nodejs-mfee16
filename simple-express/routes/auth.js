const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { connection } = require("../utils/db");
const bcrypt = require("bcrypt");
//原生套件path是用來串接路徑join
const path = require("path");
const multer = require("multer");

//設定上傳檔案的儲存方式
const myStorage = multer.diskStorage({
  //目的地
  destination: function (req, file, cb) {
    //_dirname是被執行的js檔所在的絕對路徑
    cb(null, path.join(__dirname, "../", "public", "uploads"));
  },
  //因為預設沒有副檔名，組合自己想要的檔案名稱
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
//用multer做一個上傳工具
const uploader = multer({
  storage: myStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "image/jpeg") {
      return cb(new Error("不合法的file type"), false);
    }
    //file.originalname 原本電腦的檔案名稱
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("是不合格的副檔名"));
    }
    //檔案ok接收這個檔案
    cb(null, true);
  },
  limits: {
    //檔案大小1M
    fieldSize: 1024 * 1024,
  },
});

// 註冊表單資料的驗證規則
const registerRules = [
  body("email").isEmail().withMessage("請正確輸入 Email 格式"),
  body("password").isLength({ min: 4 }),
  body("confirmPassword").custom((value, { req }) => {
    return value === req.body.password;
  }),
];
router.get("/register", (req, res) => {
  res.render("auth/register");
});
router.post(
  "/register",
  uploader.single("photo"), //是input的value
  registerRules,
  async (req, res, next) => {
    //console.log("這是/register的req.body內容：", req.body);
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
    let filepath = req.file ? "/uploads/" + req.file.filename : null;
    let result = await connection.queryAsync(
      "INSERT INTO members (email, password, name, photo) VALUES (?)",
      [
        [
          req.body.email,
          await bcrypt.hash(req.body.password, 10),
          req.body.name,
          filepath, //file.filename是自己取的
        ],
      ]
    );
    res.send("註冊成功");
  }
);
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
