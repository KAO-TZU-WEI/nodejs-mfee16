// https://www.twse.com.tw/exchangeReport/BWIBBU_d?
// response=json
// date=20210525
// selectType=ALL&_=1622009217406

const axios = require('axios');

// 給指定的ID創建請求
axios.get('https://www.twse.com.tw/exchangeReport/BWIBBU_d', {
    params: {
        response: 'json',
        date: '20210525',
        selectType: 'ALL'
    }
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
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
        console.log('跑到這裡嘍');
    });
