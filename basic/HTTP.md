## 超文本傳輸協定 (HTTP)

當用戶端發出 HTTP 請求(Hypertext Transfer Protocol，超文本傳輸協議)，網路伺服器必須回應所有的 HTTP 請求。

- Textual 純文字
- Stateless 無狀態
- 預設 port ：80

## 超文本傳輸安全協定（HTTPS）

- 由於 HTTP 一直都有安全性的問題，因此 HTTPS 就是基於 HTTP 並利用 SSL/TLS 將資訊加密封包的另一種更安全的協定。
- 預設 port ：443

## HTTP cookie

Cookie 是伺服器（Server）傳送給瀏覽器（Client）的一小片段資料，並請瀏覽器保存起來，以便往後向相同的伺服器發送請求時，附上這 Cookie 的資料。

- 儲存和追蹤使用者行為
- 儲存用戶登入、購物車等伺服器所需的資訊
- 儲存使用者設定和偏好等

## Http Request Method

- Get:單純的跟 server 要一個連結或圖片。
- Post:登入會員、送出表單。
- Put:取代掉整個 request。
- Patch:修改部分 request。
- Delete:刪除資源。
- Head:只要獲取 request 的 header，不要 body。

## HTTP 狀態碼(Http status code)

- 2xx：成功。
- 3xx：重新導向，用戶端瀏覽器必須採取更多動作才能完成要求。
- 4xx：Client 端錯誤。
- 5xx：Service 端錯誤。

## 網路伺服器（web server）

可以指軟體、也可以指硬體、還可以指它們共同運作的狀態。<br>
網路伺服器必須回應所有的 HTTP 請求，然後回覆(HTML 檔案，但也可以包含一個純文字檔案、一個圖像或其他類型的檔案)給請求者。<br>
網頁伺服器一詞有三個意思：1)一台提供服務的電腦。2)一台負責提供網頁的電腦，主要是 HTML 檔案，透過 HTTP 協定傳給客戶端（一般是指網頁瀏覽器）。3)一個提供網頁的伺服器程式。

市面上最普遍的網頁（HTTP）伺服器有:

- Apache 軟體基金會的 Apache HTTP 伺服器
- Microsoft 的 Internet Information Server（IIS）
- Google 的 Google Web Server
- nginx 公司的 nginx
- lighttpd 公司的 lighttpd

## 伺服端(server-side)

![image](https://media.prod.mdn.mozit.cloud/attachments/2016/09/04/13839/887e50af70deb1a23a9047c9b7b050e3/Web%20Application%20with%20HTML%20and%20Steps.png)

- 伺服端網頁語言有 PHP/Node.JS/Python/Ruby/C#
- 動態網站（主要搭配伺服器和資料庫共同運作所生成，像是會員功能，購物車等)
- 靜態網站(通常為 CSS、JavaScript、圖片、預產生的 PDF 檔案等)

#### 伺服端程式設計

- 高效率資訊儲存與遞送
- 客製化的使用者體驗
- 控制內容存取
- 儲存 session/state 資訊
- 提醒與溝通
- 資料分析，根據資料分析以完善回應。

  > > > 參考資料
  > > > https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-http-cookie-%E5%92%8C-session-%E4%BD%BF%E7%94%A8-19bc740e49b5<br>https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Cookies<br>https://developer.mozilla.org/zh-TW/docs/Learn/Server-side/First_steps/Introduction<br>https://miahsuwork.medium.com/%E7%AC%AC%E5%85%AD%E9%80%B1-%E7%B6%B2%E8%B7%AF%E5%9F%BA%E7%A4%8E-http-request-response-7d7e0cb88ed8<br>https://developer.mozilla.org/zh-TW/docs/Learn/Common_questions/What_is_a_web_server<br>https://www.newscan.com.tw/all-knowledge/knowledge-detail-6.htm
