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
    // this._cardElement
    //   .querySelector(".card__like-button")
      this.likeBtn.addEventListener("click", () => {
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
        //check screen width
        const screenWidth = window.innerWidth;
        if (screenWidth <= 480) {
          console.log("hey");
          const previewImage = this._cardElement.querySelector(".card__image");
          if (previewImage) {
            console.log("Preview image found:", previewImage);
            previewImage.style.width = "240px";
            previewImage.style.height = "299px";
          }
        }

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
    // this._cardElement
    //   .querySelector(".card__like-button")
      this.likeBtn.classList.toggle("card__like-button-active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
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
    this._cardElement.querySelector(".card__image").src = this._link;
    // .setAttribute("src", this._link);

    //name
    this._cardElement.querySelector(".card__image").alt = this._name;
    // .setAttribute("alt", this._name);

    //description
    this._cardElement.querySelector(".card__description-text").textContent =
      this._name;

    //like button
    this.likeBtn = this._cardElement.querySelector(".card__like-button");

    // set event listners
    this._setEventListeners();
    // return the card
    return this._cardElement;
  }
}
