console.log("Hello Guys");
let cardDivs = [];
const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "teal",
];
class CardDiv extends HTMLDivElement {
  static attempts = 0;
  static combosFound = 0;
  constructor() {
    super(); // Call the parent constructor
    // Add custom behavior or properties if needed
    this.addEventListener("click", () => {
      this.classList.toggle("color-hidden");
      this.style.pointerEvents = "none";
      setTimeout(() => {
        this.processCardDivs();
      }, 500);
    });
  }
  hideCard() {
    this.classList.add("color-hidden");
  }

  processCardDivs() {
    let prevCardDiv = cardDivs[cardDivs.length - 1];

    if (cardDivs.length % 2) {
      let previousDivCol = prevCardDiv.getAttribute("data-color");
      let currentDivCol = this.getAttribute("data-color");
      if (previousDivCol === currentDivCol) {
        console.log("Matched");
        cardDivs.push(this);
        prevCardDiv.style.pointerEvents = "none";
        this.style.pointerEvents = "none";
        CardDiv.increaseAttempts();
        CardDiv.increaseCombosFound();
      } else {
        prevCardDiv.hideCard();
        this.hideCard();
        prevCardDiv.style.pointerEvents = "auto";
        this.style.pointerEvents = "auto";
        cardDivs.pop();
        CardDiv.increaseAttempts();
      }
    } else {
      this.style.pointerEvents = "none";
      cardDivs.push(this);
    }
  }

  static increaseAttempts() {
    this.attempts++;
    document.getElementById("attempts").innerHTML = this.attempts;
  }

  static resetAttempts() {
    this.attempts = 0;
    document.getElementById("attempts").innerHTML = this.attempts;
  }

  static increaseCombosFound() {
    this.combosFound++;
    if (this.combosFound === 8) {
      this.combosFound = 0;
      this.resetAttempts();
      this.removeColorClasses();
      this.hideAllCards();
      alert("You Win!");
      addColorToAllCards();
      cardDivs = [];
    }
  }

  static removeColorClasses() {
    cardDivs.forEach((div) => {
      const classList = div.classList;
      div.classList.remove(classList.item(classList.length - 1));
    });
  }
  static hideAllCards() {
    cardDivs.forEach((div) => {
      div.hideCard();
      div.style.pointerEvents = "auto";
    });
  }
}

// Register the new custom element
customElements.define("card-div", CardDiv, { extends: "div" });

const addColorToAllCards = () => {
  let cards = [...document.querySelectorAll(".card")];
  const addColortoCard = (color) => {
    const cardIndex = Math.floor(Math.random() * cards.length);
    const card = cards[cardIndex];
    cards.splice(cardIndex, 1);
    card.classList.add(color);
    card.setAttribute("data-color", color);
  };
  colors.forEach((color) => {
    addColortoCard(color);
    addColortoCard(color);
  });
};
addColorToAllCards();
