const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupView = document.querySelector('.popup_view');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editCloseButton = document.querySelector('.popup__close-button');
const addCloseButton = popupAdd.querySelector('.popup__close-button');
const viewCloseButton = popupView.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__container');
const popupName = formElement.querySelector('#popup-name');
const popupJob = formElement.querySelector('#popup-job');
const imageName = document.querySelector('#image-name');
const imageLink = document.querySelector('#image-link');
const addForm = document.forms['add-popup'];
const editForm = document.forms['edit-popup'];
const photoView = document.querySelector('.popup__image-view');
const photoViewText = document.querySelector('.popup__view-text');
const galleryCards = document.querySelector('.gallery');
const galleryElement = document.querySelector('.clone-card');
const templateCard = galleryElement.content.querySelector('.card');

const primaryCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('click', closePopupOverlay);
  document.addEventListener('keyup', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function cardPrepend(primaryCard) {
  galleryCards.prepend(primaryCard);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup(popupEdit);
}

primaryCards.forEach((item) => {
  const primaryCard = createCard(item.name, item.link);
  cardPrepend(primaryCard);
});

function additionLike(card) {
  const likeButton = card.querySelector('.card__heart');
  const likeCard = () => {
    likeButton.classList.add('card__heart_active');
  };
  likeButton.addEventListener('click', likeCard);
}

function removalCard(card) {
  const deleteButton = card.querySelector('.card__trash');
  const deleteCard = () => {
    card.remove();
  };
  deleteButton.addEventListener('click', deleteCard);
}

function createCard(title, link) {
  const card = templateCard.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = title;
  card.querySelector('.card__text').textContent = title;

  removalCard(card);

  additionLike(card);

  cardImage.addEventListener('click', () => {
    photoView.src = link;
    photoView.alt = title;
    photoViewText.textContent = title;
    openPopup(popupView);
  });
  return card;
}

const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};

const closePopupOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  cardPrepend(createCard(imageName.value, imageLink.value));
  console.log();
  closePopup(popupAdd);
  addForm.reset();
}

editButton.addEventListener('click', () => {
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  openPopup(popupEdit);
});
addButton.addEventListener('click', () => {
  openPopup(popupAdd);
});
editCloseButton.addEventListener('click', () => {
  closePopup(popupEdit);
});

addCloseButton.addEventListener('click', () => {
  closePopup(popupAdd);
});

viewCloseButton.addEventListener('click', () => {
  closePopup(popupView);
});

editForm.addEventListener('submit', handleProfileFormSubmit);

addForm.addEventListener('submit', handleCardFormSubmit);
