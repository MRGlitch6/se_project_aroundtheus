/* -------------------------------------------------------------------------- */
/*                                  Card List                                 */
/* -------------------------------------------------------------------------- */

import Card from "./Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const newCardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(newCardData, "#card-template");
card.getView();

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

//Modals
const modals = document.querySelectorAll(".modal");

//Profile Edit
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseBtn = profileEditModal.querySelector(
  "#edit-modal-close-button"
);
//Profile Add
const addNewCardBtn = document.querySelector(".profile__add-button");
const profileAddModal = document.querySelector("#profile-add-modal");
const addModalCloseBtn = profileAddModal.querySelector(
  "#add-modal-close-button"
);

//Profile Content
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-edit-title-input");
const profileDesciptionInput = document.querySelector(
  "#profile-edit-description-input"
);

//Preview Image Content
const previewImageModal = document.querySelector("#preview__modal");
const previewImage = document.querySelector(".modal__preview-image");
const previewImageTitle = document.querySelector(".modal__preview-title");
const previewImageModalClose = document.querySelector(
  "#preview-modal-close-button"
);

//Card Content
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//Add new card
const addCardFormElement = profileAddModal.querySelector(".modal__form");
const cardTitleInput = addCardFormElement.querySelector(".modal__input_title");
const cardUrlInput = addCardFormElement.querySelector(
  ".modal__input_description"
);

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

//Open/Close Modal(s)
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", escapeCloseModal);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", escapeCloseModal);
}

//Get Card
function getCardElement(cardData) {
  //Card Content
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__description-text");

  //Like btn
  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button-active");
  });

  //Trash btn
  const trashBtn = cardElement.querySelector(".card__trash-button");
  trashBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  //Get Card Content
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  //Image modal
  cardImageEl.addEventListener("click", function () {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewImageTitle.textContent = cardData.name;
    openModal(previewImageModal);
  });

  return cardElement;
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

//Render Cards
function renderCard(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

//Close profile modal
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDesciptionInput.value;
  closeModal(profileEditModal);
}

//Close add card modal
function handleProfileAddSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(profileAddModal);
  addCardFormElement.reset();
}

function escapeCloseModal(e) {
  if (e.key === "Escape") {
    const popupOpened = document.querySelector(".modal_opened");
    closeModal(popupOpened);
  }
};

const handleLikeIcon = (evt) => {
  evt.target.classlist.toggle(card__like-button-active);

};

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//Open edit modal
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileName.textContent;
  profileDesciptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

//Submit Listeners
profileEditModal.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleProfileAddSubmit);

//Add card Listener
addNewCardBtn.addEventListener("click", () => openModal(profileAddModal));

//Render content for each card
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

//Close modal by clicking off
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
    if (e.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
});
