export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardElement = document.querySelector(cardSelector);
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    // ".card__like-button"
    // console.log(this._cardElement.querySelector(".card__like-button"));
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    // ".card__trash-button"
    this._cardElement
      .querySelector(".card_delete-button")
      .addEventListener("click", () => {
        this.handleDeleteCard();
      });
  }

  _handleLikeIcon() {
    this.cardElement
      .querySelector(".card__like-button")
      .classlist.toggle("card__like-button-active");
  }

  _handleDeleteCard() {
    this.cardElement.remove();
  }

  getView() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    // get the card view
    // set event listners
    this._setEventListeners();
    // return the card
  }
}
