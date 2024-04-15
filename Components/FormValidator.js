export default class FormValidator {
  constructor(settings, formEl) {
    this._formElement = formEl;

    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }
}

_showInputError(inputEl) {
  this._errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  this._errorMessageEl.textContent = inputEl.validationMessage;
  this._errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  this._errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = " ";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }

  hideInputError(formEl, inputEl, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

//disable btn
function disableBtn(inputEls, submitBtn, { inactiveButtonClass }) {
  submitBtn.classList.add(inactiveButtonClass);
  submitBtn.disabled = true;
}
//enable btn
function enableBtn(inputEls, submitBtn, { inactiveButtonClass }) {
  console.log(inactiveButtonClass);
  submitBtn.classList.remove(inactiveButtonClass);
  submitBtn.disabled = false;
}

//toggle btn
function toggleButtonState(inputEls, submitBtn, { inactiveButtonClass }) {
  let foundInvalid = false;
  inputEls.forEach((inputEl) => {
    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }
  });

  if (hasInvalidInput(inputEls)) {
    disableBtn(inputEls, submitBtn, { inactiveButtonClass });
    return;
  }

  // submitBtn.classList.remove(inactiveButtonClass);
  // submitBtn.enableBtn = true;
  // submitBtn.disabled = false;
  enableBtn(inputEls, submitBtn, { inactiveButtonClass });
}

function setEventListeners(formEl, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitBtn = formEl.querySelector(submitButtonSelector);

  toggleButtonState(inputEls, submitBtn, options);
  // toggleButtonState();

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitBtn, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

enableValidation();
