import { activateNavbarLink } from './main.js';
import { hideAllCoinsBut } from './searchCoin.js';
import getData from './ajaxService.js';

//Live Reports screen - go to Live Reports (a id="liveReportsLink")
export default function goToLiveReports(event) {
    event.preventDefault();
    let html = `<canvas id="chart" style="width: 400px; height="200px"></canvas>`;
    activateNavbarLink('liveReports');
    document.querySelector('#otherPages').innerHTML = html;
    document.querySelector('#contentHeader').textContent = 'Live Reports';
    hideAllCoinsBut(null);
    getCoinsValue();
    createChart();
}

let chartDatasets;

function createChart() {
    const chosenCoins = JSON.parse(localStorage.getItem('chosenCoins'));
    if (chosenCoins.length === 0) {
        document.querySelector('#otherPages').innerHTML = `<div class="alert alert-dismissible alert-danger" style="display: block; width: 100%; text-align: center">
        <strong>No coins selected. </strong>Please choose up to 5 coins and come back.
    </div>`
        return;
    }
    var ctx = document.querySelector('#chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: chartDatasets
        },
        options: {}
    });
}

function getCoinsValue() {
    const coins = JSON.parse(localStorage.getItem('chosenCoins'));
    const urlCoins = coins.map(coin => {
        return `${coin.symbol}`;
    }).join(',');
    const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${urlCoins}&tsyms=USD`;
    getData(url, createDataset);
}

function createDataset() {
    const coins = JSON.parse(localStorage.getItem('chosenCoins'));
    const coinsVal = JSON.parse(this.responseText);
    const colors = ["#2C3E50", "#95a5a6", "#18BC9C", "#ffd24c", "#c78100"];
    chartDatasets = coins.map((coin, index) => {
        return {
            label: coin.symbol,
            data: [coinsVal[coin.symbol].USD, coinsVal[coin.symbol].USD, coinsVal[coin.symbol].USD,coinsVal[coin.symbol].USD,coinsVal[coin.symbol].USD,coinsVal[coin.symbol].USD,coinsVal[coin.symbol].USD,],
            fill: false,
            borderColor: colors[index],
            lineTension: 0.1
        }
    });
    // return chartDatasets;
}