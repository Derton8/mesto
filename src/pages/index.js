import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
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
  apiConfig
} from '../utils/constants.js';

const api = new Api(apiConfig);

//Загрузка информации о пользователе с сервера
api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({nick: data.name, job: data.about});
  })
  .catch((err) => {
    console.log(err);
  });

//Загрузка карточек с сервера
api.getCardsList()
  .then((cards) => {
    cards.map((card) => {
      defaultCardList.addItem(renderCard({name: card.name, link: card.link}));
    })
  })
  .catch((err) => {
    console.log(err);
  });

//Открытие попапа с картинкой
const handleOpenPopup = (name, link) => {
  popupImg.open(name, link);
}

const renderCard = (cardData) => {
  const card = new Card(cardData, '.template', handleOpenPopup);
  const cardElement = card.generateCard();
  return cardElement;
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
        defaultCardList.addItem(renderCard(cardData));
      }
    }, 
    cardListSelector
);

//Создание попапа с картинкой
const popupImg = new PopupWithImage(popupImgSelector);
popupImg.setEventListeners();

//Создание попапа с формой добавления карточки
const popupAdd = new PopupWithForm(popupAddSelector, {
  handleFormSubmit: (cardData) => {
    api.addNewCard(cardData)
      .then((data) => {
        defaultCardList.addItem(renderCard({name: data.name, link: data.link}));
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
popupAdd.setEventListeners();

//Создание попапа с формой редактирования профиля
const userInfo = new UserInfo({profileNameSelector, profileJobSelector});
const popupEdit = new PopupWithForm(popupEditSelector, {
  handleFormSubmit: (formData) => {
    api.setUserInfo(formData)
      .then((data) => {
        userInfo.setUserInfo({name: data.name, link: data.link});
      })
      .catch((err) => {
        console.log(err);
      });
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