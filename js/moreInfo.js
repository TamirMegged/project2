import getCoins from './ajaxService.js';
import { toggleProgressModal } from './main.js';

class CoinInfo {
    constructor(coin) {
        this.id = coin.id;
        this.image = coin.image.small;
        const currentPrice = coin.market_data.current_price;
        this.eurPrice = currentPrice.eur ? currentPrice.eur : "Unknown value in ";
        this.ilsPrice = currentPrice.ils ? currentPrice.ils : "Unknown value in ";
        this.usdPrice = currentPrice.usd ? currentPrice.usd : "Unknown value in ";
        this.time = new Date();
    }
}


//Get more info about a coin (button class="moreInfo")
export default function getMoreInfo(e) {
    let collapseDiv = e.target.parentElement.querySelector('.collapse');
    toggleProgressModal('block');
    const id = e.target.parentElement.parentElement.id;
    if (!collapseDiv || collapseDiv.classList.contains('show')) {
        toggleProgressModal('none');
        return;
    }
    if (localStorage.getItem(`${id}`)) {
        let timeNow = new Date();
        var coinInfo = JSON.parse(localStorage.getItem(`${id}`));
        if (timeNow - new Date(coinInfo.time) < 120000) {
            showMoreInfo(false, coinInfo);
        }
    }
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    getCoins(url, showMoreInfo);
}


function showMoreInfo(isNew = true, coinFromLS = undefined) {
    if (isNew) {
        const coin = JSON.parse(this.responseText);
        var coinInfo = new CoinInfo(coin);
        localStorage.setItem(`${coinInfo.id}`, JSON.stringify(coinInfo));
    } else {
        var coinInfo = coinFromLS;
    }
    let html = `<div style="width: 80%;">in USD: ${coinInfo.usdPrice}$<br>
            in EUR: ${coinInfo.eurPrice}€<br>
            in ILS: ${coinInfo.ilsPrice}₪</div>
            <img src="${coinInfo.image}" width="50px" style="position: absolute; right: 10px">`;
    let collapseDiv = document.querySelector(`#info${coinInfo.id}`);
    collapseDiv.innerHTML = html;
    toggleProgressModal('none');
}