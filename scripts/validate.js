const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__value',
  saveButtonSelector: '.popup__save-button',
  inactiveSaveButton: 'popup__save-button_inactive',
  inputError: 'popup__value_type_error',
  inputErrorActive: 'popup__span-error_active',
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(options.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.inputErrorActive);
};

const hideInputError = (formElement, inputElement) => {
  // console.log(`.${inputElement.id}-error`);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(options.inputError);
  errorElement.classList.remove(options.inputErrorActive);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
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
  const buttonElement = formElement.querySelector(options.saveButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList, inputElement) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const disabledButton = (formElement, options) => {
  const buttonElement = formElement.querySelector(options.saveButtonSelector);
  buttonElement.classList.add(options.inactiveSaveButton);
};
const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      disabledButton(formElement, options);
    });

    setEventListeners(formElement);
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(options.inactiveSaveButton);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(options.inactiveSaveButton);
    buttonElement.removeAttribute('disabled');
  }
};

enableValidation(options);
