const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__value',
  buttonSaveSelector: '.popup__save-button',
  buttonSaveInactive: 'popup__save-button_inactive',
  inputErrorType: 'popup__value_type_error',
  inputErrorActive: 'popup__span-error_active',
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(options.inputErrorType);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.inputErrorActive);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorType);
  errorElement.classList.remove(options.inputErrorActive);
  errorElement.textContent = '';
};

const checkValidation = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.buttonSaveSelector);

  switchButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkValidation(formElement, inputElement);
      switchButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList, inputElement) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const disableButton = (formElement, options) => {
  const buttonElement = formElement.querySelector(options.buttonSaveSelector);
  buttonElement.classList.add(options.buttonSaveInactive);
};
const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      disableButton(formElement, options);
    });

    setEventListeners(formElement);
  });
};

const switchButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(options.buttonSaveInactive);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(options.buttonSaveInactive);
    buttonElement.removeAttribute('disabled');
  }
};

enableValidation(options);
