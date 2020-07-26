import { activateNavbarLink } from './main.js';
import { hideAllCoinsBut } from './searchCoin.js';
// import Chartjs from 'https://cdnjs.com/libraries/Chart.js';

//About screen - go to about (a id="aboutLink")
export default function goToLiveReports(event) {
    event.preventDefault();
    let html = `<canvas id=chart" width="400" height="400"></canvas>`;
    activateNavbarLink('liveReports');
    document.querySelector('#otherPages').innerHTML = html;
    document.querySelector('#contentHeader').textContent = 'Live Reports';
    hideAllCoinsBut(null);
}

// function createChart() {
//     var ctx = document.querySelector('#chart').getContext('2d');
//     var myChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//             datasets: [{
//                 label: '# of Votes',
//                 data: [12, 19, 3, 5, 2, 3],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true
//                     }
//                 }]
//             }
//         }
//     });
// }