/* -------------------------------------------------------------------------- */
/*                                  Card List                                 */
/* -------------------------------------------------------------------------- */

import Card from "../Components/Card.js";

import FormValidator from "../Components/FormValidator.js";

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

//set settings for FormValidation
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//validate profile
const profileFormValidator = new FormValidator(
  settings,
  profileEditModal.querySelector(".modal__form")
);
profileFormValidator.enableValidation();

const addCardValidator = new FormValidator(settings, addCardFormElement);
addCardValidator.enableValidation();

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
/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleImageClick({ link, name }) {
  previewImage.src = link;
  previewImage.alt = name;
  previewImageTitle.textContent = name;
  openModal(previewImageModal);
}

function renderCard(cardElement) {
  cardListEl.prepend(cardElement);
}

//Render Cards
function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleImageClick);
  return cardElement.getView();
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
  renderCard(createCard({ name, link }));
  closeModal(profileAddModal);
  addCardFormElement.reset();
}

function escapeCloseModal(e) {
  if (e.key === "Escape") {
    const popupOpened = document.querySelector(".modal_opened");
    closeModal(popupOpened);
  }
}

const handleLikeIcon = (evt) => {
  evt.target.classlist.toggle(card__like - button - active);
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
initialCards.forEach((cardData) => renderCard(createCard(cardData)));

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
