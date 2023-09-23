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

// Elements
const profileEditBtn = document.querySelector("#profile-edit-button");
const addNewCard = document.querySelector(".profile__add-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const profileModalCloseBtn = profileEditModal.querySelector(
  "#modal-close-button"
);
const addModalCloseBtn = profileAddModal.querySelector("#modal-close-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDesciptionInput = document.querySelector(
  "#profile-description-input"
);

//Add new card
const addCardFormElement = profileAddModal.querySelector(".modal__form");
const cardTitleInput = addCardFormElement.querySelector(".modal__title");
const cardUrlInput = addCardFormElement.querySelector(".modal__description");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Functions
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

//like butttons
// const likeBtns = document.querySelectorAll(".card__like-button");
// likeBtns.forEach((likeBtn) => {
//   likeBtn.addEventListener("click", () => {
//     likeBtn.classList.toggle("card__like-button-active");
//   });
// });

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardDescriptionTextEl = cardElement.querySelector(
    ".card__description-text"
  );
  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button-active");
  });

  //trash btn
  //find delete button
  //add event lsitener to the delete button.
  // cardElement.remove();

  //image modal
  //add click listener to the cardImage element
  cardImageEl.addEventListener("click", () => openModal(previewImageModal));
  //openModal with previewImageModal
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardDescriptionTextEl.textContent = cardData.name;
  return cardElement;
}

// Event Handlers

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDesciptionInput.value;
  closeModal(profileEditModal);
}

function handleProfileAddSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(profileAddModal);
}

function renderCard(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement); // append or prepend
}

// Event Listeners
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileName.textContent;
  profileDesciptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileModalCloseBtn.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileEditModal.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleProfileAddSubmit);
addNewCard.addEventListener("click", () => openModal(profileAddModal));
addModalCloseBtn.addEventListener("click", () => closeModal(profileAddModal));

// render cards
// initialCards.forEach((cardData) => {
//   const cardElement = getCardElement(cardData);
//   cardListEl.append(cardElement); // prepend later
// });
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// //like butttons
// const likeBtns = document.querySelectorAll(".card__like-button");
// likeBtns.forEach((likeBtn) => {
//   likeBtn.addEventListener("click", () => {
//     likeBtn.classList.toggle("card__like-button-active");
//   });
// });
