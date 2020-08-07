import { activateNavbarLink, toggleProgressModal } from './main.js';
import { hideAllCoinsBut } from './searchCoin.js';
import getData from './ajaxService.js';


//Live Reports screen - go to Live Reports (a id="liveReportsLink")
export default function goToLiveReports(event) {
    event.preventDefault();
    toggleProgressModal('block');
    let html = `<canvas id="chart" width="1200vw" height="600vh" style="margin: 0 auto"></canvas>`;
    activateNavbarLink('liveReports');
    document.querySelector('#otherPages').innerHTML = html;
    document.querySelector('#contentHeader').textContent = 'Live Reports';
    hideAllCoinsBut(null);
    getCoinsValue(createDataset);
}


// Get coins current value in USD
function getCoinsValue(cb) {
    const coins = JSON.parse(localStorage.getItem('chosenCoins'));
    const urlCoins = coins.map(coin => {
        return `${coin.symbol}`;
    }).join(',');
    const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${urlCoins}&tsyms=USD`;
    getData(url, cb);
}

// Create dataset for chart containing coins current value
let chart;
function createDataset() {
    const coins = JSON.parse(localStorage.getItem('chosenCoins'));
    const coinsVal = JSON.parse(this.responseText);
    let noLive = [];
    let coinVal;
    const colors = ["#2C3E50", "#ffd24c", "#18BC9C", "#95a5a6", "#c78100"];
    let chartDatasets = coins.map((coin, index) => {
        if (!coinsVal[coin.symbol]) {
            coinVal = undefined;
            noLive.push(coin.symbol);
        } else {
            coinVal = coinsVal[coin.symbol].USD;
        }
        return {
            label: coin.symbol,
            data: [coinVal],
            fill: false,
            backgroundColor: colors[index],
            borderColor: colors[index],
            lineTension: 0.1
        }
    });
    switch (noLive.length) {
        case 0:
            break;
        case 1:
            document.querySelector('#contentHeader').innerHTML += `<h5>Coin: <b>${noLive.join(', ')}</b> is not active and therefore has no live reports</h5>`;
            break;
        default:
            document.querySelector('#contentHeader').innerHTML += `<h5>Coins: <b>${noLive.join(', ')}</b> are not active and therefore have no live reports</h5>`
    }
    createChart(chartDatasets);
}


function updateChart() {
    const coins = JSON.parse(localStorage.getItem('chosenCoins'));
    const coinsVal = JSON.parse(this.responseText);
    let coinVal;
    chart.data.datasets.forEach((dataset, index) => {
        if (!coinsVal[coins[index].symbol]) {
            coinVal = undefined;
        } else {
            coinVal = coinsVal[coins[index].symbol].USD;
        }
        if (dataset.data.length > 6) {
            dataset.data.shift();
        }
        dataset.data.push(coinVal);
    });
    if (chart.data.labels.length > 6) {
        chart.data.labels.shift();
    }
    chart.data.labels.push(newTime());
    chart.update();
}


// Create chart using cahrtjs
function createChart(chartDatasets) {
    let timeLabels = [newTime()];
    const chosenCoins = JSON.parse(localStorage.getItem('chosenCoins'));
    if (chosenCoins.length === 0) {
        document.querySelector('#otherPages').innerHTML = `<div class="alert alert-dismissible alert-danger" style="display: block; width: 100%; text-align: center">
            <strong>No coins selected. </strong>Please choose up to 5 coins and come back.
        </div>`;
        toggleProgressModal('none');
        return;
    }
    let ctx = document.querySelector('#chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: chartDatasets
        },
        options: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'index',
                intersect: false
            },
            animation: {
                duration: 0
            },
            responsive: false,
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time',
                        fontSize: 20
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value) {
                            return value + '$';
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value in USD',
                        fontSize: 20
                    }
                }]
            }
        }
    });
    document.querySelector('#contentHeader').innerHTML += "<h6>Click on coin's code to hide or show it's value.</h6"
    toggleProgressModal('none');
    let update = setInterval(() => {
        if (!document.querySelector('#liveReportsLink').parentElement.classList.contains('active')) {
            clearInterval(update);
        }
        getCoinsValue(updateChart);
    }, 2000);
}


// Format time using momentjs
function newTime() {
    return moment().format('HH:mm:ss');
}