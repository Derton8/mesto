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

//Шаблон карточки
const cardTemplate = document.querySelector('.template').content;
const cardItem = cardTemplate.querySelector('.photo-grid__item');

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
  const cardElement = cardItem.cloneNode(true);
  const cartImage = cardElement.querySelector('.photo-grid__img');
  cartImage.src = cardData.link;
  cartImage.alt = cardData.name;
  cardElement.querySelector('.photo-grid__title').textContent = cardData.name;
  
  //Лайк карточки
  cardElement.querySelector('.photo-grid__button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('photo-grid__button_active');
  });

  //Удаление карточки
  cardElement.querySelector('.photo-grid__delete-button').addEventListener('click', () => {
    cardElement.remove();
  });

  //Открытие попапа с картинкой
  cartImage.addEventListener('click', (evt) => {
    const image = evt.target;
    fullScreenImage.src = image.src;
    fullScreenImage.alt = image.alt;
    titleImage.textContent = image.alt;
    openPopup(popupImg);
  });
  return cardElement;
}
//Функция добавления карточки
const renderCard = (card) => {
  photosContainer.prepend(card);
}

//Добавление начальных карточек
initialCards.forEach(cardData => {
  renderCard(createCard(cardData))
});

//Добавлениe новых карточек
const handleCardFormSubmit = (evt) => {
  const cardData = {name: nameInput.value, link: linkInput.value};
  renderCard(createCard(cardData))
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