import getCoins from './ajaxService.js';
import createCard from './createCard.js';


window.addEventListener('load', getAll);
document.querySelector('#searchBtn').addEventListener('click', searchCoin);


function getAll() {
    const url = 'https://api.coingecko.com/api/v3/coins/list';
    getCoins(url, showCoins);
    if (document.querySelector('#getAllBtn')) {
        document.querySelector('#getAllBtn').remove();
    }
}


function searchCoin() {
    const code = document.querySelector('#searchInput').value.toLowerCase();
    if (code === '') {
    }
    const url = `https://api.coingecko.com/api/v3/coins/${code}`;
    getCoins(url, showCoins);
}


function showCoins() {
    const coins = JSON.parse(this.responseText);
    if (Array.isArray(coins)) {
        let i = 0;
        var html = coins.map(coin => {
            i++;
            //For developement: only first 100 coins
            if (i > 100) {
                return;
            }
            return createCard(coin, i);
        }).join('');
    } else {
        var html = createCard(coins);
        var button =  `<button type="button" class="btn btn-success" id="getAllBtn">Get All Coins</button>`;
        document.querySelector('body').innerHTML += button;
        document.querySelector('#getAllBtn').addEventListener('click', getAll);
    }
    const container = document.querySelector('#container');
    container.innerHTML = html;
    document.querySelectorAll('.moreInfo').forEach(button => button.addEventListener('click', getMoreInfo));
}


function getMoreInfo(e) {
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