// http 是 NodeJS 內建的 web server，所以不用安裝
// https://nodejs.org/docs/latest-v14.x/api/http.html
const http = require("http");

// createServer(Listener)
// Listener(request, response) 負責處理進來的連線
// request 是請求物件
// response 是回覆物件
const server = http.createServer((req, res) => {
  console.log("新連線進來了");
  console.log(req.url);

  res.statusCode = 200; // 2xx, 3xx, 4xx, 5xx
  res.setHeader("Content-Type", "text/plain;charset=UTF-8");

  switch (req.url) {
    case "/":
      res.end("歡迎光臨，這是首頁");
      break;
    case "/shopping":
      res.end("這是購物頁面");
      break;
    case "/about":
      res.end("這是關於我們");
      break;
    default:
      res.writeHead(404);
      res.end("您輸入錯誤，請重新輸入");
  }
});

// port
server.listen(3000, () => {
  console.log("我開始運行了，接受的是 3000 port");
});

// PHP --> 搭配 web server （apache or nginx)
// NodeJS 直接開發一個 web server
