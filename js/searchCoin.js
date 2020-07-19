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


function hideAllCoinsBut(chosenCoin) {
    document.querySelectorAll('.card-header').forEach(card => {
        if (card !== chosenCoin) {
            card.parentElement.style.display = 'none';
        }
    });
    var button = `<button type="button" class="btn btn-success" id="getAllBtn">Get All Coins</button>`;
    document.querySelector('body').innerHTML += button;
    document.querySelector('#getAllBtn').addEventListener('click', showAllCoinsBack);
}


function showAllCoinsBack() {
    document.querySelectorAll('.card-header').forEach(card => {
        card.parentElement.style.display = 'flex';
    });
    document.querySelector('#getAllBtn').remove();
}

// function searchCoin() {
//     const code = document.querySelector('#searchInput').value.toLowerCase();
//     if (code === '') {
//     }
//     const url = `https://api.coingecko.com/api/v3/coins/${code}`;
//     getCoins(url, showCoins);
// }
