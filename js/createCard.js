//Create a coin card
export default function createCard(coin) {
    return `<div class="card border-primary mb-3 coinCard" id="${coin.id}">
                <h4 class="card-header">${coin.symbol.toUpperCase()}<p class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="customSwitch${coin.id}"><label class="custom-control-label coinToggle" for="customSwitch${coin.id}"></label></p></h4>
                <div class="card-body">
                    <h5 class="card-title">${coin.id}</h5>
                    <button class="btn btn-info moreInfo" type="button" data-toggle="collapse" data-target="#collapse${coin.id}" aria-expanded="false" aria-controls="collapseExample">
                    More Info
                    </button>
                    <div class="collapse" id="collapse${coin.id}">
                        <div class="card card-body" id="info${coin.id}"></div>    
                    </div>
                </div>
            </div>`;
}