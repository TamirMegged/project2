import {activateNavbarLink} from './main.js';
import { hideAllCoinsBut } from './searchCoin.js';

export default function goToAbout(event) {
    event.preventDefault();
    let html = `<div class="jumbotron">
                    <h1 class="display-3">About</h1>
                    <p class="lead">My name is Tamir Megged, let me tell you some things about this project.</p>
                    <hr class="my-4">
                    <p>In this project you can see a client side application that contains some different API calls.<br>
                        You will find in the app information about all coins, including: coin's name, code, image, value compared to USD, EUR and ILS, and live reports for value changes.<br>
                        I used HTML5, JavaScript and CSS, while the app is written as an SPA (Single Page application).<br>
                        <b>Links to project's code:</b><br>
                        <a href="https://github.com/TamirMegged/project2.git">Git</a><br>
                        <a href="#">Glitch</a>
                    </p>
                </div>`;
    activateNavbarLink('about');
    document.querySelector('#otherPages').innerHTML = html;
    document.querySelector('#contentHeader').textContent = '';
    hideAllCoinsBut(null);
}