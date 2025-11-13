const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "modal__btn_error",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error"
}

const showInputError = (inputElement, formElement, errorMessage, settings) => {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessageElement.textContent = errorMessage;
  inputElement.classList.add(settings.inputErrorClass);
};

const hideInputError = (inputElement, formElement, settings) => {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessageElement.textContent = "";
  inputElement.classList.remove(settings.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, formElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(inputElement, formElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
if (hasInvalidInput(inputList)) {
  disableButton(buttonElement, settings);
} else {
  buttonElement.disabled = false;
  buttonElement.classList.remove(settings.inactiveButtonClass);
}
};

const disableButton = (buttonElement, settings) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(settings.inactiveButtonClass);
};

const resetValidation = (formElement, inputList, settings) => {
  inputList.forEach((inputElement) => {
    hideInputError(inputElement, formElement, settings);
  });
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formElement) => {
  setEventListeners(formElement, settings);
  });
};

enableValidation(settings);