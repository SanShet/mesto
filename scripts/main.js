const overlayEl = document.querySelector(".popup");
const openPopupButton = document.querySelector(".profile-info__edit-button");
const closePopupButton = overlayEl.querySelector(".popup__close-button");
const saveButton = overlayEl.querySelector(".popup__save-button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

const formElement = document.querySelector(".popup__container");
const popupName = formElement.querySelector("#popup__name");
const popupJob = formElement.querySelector("#popup-job");

const toggleOverlay = () => {
  overlayEl.classList.toggle("popup_opened");
};

openPopupButton.addEventListener("click", () => {
  toggleOverlay();
});

closePopupButton.addEventListener("click", () => {
  toggleOverlay();
});

saveButton.addEventListener("click", () => {
  toggleOverlay();
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
