const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closePopupButton = popup.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__container');
const popupName = formElement.querySelector('#popup-name');
const popupJob = formElement.querySelector('#popup-job');

function openPopup() {
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
