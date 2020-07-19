export default function createCard(coin, i) {
    return `<div class="card border-primary mb-3" id=${coin.id} style="width: 22rem; height: 18rem; margin: 10px;">
    <h4 class="card-header">${coin.symbol.toUpperCase()}<p style="display: inline; position: absolute; right: 0;"
    class="custom-control custom-switch">
    <input type="checkbox" class="custom-control-input" id="customSwitch${i}">
    <label class="custom-control-label" for="customSwitch${i}"></label>
    </p>
    </h4>
    <div class="card-body">
    <h5 class="card-title">${coin.id}</h5>
    <button class="btn btn-info moreInfo" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="false" aria-controls="collapseExample">
    More Info
    </button>
    <div class="collapse" id="collapse${i}">
    <div class="card card-body" id="info${coin.symbol}">
    </div>
    </div>
    </div>
    </div>`
}
