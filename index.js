// 1. Я не нашел проблемы в работе дебоунс. Какой бы длинны текст я не вводил - всё отрабатывает нормально. Десять раз всё проверил. Увеличил задержку с 300 до 700мс.
// 2. Изменил
// 3. Поменял на insertAdjacentHTML
// 4. Заменил keyup на input

const searchRep = document.querySelector(".search");
const list = document.querySelector(".list");
const listItems = document.querySelectorAll("li");
const cardsBlock = document.querySelector(".cards-block");
let resultArr = [];

function checkLength(word) {
  if (word.length > 15) {
    return `${word.slice(0, 15)}...`;
  } else {
    return word;
  }
}

function showOptions() {
  list.classList.add("show-display");
}

function hideOptions() {
  list.classList.remove("show-display");
}

function closeCard(selector) {
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains(selector)) {
      e.target.parentElement.remove();
    }
  });
}

function getPost() {
  if (searchRep.value) {
    return fetch(
      `https://api.github.com/search/repositories?q=${searchRep.value}`
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => search(result))
      .catch((error) => {
        console.log(error);
      });
  } else {
    hideOptions();
  }
}

function debounce(fn, ms) {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
}

function search(RequestResult) {
  resultArr = RequestResult.items.slice(0, 5);

  let arrName = resultArr.map((item) => item.name);
  for (let i = 0; i < arrName.length; i++) {
    listItems[i].textContent = arrName[i];
    listItems[i].setAttribute("id", `${resultArr[i].id}`);
  }
  showOptions();
}

function makeCard() {
  listItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      let itemId = e.target.getAttribute("id");
      let card = {
        name: "",
        owner: "",
        stars: "",
      };

      resultArr.forEach((item) => {
        if (item.id == itemId) {
          card.name = checkLength(item.name);
          card.owner = checkLength(item.owner.login);
          card.stars = checkLength(item.stargazers_count);
        }
      });

      cardsBlock.insertAdjacentHTML(
        "afterbegin",
        `<div class="card">
          <div class="card__info">
            <span class="card__info__item name">Name: ${card.name}</span>
            <span class="card__info__item owner">Owner: ${card.owner}</span>
            <span class="card__info__item stars">Stars: ${card.stars}</span>
          </div>
          <button class="card__close"></button>
        </div>`
      );
      searchRep.value = "";
      list.classList.remove("show-display");
    });
  });
}

searchRep.addEventListener("input", debounce(getPost, 700));
makeCard();
closeCard("card__close");
