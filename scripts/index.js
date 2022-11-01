const initialCards = [
  {
    name: 'Архыз',
    link: 'images/arkhyz.jpg'
  },
  {
    name: 'Сихотэ-Алинь',
    link: 'images/sihoteAlin.jpg'
  },
  {
    name: 'Карачаево-Черкесская Республика',
    link: 'images/karachaevo.jpg'
  },
  {
    name: 'Тамбукан',
    link: 'images/tambukan.jpg'
  },
  {
    name: 'Байкал',
    link: 'images/baikal.jpg'
  },
  {
    name: 'Рускеала',
    link: 'images/ruskeala.jpg'
  }
];

const POPUP_OPENED_CLASS = 'popup_opened';

//Попапы
const editPopup = document.querySelector('.popup-edit-card');
const addPopup = document.querySelector('.popup-add-card');
const imgPopup = document.querySelector('.popup-image');

//Кнопки
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closeBtns = document.querySelectorAll('.popup__close-btn');
const deleteBtn = document.querySelector('.photo-grid__delete-button');

//Форма редактирования профиля
const editForm = document.forms.editForm;
const nickInput = editForm.nick;
const jobInput = editForm.job;

//Форма добавления карточки
const addForm = document.forms.addForm;
const nameInput = addForm.name;
const linkInput = addForm.link;

//Элементы профиля
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

//Элементы фото-карточки
const photosContainer = document.querySelector('.photo-grid');
const fullScreenImage = document.querySelector('.popup__img');
const titleImage = document.querySelector('.popup__title');

//Шаблон карточки
const cardTemplate = document.querySelector('.template').content;

const openPopup = (popup) => {
  popup.classList.add(POPUP_OPENED_CLASS);
}

const closePopup = (popup) => {
  popup.classList.remove(POPUP_OPENED_CLASS);
}

//Функция отправки данных формы
const editFormSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = nickInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editPopup);
}
editForm.addEventListener('submit', editFormSubmitHandler);

//Функция создания карточки
const createCard = (item) => {
  const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  cardElement.querySelector('.photo-grid__img').src = item.link;
  cardElement.querySelector('.photo-grid__img').alt = item.name;
  cardElement.querySelector('.photo-grid__title').textContent = item.name;
  return cardElement;
}
//Функция добавления карточки
const renderCard = (element) => {
  //Лайк карточки
  element.querySelector('.photo-grid__button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('photo-grid__button_active');
  });

  //Удаление карточки
  element.querySelector('.photo-grid__delete-button').addEventListener('click', () => {
    element.remove();
  });

  //Открытие попапа с картинкой
  element.querySelector('.photo-grid__img').addEventListener('click', (evt) => {
    openPopup(imgPopup);
    const image = evt.target;
    fullScreenImage.src = image.src;
    fullScreenImage.alt = image.alt;
    titleImage.textContent = image.alt;
  });

  photosContainer.prepend(element);
}

//Добавление начальных карточек
initialCards.forEach(item => {
  renderCard(createCard(item))
});

//Добавлениe новых карточек
const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const card = [{name: nameInput.value, link: linkInput.value}];
  card.forEach(item => {
    renderCard(createCard(item))
  });
  closePopup(addPopup);
  evt.target.reset();
}
addForm.addEventListener('submit', addFormSubmitHandler)

//Открытие попапа для формы редактирования профиля
editBtn.addEventListener('click', () => {
  openPopup(editPopup);
  nickInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

//Открытие попапа для формы добавления карточки
addBtn.addEventListener('click', () => {
  openPopup(addPopup);
});

//Закрытие попапа
closeBtns.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});