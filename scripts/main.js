let el = document.getElementById('section-top');
let drpdwn_menu = document.getElementById('exampleFormControlSelect1');


const API_URL = "https://dry-cliffs-94979.herokuapp.com/"

const cardsContainer = document.querySelector(".card-container");
let data = [];


//render card
async function fetchCards() {
  const r = await fetch(API_URL);
  return await r.json();
}

function renderCards(cards) {
  cardsContainer.innerHTML = "";
  cards.map(renderCard);

}

function renderCard(card) {
  const div = document.createElement("div");
  div.style.width = "20rem";
  div.style.margin = "2rem";
  div.className = "card";
  div.innerHTML = `
<div class="card">
    <img src="${card.photo}" class="card-img-top" alt="${card.name}"/>
    <div class="card-body">
        <p id="tipo-prop" class="card-text badge badge-info">${card.property_type}</p>
        <h5 id="nome-prop" class="card-title">${card.name}</h5>
        <p id="valor" class="card-text">Valor da diária: R$${card.price},00</p>
        <button type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#exampleModal" >
            <i class="fas fa-plus"></i>               
        </button>
    </div>
</div>

`;
  cardsContainer.appendChild(div);
}

function scrollWin() {
  el.style.backgroundColor = 'rgba(0,0,0,0.25)';
}

async function clickBtn() {
  console.log(drpdwn_menu.value);
  data = await fetchCards();
  if (data) {
    cardsContainer.innerHTML = "";
    filteredArray = data.map(item => item)
      .filter((item) => item.property_type === drpdwn_menu.value);
    console.log(filteredArray);
    if (filteredArray.length > 0) {
      filteredArray.map(renderCard);
    }
    else {
      main()
    }
  }
}


async function main() {
  data = await fetchCards();
  if (data) {
    renderCards(data);
  }
}

async function getUniqueProperty() {
  let filteredArray = [];
  data = await fetchCards()
  filteredArray = data.map(item => item.property_type)
    .filter((value, index, self) => self.indexOf(value) === index);
  console.log(filteredArray);
  for (i = 0; i < filteredArray.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `
    <option value="${filteredArray[i]}">${filteredArray[i]}</option>

`;
    drpdwn_menu.appendChild(option);
  }
}


main();
getUniqueProperty();

