import getCoins from './ajaxService.js';

class CoinInfo {
    constructor(coin) {
        this.id = coin.id;
        this.symbol = coin.symbol;
        this.image = coin.image.small;
        this.usdPrice = coin.market_data.current_price.usd;
        this.eurPrice = coin.market_data.current_price.eur;
        this.ilsPrice = coin.market_data.current_price.ils;
        this.time = new Date();
    }
}


//Get more info about a coin (button class="moreInfo")
export default function getMoreInfo(e) {
    const id = e.target.parentElement.parentElement.id;
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    getCoins(url, showMoreInfo);
}


function showMoreInfo() {
    const coin = JSON.parse(this.responseText);
    let timeNow = new Date();
    let isNewNeeded = false;
    if (localStorage.getItem(`${coin.id}`)) {
        var coinInfo = JSON.parse(localStorage.getItem(`${coin.id}`));
        if (timeNow - new Date(coinInfo.time) > 120000) {
            isNewNeeded = true;
        }
    } else {
        isNewNeeded = true;
    }
    if (isNewNeeded) {
        var coinInfo = new CoinInfo(coin);
        localStorage.setItem(`${coinInfo.id}`, JSON.stringify(coinInfo));
    }
    let html = `<div style="width: 80%;">in USD: ${coinInfo.usdPrice}$<br>
            in EUR: ${coinInfo.eurPrice}€<br>
            in ILS: ${coinInfo.ilsPrice}₪</div>
            <img src="${coinInfo.image}" width="50px" style="position: absolute; right: 10px">`;
    let collapseDiv = document.querySelector(`#info${coinInfo.id}`);
    collapseDiv.innerHTML = html;
}