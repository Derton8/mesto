import '../pages/index.css';
import Card from '../components/card.js';
import FormValidator from '../components/formValidator.js';
import Section from '../components/section.js';
import PopupWithForm from '../components/popupWithForm.js';
import PopupWithImage from '../components/popupWithImage.js';
import UserInfo from '../components/userInfo.js';
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
  jobInput,
  fullScreenImage,
  titleImage
} from '../utils/constants.js';

//Открытие попапа с картинкой
const handleOpenPopup = (name, link) => {
  fullScreenImage.src = link;
  fullScreenImage.alt = name;
  titleImage.textContent = name;
  popupImg.open();
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
        const card = new Card(cardData, '.template', handleOpenPopup);
        const cardElement = card.generateCard();
        defaultCardList.addItem(cardElement);
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
  handleFormSubmit: (formData) => {
    const card = new Card(formData, '.template', handleOpenPopup);
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
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