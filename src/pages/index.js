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
  popupEditAvatarSelector,
  popupImgSelector,
  popupConfirmSelector,
  profileNameSelector,
  profileJobSelector,
  profileAvatarSelector,
  btnEdit,
  btnAdd,
  btnAvatar,
  formAdd,
  formEdit,
  formEditAvatar,
  nickInput,
  jobInput,
  apiConfig
} from '../utils/constants.js';

let user;
const api = new Api(apiConfig);

Promise.all([api.getUserInfo(), api.getCardsList()])
  .then(([data, cards]) => {
    user = data;
    userInfo.setUserInfo({nick: data.name, job: data.about});
    userInfo.setUserAvatar({avatar: data.avatar});

    cards.reverse().map((card) => {
      defaultCardList.addItem(renderCard(card));
    })
  })
  .catch((err) => {
    console.log(err);
  });

//Функция создания карточки
const renderCard = (cardData) => {
  const card = new Card(
    cardData, 
    '.template',
    user,
    handleAddLike,
    handleDeleteLike,
    handleOpenPopup,
    (card) => {
      popupConfirm.open(
        () => {
          api.deleteCard(cardData._id)
            .then((data) => {
              card.removeCard();
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

const handleAddLike = (card, cardId) => {
  api.likeCard(cardId)
    .then((data) => {
      card.likeCard(data);
    })
    .catch((err) => {
      console.log(err);
    })
}

const handleDeleteLike = (card, cardId) => {
   api.unlikeCard(cardId)
    .then((data) => {
      card.likeCard(data);
    })
    .catch((err) => {
      console.log(err);
    })
}

//Включение валидации форм
const editProfileValidator = new FormValidator(config, formEdit);
editProfileValidator.enableValidation();
const editAvatarValidator = new FormValidator(config, formEditAvatar);
editAvatarValidator.enableValidation();
const addCardValidator = new FormValidator(config, formAdd);
addCardValidator.enableValidation();

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
    popupAdd.renderLoading(true);
    api.addNewCard(cardData)
      .then((data) => {
        defaultCardList.addItem(renderCard(data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAdd.renderLoading(false);
      })
  }
});
popupAdd.setEventListeners();

//Создание попапа с формой редактирования профиля
const userInfo = new UserInfo({profileNameSelector, profileJobSelector, profileAvatarSelector});
const popupEdit = new PopupWithForm(popupEditSelector, {
  handleFormSubmit: (formData) => {
    popupEdit.renderLoading(true);
    api.setUserInfo(formData)
      .then((data) => {
        userInfo.setUserInfo({nick: data.name, job: data.about});
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEdit.renderLoading(false);
      })
  }
});
popupEdit.setEventListeners();

//Создание попапа с формой редактирования аватара
const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, {
  handleFormSubmit: (formData) => {
    popupEditAvatar.renderLoading(true);
    api.editAvatar(formData)
      .then((data) => {
        userInfo.setUserAvatar({avatar: data.avatar});
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditAvatar.renderLoading(false);
      })
  }
});
popupEditAvatar.setEventListeners();

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

//Открытие попапа для формы редактирования аватара
btnAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
});