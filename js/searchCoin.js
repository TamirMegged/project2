import { activateNavbarLink, addEventListeners, toggleProgressModal } from './main.js';

//Search a coin in client side (button id="searchBtn")
export default function searchCoin() {
    toggleProgressModal('block');
    let notFound = true;
    const search = document.querySelector('#searchInput').value;
    const code = search.toUpperCase();
    if (code === '') {
        toggleProgressModal('none');
        document.querySelector('#noCode').style.display = 'block';
        setTimeout(() => {
            document.querySelector('#noCode').style.display = 'none';
        }, 3000);
        return;
    }
    document.querySelectorAll('.card-header').forEach(coin => {
        if (coin.innerText === code) {
            notFound = hideAllCoinsBut(coin);
            return;
        }
    });
    if (notFound) {
        hideAllCoinsBut('notFound');
        document.querySelector('#contentHeader').textContent = `"${search}" Not Found`;
    }
}


//Hide all the coins but the one searched
export function hideAllCoinsBut(chosenCoin) {
    let button = false;
    document.querySelectorAll('.card-header').forEach(card => {
        if (card !== chosenCoin) {
            card.parentElement.style.display = "none";
            return;
        } else {
            activateNavbarLink('home');
            document.querySelector('#otherPages').innerHTML = "";
            card.parentElement.style.display = "";
        }
    });
    if (chosenCoin !== null) {
        if (!document.querySelector('#getAllBtn')) {
            button = `<button type="button" class="btn btn-success btn-lg" id="getAllBtn">Return to All Coins</button>`;
        }
        if (button) {
            document.querySelector('#otherPages').innerHTML = button;
            document.querySelector('#getAllBtn').addEventListener('click', showAllCoinsBack);
            document.querySelector('#contentHeader').textContent = 'Result';
            addEventListeners();
        }
    }
    toggleProgressModal('none');
    return false;
}


//Show back all the coins
function showAllCoinsBack() {
    toggleProgressModal('block');
    document.querySelectorAll('.card-header').forEach(card => {
        card.parentElement.style.display = "";
    });
    document.querySelector('#getAllBtn').remove();
    document.querySelector('#contentHeader').textContent = 'All Coins';
    toggleProgressModal('none');
}