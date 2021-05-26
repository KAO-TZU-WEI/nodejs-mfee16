// 110年05月25日個股日本益比、殖利率及股價淨值比-中央證券交易所
// axios.<method> will now provide autocomplete and parameter typings
const axios = require('axios');

// 給指定的ID創建請求
axios.get('https://www.twse.com.tw/exchangeReport/BWIBBU_d', {
    params: {
        response: 'json',
        date: '20210525',
        selectType: 'ALL'
    },
})
    .then(function (response) {
        if (response.status) {
            let leng = response.data.data.length;
            //總共有951隻股票
            console.log(response.data.fields);
            //一個一個將股票代號和殖利率取出，一頁最多顯示15筆
            for (let i = 0; i < 15; i++) {
                console.log(response.data.data[i]);
            }
        }
    })
    .catch(function (error) {
        // 若有錯誤訊息會顯示
        console.log(error);
    })
    .then(function () {
        // 總是會執行的地方
        console.log('跑到這裡嘍');
    });
