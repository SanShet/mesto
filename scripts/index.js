const overlayEl = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const closePopupButton = overlayEl.querySelector(".popup__close-button");
const saveButton = overlayEl.querySelector(".popup__save-button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

const formElement = document.querySelector(".popup__container");
const popupName = formElement.querySelector("#popup-name");
const popupJob = formElement.querySelector("#popup-job");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup(overlayEl);
}

editButton.addEventListener("click", () => {
  openPopup(overlayEl);
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
});

closePopupButton.addEventListener("click", () => {
  closePopup(overlayEl);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
