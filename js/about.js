import { activateNavbarLink } from './main.js';
import { hideAllCoinsBut } from './searchCoin.js';

//About screen - go to about (a id="aboutLink")
export default function goToAbout(event) {
    event.preventDefault();
    let html = `<div class="jumbotron">
                    <h1 class="display-3">About</h1>
                    <p class="lead">My name is Tamir Megged, let me tell you some things about this project.</p>
                    <img src="../images/worldDigitalCoin.png" width="150px" style="position: absolute; right: 50px; top: 50px">
                    <hr class="my-4">
                    <p>In this project you can see a client side application that contains some different API calls.<br>
                        Here, you will find information about all digital coins, including: coin's name, code, image, value compared to USD, EUR and ILS, and live reports for value changes.<br>
                        I used HTML5, JavaScript and CSS, while the app is written as an SPA (Single Page application).<br>
                        <b>Links to project's code:</b><br>
                        <a href="https://github.com/TamirMegged/project2.git">GitHub</a><br>
                        <a href="https://codesandbox.io/s/project2-8mio7">CodeSandbox</a><br>
                        <a href="https://glitch.com/edit/#!/tamir-megged-project2?path=js%2FajaxService.js%3A1%3A0">Glitch</a>
                    </p>
                </div>`;
    activateNavbarLink('about');
    document.querySelector('#otherPages').innerHTML = html;
    document.querySelector('#contentHeader').textContent = '';
    hideAllCoinsBut(null);
}