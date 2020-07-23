export default function toggleCoin(e) {
    let chosenCoins = JSON.parse(localStorage.getItem('chosenCoins'));
    const card = e.target.parentElement.parentElement.parentElement;
    
    let coinSymbol = card.querySelector('.card-header').textContent;
    let coinId = card.querySelector('.card-title').textContent;
    let chosenCoin = { coinSymbol: coinSymbol, coinId: coinId };

    if (!e.target.parentElement.querySelector('input').checked) {
        if (chosenCoins.length === 5 && e.target.classList.contains('coinToggle')) {
            document.querySelector('#chosenCoins').innerHTML = "";
            chosenCoins.forEach((coin, index) => {
                let html = createChosenCard(coin, index);
                document.querySelector('#chosenCoins').innerHTML += html;
            });
            document.querySelector('#chosenLimit').style.display = "block";
            document.querySelectorAll('.toggleInModal').forEach(input => input.addEventListener('click', toggleCoin));
        }
        chosenCoins.push(chosenCoin);
        localStorage.setItem('chosenCoins', (JSON.stringify(chosenCoins)));
    } else {
        let newChosenCoins = [];
        chosenCoins.forEach(coin => {
            if (coin.coinId !== chosenCoin.coinId) {
                newChosenCoins.push(coin);
            }
        });
        localStorage.setItem('chosenCoins', (JSON.stringify(newChosenCoins)));
    }
}


function createChosenCard(card, index) {
    return `<div class="card border-primary mb-3">
                <h4 class="card-header">${card.coinSymbol}<p class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="customSwitch${index}" checked=""><label class="custom-control-label toggleInModal" for="customSwitch${index}"></label></p></h4>
                <div class="card-body">
                    <h5 class="card-title">${card.coinId}</h5>
                </div>
            </div>`;
}