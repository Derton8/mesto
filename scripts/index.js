import Card from './card.js';
import FormValidator from './formValidator.js';
import config from "./config.js";
import initialCards from './initialCards.js';

const POPUP_OPENED_CLASS = 'popup_opened';

//Попапы
const popupEdit = document.querySelector('.popup-edit-card');
const popupAdd = document.querySelector('.popup-add-card');
const popupImg = document.querySelector('.popup-image');
const popups = document.querySelectorAll('.popup');

//Кнопки
const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button');
const btnsClose = document.querySelectorAll('.popup__close-btn');

//Форма редактирования профиля
const formEdit = document.forms.editForm;
const nickInput = editForm.nick;
const jobInput = editForm.job;

//Форма добавления карточки
const formAdd = document.forms.addForm;
const nameInput = formAdd.name;
const linkInput = formAdd.link;

//Элементы профиля
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

//Элементы фото-карточки
const photosContainer = document.querySelector('.photo-grid');
const fullScreenImage = document.querySelector('.popup__img');
const titleImage = document.querySelector('.popup__title');

const openPopup = (popup) => {
  popup.classList.add(POPUP_OPENED_CLASS);
  document.addEventListener('keydown', handleEscapeClosePopup);
}

const closePopup = (popup) => {
  popup.classList.remove(POPUP_OPENED_CLASS);
  document.removeEventListener('keydown', handleEscapeClosePopup);
}

//Функция отправки данных формы
const handleProfileFormSubmit = () => {
  profileName.textContent = nickInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}
formEdit.addEventListener('submit', handleProfileFormSubmit);

//Функция создания карточки
const createCard = (cardData) => {
  const card = new Card(cardData, '.template');
  const cardElement = card.generateCard();
  photosContainer.prepend(cardElement);

  //Открытие попапа с картинкой
  const cardImage = cardElement.querySelector('.photo-grid__img');
  cardImage.addEventListener('click', (evt) => {
    const image = evt.target;
    fullScreenImage.src = image.src;
    fullScreenImage.alt = image.alt;
    titleImage.textContent = image.alt;
    openPopup(popupImg);
  });
}

//Добавление начальных карточек
initialCards.forEach(cardData => {
  createCard(cardData);
});

//Добавлениe новых карточек
const handleCardFormSubmit = (evt) => {
  const cardData = {name: nameInput.value, link: linkInput.value};
  createCard(cardData);
  closePopup(popupAdd);
  evt.target.reset();
}
formAdd.addEventListener('submit', handleCardFormSubmit)

//Открытие попапа для формы редактирования профиля
btnEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  nickInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

//Открытие попапа для формы добавления карточки
btnAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

//Закрытие попапа кликом по кнопке
btnsClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//Закрытие попапа кликом по оверлею
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains(POPUP_OPENED_CLASS)){
      closePopup(evt.target);
    }
  });
});

//Обработчик закрытия попапа клавишей Esc
const handleEscapeClosePopup = (evt) => {
  const key = evt.key;
  if(key === 'Escape') {
    const openedPopup = document.querySelector('.'+POPUP_OPENED_CLASS);
    closePopup(openedPopup);
  }
};

//Включение валидации форм
const editProfileValidator = new FormValidator(config, formEdit);
editProfileValidator.enableValidation();
const addCardValidator = new FormValidator(config, formAdd);
addCardValidator.enableValidation();
