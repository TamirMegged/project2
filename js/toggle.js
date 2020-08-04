let beforeModal;
// Toggle the coin to/from localStorage and manage number of coins selected
export default function toggleCoin(e) {
    let chosenCoins = JSON.parse(localStorage.getItem('chosenCoins'));
    const card = e.target.parentElement.parentElement.parentElement;

    let symbol = card.querySelector('.card-header').textContent;
    let id = card.querySelector('.card-title').textContent;
    let chosenCoin = { symbol: symbol, id: id };
    let isChecked = e.target.parentElement.querySelector('input').checked;

    if (!isChecked) {
        if (chosenCoins.length === 5 && e.target.classList.contains('coinToggle')) {
            beforeModal = chosenCoins;
            document.querySelector('#chosenCoins').innerHTML = "";
            chosenCoins.forEach((coin, index) => {
                let html = createChosenCard(coin, index);
                document.querySelector('#chosenCoins').innerHTML += html;
            });
            document.querySelector('#chosenLimit').style.display = "block";
            document.querySelector('#chosenLimit').classList.add('show');
            document.querySelector('body').classList.add('modal-open');
            document.querySelectorAll('.toggleInModal').forEach(input => input.addEventListener('click', toggleCoin));
            document.querySelector('#cancelModal').addEventListener('click', closeModal);
            document.querySelector('#xModal').addEventListener('click', closeModal);
            document.querySelector('#saveChanges').addEventListener('click', saveToggleChanges);
        }
        chosenCoins.push(chosenCoin);
        localStorage.setItem('chosenCoins', (JSON.stringify(chosenCoins)));
    } else {
        let newChosenCoins = [];
        chosenCoins.forEach(coin => {
            if (coin.id !== chosenCoin.id) {
                newChosenCoins.push(coin);
            }
        });
        localStorage.setItem('chosenCoins', (JSON.stringify(newChosenCoins)));
    }

    if (e.target.classList.contains('toggleInModal')) {
        document.querySelector(`#customSwitch${id}`).checked = !isChecked;
    }
}


// Create a card for coins in the modal
function createChosenCard(card, index) {
    return `<div class="card border-primary mb-3">
                <h4 class="card-header">${card.symbol}<p class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="customSwitch${index}" checked=""><label class="custom-control-label toggleInModal" for="customSwitch${index}"></label></p></h4>
                <div class="card-body">
                    <h5 class="card-title toggle-id">${card.id}</h5>
                </div>
            </div>`;
}


function closeModal() {
    let coinToRemove = beforeModal[5].id;
    let newChosenCoins = [];
    document.querySelectorAll('.toggle-id').forEach(card => {
        document.querySelector(`#customSwitch${card.textContent}`).checked = true;
        beforeModal.forEach((coin, index) => {
            if (coin.id === card.textContent && index < 5) {
                newChosenCoins.push(coin);
            }
        });
    });
    localStorage.setItem('chosenCoins', (JSON.stringify(newChosenCoins)));
    document.querySelector('#chosenLimit').style.display = 'none';
    document.querySelector('#chosenLimit').classList.remove('show');
    document.querySelector('body').classList.remove('modal-open');
    document.querySelector(`#customSwitch${coinToRemove}`).checked = false;
}


function saveToggleChanges() {
    let chosenCoins = JSON.parse(localStorage.getItem('chosenCoins'));
    if (chosenCoins.length > 5) {
        document.querySelector('#moreThan5').style.display = 'block';
        setTimeout(() => {
            document.querySelector('#moreThan5').style.display = 'none';
        }, 3000);
        return;
    }
    document.querySelector('#chosenLimit').style.display = 'none';
    document.querySelector('#chosenLimit').classList.remove('show');
    document.querySelector('body').classList.remove('modal-open');
}