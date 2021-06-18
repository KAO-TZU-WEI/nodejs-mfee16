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
  // 將 url 一般化，移除他的 query string、非必要的結尾斜線，並且一率小寫
  const path = req.url.replace(/\/?(?:\?.*)?$/, "").toLocaleLowerCase();
  console.log(`path:${path}`);

  // 處理 query string-node.js內建的模組可以把字串變成物件。
  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log(url.searchParams);

  res.statusCode = 200; // 2xx, 3xx, 4xx, 5xx
  res.setHeader("Content-Type", "text/plain;charset=UTF-8");

  switch (path) {
    case "":
      res.end("歡迎光臨，這是首頁");
      break;
    case "/shopping":
      res.end("這是購物頁面");
      break;
    case "/about":
      // 把 query string 抓出來用
      // set vs get 存取運算子
      let name = url.searchParams.get("name") || "網友";
      res.end(`Hi, ${name} 這是關於我們`);
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
