import {activateNavbarLink} from './main.js';

export default function searchCoin() {
    const code = document.querySelector('#searchInput').value.toUpperCase();
    if (code === '') {
    }
    document.querySelectorAll('.card-header').forEach(coin => {
        if (coin.innerText === code) {
            hideAllCoinsBut(coin);
            return;
        }
    });
}


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
            button = `<button type="button" class="btn btn-success" id="getAllBtn">Get All Coins</button>`;
        }
    });
    if (button) {
        document.querySelector('body').innerHTML += button;
        document.querySelector('#getAllBtn').addEventListener('click', showAllCoinsBack);
        document.querySelector('#contentHeader').textContent = 'Result';
    }
}


function showAllCoinsBack() {
    document.querySelectorAll('.card-header').forEach(card => {
        card.parentElement.style.display = "";
    });
    document.querySelector('#getAllBtn').remove();
}