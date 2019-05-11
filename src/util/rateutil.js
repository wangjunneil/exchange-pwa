const API_KEY = "673abeff572fd24d4eb4b3b6d16955bc";

export function cacheRateNow() {
    // get current user country list
    let cacheData = JSON.parse(localStorage.getItem('cacheData'));
    if (cacheData != null) {
        let currencies = "";
        cacheData.forEach(e => { currencies += e.symbol + ',' });   // ex: CNY,PHP,USD

        // fetch(`http://www.apilayer.net/api/live?access_key=${API_KEY}&source=USD&currencies=${currencies}&format=1`)
        //     .then(resp => { return resp.json(); })
        //     .then(function(myJson) {
        //     if (myJson.success) {
        //         console.log(new Date(parseInt(myJson.timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '));
        //         localStorage.setItem('storedRates', JSON.stringify(myJson));
        //     } else {
        //         console(myJson.error.info);
        //     }

        //     return myJson;
        // });

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
