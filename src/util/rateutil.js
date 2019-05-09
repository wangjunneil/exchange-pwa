const API_KEY = "673abeff572fd24d4eb4b3b6d16955bc";

export function cacheRateNow() {
    // get current user country list
    let cacheData = JSON.parse(localStorage.getItem('cacheData'));
    if (cacheData != null) {
        let currencies = "";
        cacheData.forEach(e => { currencies += e.symbol + ',' });   // ex: CNY,PHP,USD

        fetch(`http://www.apilayer.net/api/live?access_key=${API_KEY}&source=USD&currencies=${currencies}&format=1`)
            .then(resp => { return resp.json(); })
            .then(function(myJson) {
            if (myJson.success) {
                console.log(new Date(parseInt(myJson.timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '));
                localStorage.setItem('storedRates', JSON.stringify(myJson));
            } else {
                console(myJson.error.info);
            }

            return myJson;
        });
    }
}
