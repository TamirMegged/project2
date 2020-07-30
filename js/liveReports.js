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


function getCoinsValue(cb) {
    const coins = JSON.parse(localStorage.getItem('chosenCoins'));
    const urlCoins = coins.map(coin => {
        return `${coin.symbol}`;
    }).join(',');
    const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${urlCoins}&tsyms=USD`;
    getData(url, cb);
}

let chart;

function createDataset() {
    const coins = JSON.parse(localStorage.getItem('chosenCoins'));
    const coinsVal = JSON.parse(this.responseText);
    const colors = ["#2C3E50", "#ffd24c",  "#18BC9C", "#95a5a6", "#c78100"];
    let chartDatasets = coins.map((coin, index) => {
        return {
            label: coin.symbol,
            data: [coinsVal[coin.symbol].USD, coinsVal[coin.symbol].USD, coinsVal[coin.symbol].USD, coinsVal[coin.symbol].USD, coinsVal[coin.symbol].USD, coinsVal[coin.symbol].USD, coinsVal[coin.symbol].USD,],
            fill: false,
            borderColor: colors[index],
            lineTension: 0.1
        }
    });
    createChart(chartDatasets);
}


function updateChart() {
    const coins = JSON.parse(localStorage.getItem('chosenCoins'));
    const coinsVal = JSON.parse(this.responseText);
    coins.forEach((coin, index) => {
        chart.data.datasets[index].data.shift();
        chart.data.datasets[index].data.push(coinsVal[coin.symbol].USD);
    });
    chart.data.labels.shift();
    chart.data.labels.push(formatTime(new Date()));
    chart.update();
}


function createChart(chartDatasets) {
    let timeLabels = [formatTime(new Date()), formatTime(new Date()), formatTime(new Date()), formatTime(new Date()), formatTime(new Date()), formatTime(new Date()), formatTime(new Date())];
    const chosenCoins = JSON.parse(localStorage.getItem('chosenCoins'));
    if (chosenCoins.length === 0) {
        document.querySelector('#otherPages').innerHTML = `<div class="alert alert-dismissible alert-danger" style="display: block; width: 100%; text-align: center">
            <strong>No coins selected. </strong>Please choose up to 5 coins and come back.
        </div>`;
        toggleProgressModal('none');
        return;
    }
    var ctx = document.querySelector('#chart').getContext('2d');
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
                    // type: 'time',
                    // time: {
                    //     unit: 'second',
                    //     unitStepSize: 1,
                    //     parser: String,
                    //     displayFormats: {
                    //         second: 'H:mm:ss'
                    //     }
                    // },
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
    toggleProgressModal('none');
    let update = setInterval(() => {
        if (!document.querySelector('#liveReportsLink').parentElement.classList.contains('active')) {
            clearInterval(update);
        }
        getCoinsValue(updateChart);
    }, 2000);
}


function formatTime(date) {
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    h = h.toString().padStart(2, '0');
    m = m.toString().padStart(2, '0');
    s = s.toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}