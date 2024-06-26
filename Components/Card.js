export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  /* -------------------------------------------------------------------------- */
  /*                               Event Listeners                              */
  /* -------------------------------------------------------------------------- */

  _setEventListeners() {
    // ".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // ".card__trash-button"
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    //Preview Image modal
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({
          link: this._link,
          name: this._name,
        });
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Handler                                  */
  /* -------------------------------------------------------------------------- */

  _handleLikeIcon() {
    this.cardElement
      .querySelector(".card__like-button")
      .classlist.toggle("card__like-button-active");
  }

  _handleDeleteCard() {
    this.cardElement.remove();
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    //link
    this._cardElement
      .querySelector(".card__image")
      .setAttribute("src", this._link);

    //name
    this._cardElement
      .querySelector(".card__image")
      .setAttribute("alt", this._name);

    //description
    this._cardElement.querySelector(".card__description-text").textContent =
      this._name;

    // set event listners
    this._setEventListeners();
    // return the card
    return this._cardElement;
  }
}
