/* 根据本地缓存请求最新汇率 */
function requestRate() {
    let cacheData = JSON.parse(localStorage.getItem('cacheData'));
    if (cacheData != null) {
        let currencies = "";
        cacheData.forEach(e => { currencies += e.symbol + ',' });   // ex: CNY,PHP,USD

        fetch(`https://api.exchangeratesapi.io/latest?base=USD&symbols=${currencies.substring(0, currencies.length - 1)}`)
            .then(resp => { return resp.json(); })
            .then(function(result) {
            if (result.error != null) {
                // ex: {"error":"Symbols 'CNY,PHP,EUR,' are invalid for date 2019-05-11."}
                console.error(result.error);
                return;
            }

            // ex: {"base":"USD","rates":{"PHP":52.2902938557,"CNY":6.8235084595,"EUR":0.8904719501},"date":"2019-05-10"}
            localStorage.setItem('storedRates', JSON.stringify(result));
        });
    }
}

/* 请求定位权限 */
function geoLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;    // 维度
        let longitude = position.coords.longitude;  // 经度
        console.log(`current position: ${latitude}, ${longitude}`);
        // http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
    }, (error) => { // 错误处理
        let errorMessage;
        switch (error.code) {
            case 0:
                errorMessage = 'unknown error';
                break;
            case 1:
                errorMessage = 'permission denied';
                break;
            case 2:
                errorMessage = 'position unavailable';
                break;
            case 3:
                errorMessage = 'timed out';
                break;
            default:
                break;
        }

        console.log(`Error occurred. Error code: ${errorMessage}`);
    });
}

export { requestRate, geoLocation };
