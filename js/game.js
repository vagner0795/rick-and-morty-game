const grid = document.querySelector(".grid"); // acessar a div grid
const namePlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");

// array com o nome dos personagens
const characters = [
  "beth",
  "jerry",
  "jessica",
  "pessoa-passaro",
  "pickle-rick",
  "rick",
  "summer",
  "meeseeks",
  "scroopy",
  "morty",
];

// função que cria um elemento Html e adiciona uma class ao elemento
const createElement = (tag, className) => {
  const element = document.createElement(tag);

  element.className = className;

  return element;
};

// variaveis que armazena os valores dos cards
let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(
      `Parabéns, ${namePlayer.innerHTML} Você ganhou!! seu tempo foi: ${timer.innerHTML}`
    );
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

//função que revela a carta mostrando o personagem da frente
const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

// função que cria o card de personagem, chamando a função criar elemento, adicionando a imagem no front(frente de card) e acessando função que revela a carta
const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage =
    `url('../images/${character}.png')` || `url('../images/${character}.jpg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);

  return card;
};

// função que carrega o jogo, duplicando os arrays, deixando a posição aleatória e adicionando os cards ao grid
const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  namePlayer.innerHTML = localStorage.getItem("player");
  startTimer();
  loadGame();
};
