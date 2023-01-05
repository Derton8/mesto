import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import config from "../utils/config.js";

import {
  cardListSelector,
  popupAddSelector,
  popupEditSelector,
  popupImgSelector,
  popupConfirmSelector,
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

let user;
const api = new Api(apiConfig);

//Загрузка информации о пользователе с сервера
api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({nick: data.name, job: data.about});
    user = data;
  })
  .catch((err) => {
    console.log(err);
  });

const renderCard = (cardData) => {
  const card = new Card(
    cardData, 
    '.template',
    user, 
    handleOpenPopup,
    (card) => {
      popupConfirm.open(
        () => {
          api.deleteCard(cardData._id)
          .then((data) => {
            card.remove();
            card = null;
          })
          .catch((err) => {
            console.log(err);
          })
        } 
      );
    }
    );
  const cardElement = card.generateCard();
  return cardElement;
}

//Включение валидации форм
const editProfileValidator = new FormValidator(config, formEdit);
editProfileValidator.enableValidation();
const addCardValidator = new FormValidator(config, formAdd);
addCardValidator.enableValidation();

//Загрузка карточек с сервера
api.getCardsList()
  .then((cards) => {
    cards.reverse().map((card) => {
      defaultCardList.addItem(renderCard(card));
    })
  })
  .catch((err) => {
    console.log(err);
  });

//Создание экземпляра секции с фотокарточками
const defaultCardList = new Section({
    items: {},
      renderer: (cardData) => {
        defaultCardList.addItem(renderCard(cardData));
      }
    }, 
    cardListSelector
);

//Создание попапа с картинкой
const popupImg = new PopupWithImage(popupImgSelector);
popupImg.setEventListeners();

//Создание попапа подтверждения
const popupConfirm = new PopupConfirm(popupConfirmSelector);
popupConfirm.setEventListeners();

//Открытие попапа с картинкой
const handleOpenPopup = (name, link) => {
  popupImg.open(name, link);
}

//Создание попапа с формой добавления карточки
const popupAdd = new PopupWithForm(popupAddSelector, {
  handleFormSubmit: (cardData) => {
    api.addNewCard(cardData)
      .then((data) => {
        defaultCardList.addItem(renderCard(data));
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