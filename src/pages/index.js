import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import config from "../utils/config.js";
import initialCards from '../utils/initialCards.js';

import {
  cardListSelector,
  popupAddSelector,
  popupEditSelector,
  popupImgSelector,
  profileNameSelector,
  profileJobSelector,
  btnEdit,
  btnAdd,
  formAdd,
  formEdit,
  nickInput,
  jobInput
} from '../utils/constants.js';

//Открытие попапа с картинкой
const handleOpenPopup = (name, link) => {
  //fullScreenImage.src = link;
  //fullScreenImage.alt = name;
  //titleImage.textContent = name;
  popupImg.open(name, link);
}

const renderCard = (cardData) => {
  const card = new Card(cardData, '.template', handleOpenPopup);
  const cardElement = card.generateCard();
  defaultCardList.addItem(cardElement);
}

//Включение валидации форм
const editProfileValidator = new FormValidator(config, formEdit);
editProfileValidator.enableValidation();
const addCardValidator = new FormValidator(config, formAdd);
addCardValidator.enableValidation();

//Создание экземпляра секции с фотокарточками
const defaultCardList = new Section({
    items: initialCards,
      renderer: (cardData) => {
        renderCard(cardData);
      }
    }, 
    cardListSelector
);

//Добавление начальных карточек
defaultCardList.renderItems();

//Создание попапа с картинкой
const popupImg = new PopupWithImage(popupImgSelector);
popupImg.setEventListeners();

//Создание попапа с формой добавления карточки
const popupAdd = new PopupWithForm(popupAddSelector, {
  handleFormSubmit: (cardData) => {
    renderCard(cardData);
  }
});
popupAdd.setEventListeners();

//Создание попапа с формой редактирования профиля
const userInfo = new UserInfo({profileNameSelector, profileJobSelector});
const popupEdit = new PopupWithForm(popupEditSelector, {
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
  }
});
popupEdit.setEventListeners();

//Открытие попапа для формы добавления карточки
btnAdd.addEventListener('click', () => {
  popupAdd.open();
});

//Открытие попапа для формы редактирования профиля
btnEdit.addEventListener('click', () => {
  popupEdit.open();
  const userData = userInfo.getUserInfo();
  nickInput.value = userData.nick;
  jobInput.value = userData.job;
});