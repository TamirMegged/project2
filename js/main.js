import getCoins from './ajaxService.js';
import createCard from './createCard.js';
import searchCoin, { showAllCoinsBack } from './searchCoin.js';
import getMoreInfo from './moreInfo.js';
import goToAbout from './about.js';
import toggleCoin from './toggle.js';
import goToLiveReports from './liveReports.js';


window.addEventListener('load', getAll);
localStorage.setItem('chosenCoins', '[]');


// Event Listeners Manager
export function addEventListeners() {
    document.querySelector('#searchBtn').addEventListener('click', searchCoin);
    document.querySelector('#searchInput').addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchCoin();
        }
    });
    document.querySelector('#homeLink').addEventListener('click', showAllCoinsBack);
    document.querySelector('#liveReportsLink').addEventListener('click', goToLiveReports);
    document.querySelector('#aboutLink').addEventListener('click', goToAbout);
    document.querySelectorAll('.moreInfo').forEach(button => button.addEventListener('click', getMoreInfo));
    document.querySelectorAll('.coinToggle').forEach(input => input.addEventListener('click', toggleCoin));
}


// Get all coins on load of page and show them
function getAll(event) {
    event.preventDefault();
    activateNavbarLink('home');
    toggleProgressModal('block');
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
        return createCard(coin);
    }).join('');
    document.querySelector('#contentHeader').textContent = 'All Coins';
    const container = document.querySelector('#container');
    container.innerHTML = html;
    document.querySelector('#otherPages').textContent = '';
    toggleProgressModal('none');
    addEventListeners();
}


//Activate the right link on navbar
export function activateNavbarLink(linkID) {
    let ids = ['about', 'liveReports', 'home'];
    ids.forEach(link => {
        if (link === linkID) {
            document.querySelector(`#${link}Link`).parentElement.classList.add('active');
        } else {
            document.querySelector(`#${link}Link`).parentElement.classList.remove('active');
        }
    });
}


//Make the navbar sticky
window.addEventListener('scroll', stickNavbar);
var sticky = document.querySelector('#navbar').offsetTop;

function stickNavbar() {
    if (window.pageYOffset >= sticky) {
        document.querySelector('#navbar').classList.add("sticky");
    } else {
        document.querySelector('#navbar').classList.remove("sticky");
    }
}


//Toggle the progress modal display while on progress
export function toggleProgressModal(display) {
    document.querySelector('#progressModal').style.display = `${display}`;
}

// export function makeProgress() {
//     let i = 30;
//     setInterval(() => {
//         if (i <= 100) {
//             document.querySelector('#progressBar').style.width = `${i}%`;
//             i++;
//         } else {
//             i = 30;
//         }
//         if (document.querySelector('#progressModal').style.display === 'none') {
//             return;
//         }
//     }, 100);
// }