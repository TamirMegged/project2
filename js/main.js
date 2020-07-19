import getCoins from './ajaxService.js';
import createCard from './createCard.js';
import searchCoin from './searchCoin.js';
import getMoreInfo from './moreInfo.js';
import goToAbout from './about.js';


window.addEventListener('load', getAll);
document.querySelector('#searchBtn').addEventListener('click', searchCoin);
document.querySelector('#aboutLink').addEventListener('click', goToAbout);
document.querySelector('#homeLink').addEventListener('click', getAll);


function getAll(event) {
    event.preventDefault();
    activateNavbarLink('home');
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
    const page = document.querySelector('page');
    page.innerHTML = `<h1 style="text-align: center; margin-top: 20px">Coins</h1>` + `<div id="container">${html}</div>`;
    document.querySelectorAll('.moreInfo').forEach(button => button.addEventListener('click', getMoreInfo));
}


 export function activateNavbarLink(linkID) {
    let ids = ['about', 'liveReports', 'home'];
    ids.forEach(link => {
        if (link === linkID) {
            document.querySelector(`#${link}Link`).parentElement.classList.add('active');
        } else {
            document.querySelector(`#${link}Link`).parentElement.classList.remove('active');
        }
    })
}