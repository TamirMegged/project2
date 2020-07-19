import getCoins from './ajaxService.js';

export default function getMoreInfo(e) {
    const id = e.target.parentElement.parentElement.id;
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    getCoins(url, showMoreInfo);
}


function showMoreInfo() {
    const info = JSON.parse(this.responseText);
    let html = `<div style="width: 80%;">in USD: ${info.market_data.current_price.usd}$<br>
            in EUR: ${info.market_data.current_price.eur}€<br>
            in ILS: ${info.market_data.current_price.ils}₪</div>
            <img src="${info.image.small}" width="50px" style="position: absolute; right: 10px">`;
    let collapseDiv = document.querySelector(`#info${info.symbol}`);
    collapseDiv.innerHTML = html;    
}