import getCoins from './ajaxService.js';
import createCard from './createCard.js';
import searchCoin from './searchCoin.js';
import getMoreInfo from './moreInfo.js';


window.addEventListener('load', getAll);
document.querySelector('#searchBtn').addEventListener('click', searchCoin);


function getAll() {
    const url = 'https://api.coingecko.com/api/v3/coins/list';
    getCoins(url, showCoins);
}


function showCoins() {
    const coins = JSON.parse(this.responseText);
    let i = 0;
    var html = coins.map(coin => {
        i++;
        //For developement: only first 100 coins
        if (i > 100) {
            return;
        }
        return createCard(coin, i);
    }).join('');
    const container = document.querySelector('#container');
    container.innerHTML = html;
    document.querySelectorAll('.moreInfo').forEach(button => button.addEventListener('click', getMoreInfo));
}