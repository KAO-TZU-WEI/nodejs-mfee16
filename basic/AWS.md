## AWS EC2

- 提供虛擬運算環境。
- 執行個體 CPU、記憶體、儲存和聯網功能的各種組態。
- 防火牆，讓您可指定通訊協定、連接埠，以及能夠使用安全群組前往執行個體的來源 IP 範圍。

## AWS IAM

- AWS Identity and Access Management (IAM)。
- 可以授予其他人管理和使用 AWS 帳戶資源的許可，而無需共用您的密碼或存取金鑰。

### Multi-factor authentication (MFA)

- 使用 MFA，不僅必須提供密碼或存取金鑰才能使用您的帳戶，還必須提供來自特殊設定裝置的代碼。

## 使用安全群組

- 根據預設 Amazon EC2 會封鎖連接埠 25 上的流量。
- 通訊協定：要允許的通訊協定。最常見的通訊協定為 6 (TCP)、17 (UDP) 和 1 (ICMP)。
- 連接埠範圍：適用於 TCP、UDP 或自訂通訊協定，要允許的連接埠範圍。您可以指定單一連接埠號碼 (例如，22)，或是連接埠號碼的範圍 (例如，7000-8000)。

## Amazon Relational Database Service (RDS)

- AWS 幫忙管理 mysql 的維運，讓使用者能夠在雲端中輕鬆設定、操作和擴展關聯式資料庫。

## Nginx web server

- 一個非同步框架的 web server，不過它的功用遠不僅止於 web server，它更多的用途是作為反向代理、Http Cache、負載平衡器。
- nginx / apache 這類的 web server 會提供接受 http 網路請求，https 則是 HTTP over TLS，他還是 HTTP ，但利用 SSL 來加密，比較安全。
- Nginx 的主設定檔為/etc/nginx/nginx.conf。由虛擬主機各別的設定，可以被放在/etc/nginx/sites-available 目錄中，而要上線的虛擬主機，可以將其設定檔的符號連結放置在/etc/nginx/sites-enabled 目錄中。

### 主設定檔為/etc/nginx/nginx.conf。

- nginx 的設定檔案也算是一種巢狀的格式，把左邊當作 key，右邊當作 value，最後面分號就是一個段落的結束。
  listen 是 key，80 是 value，一來就是要聽 80 port。

### 錯誤紀錄為/var/log/nginx/error_log。

- 設定錯誤日誌的存放位置，若第一個參數傳入檔案路徑，則可以存到檔案系統中。

### server

- 當客戶端透過網域名稱和 HTTP/HTTPS 協定來發送請求時，客戶端軟體會先查找網域名稱對應的 IP 位址，接著將網域名稱代進請求中的 Host 標頭欄位中，再將請求發送到該 IP 位址對應的主機。
- Nginx 的 server_name 命令就是要用來判斷客戶端請求中的 Host 標頭欄位是否能夠與之匹配，可用空格隔開多個。server_name 的匹配是不分大小寫的(case-insensitive)。

### location

- location 指令會因為不同的 URL 符合不同的規則，一般而言 location 可以設定"常規字符"或"正規表示式"。正規表示式會依照設定的順序決定符合的規則，當找到第一個符合的正規表示式時就會停止往下尋找，如果沒有找到符合的正規表示式，則使用常規字符。

### proxy_pass

- 要反向代理的內部網頁伺服器位置。
- 在 location 區塊中，利用 proxy_pass 命令，可以讓 Nginx 把請求透過 URI，交給其它的伺服器來處理。

### proxy_http_version

- 設定反向代理 http 使用的版本。

### proxy_set_header

- 設定反向代理要帶的 header 內容

### gzip

- gzip 其實就是在做壓縮（compression），減少 payload 或者檔案的大小以增進傳輸的效率。

### load balancer

- round-robin：(預設)輪詢方式:也就是將請求輪流按照順序分配給每一個 server。
- least-connected：連線進來時會把 Request 導向連線數較少的 Server。
- IP-hash：依據 Client IP 來分配到不同台 Server，通過一個雜湊（Hash）函式將一個 IP 地址對映到一臺伺服器。

## TCP / IP 協定

- OSI 七層架構分為應用層 application, 表現層 presentation, 會談層 session, 傳輸層 transport, 網路層 network, 資料鍊結層 data link, 以及實體層 physical。
- 應用層定義網路應用程式與網路間溝通的界面, 它負責將應用程式所送出的訊息轉換成一長串的字元資料, 並在標頭欄位 (header) 加入可辨別傳送端與接收端的資訊等。所使用的協定有 HTTP, HTTPS, FTP, TFTP, STMP, POP3 等等。
- 表現層主要作用是用來定義資料的格式轉換以及加密解密與壓縮。可以將資料轉換成電腦可以辨識與使用的格式例如 ASCII 碼，另外還會在此層的標頭欄位儲存資料的轉換、加密解密方法、或者是壓縮方法等等，以方便資料接收者的還原與使用。
- 傳輸層負責讓資料可以正確送達目的地。在這一層裡面，資料封包會被切成 segment ，然後進行錯誤檢查工作、並且在每個片段的標頭欄位紀錄每個片段的順序編號與錯誤檢查碼等資訊。另外此層所用的協議大多為 TCP 與 UDP，TCP 為 transmission control protocol, 會先建立連線，三手交握模式建立連線之後才能傳輸，可以確保資料正確無誤的到達目的地。
- 網路層負責規劃、選擇資料的最佳傳輸路徑（路由判斷），所有的資料經過轉換成為封包之後，會在每一個封包的標頭欄欄位加入發送端 IP 資訊、封包順序資訊、接收端 IP 資訊等等。路由判斷的部份可以採行 Dijkstra 演算法。最主要的的作用：路由規劃、邏輯定址、以及傳送 forwarding。

  ![image](https://2.bp.blogspot.com/-NvR-Ggqonmw/VzKpMkgJA3I/AAAAAAAAAZ4/xmsQQuLsQFk6UE8UXdyRGM_cjFXZZB4GgCLcB/s1600/osi_tcpip.jpg)

> [什麼是 Amazon EC2？](https://docs.aws.amazon.com/zh_tw/AWSEC2/latest/UserGuide/concepts.html)<br>[什麼是 OSI 的 7 層架構？](https://ithelp.ithome.com.tw/articles/10000021) <br> [什麼是 OSI 的 7 層架構？](http://dannysun-unknown.blogspot.com/2016/05/osi.html)<br>[OSI 七層與 TCP/IP 四層](https://sites.google.com/site/archerdevil/home/networking/osi-qi-ceng-yutcp-ip-si-ceng) > [[基礎觀念系列] Web Server & Nginx — (2)](https://medium.com/starbugs/web-server-nginx-2-bc41c6268646)<br>[使用 Ubuntu Server 架設 Nginx 伺服器](https://magiclen.org/ubuntu-server-nginx/)
