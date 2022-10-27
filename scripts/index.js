const initialCards = [
  {
    name: 'Рускеала',
    link: 'images/ruskeala.jpg'
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
    name: 'Архыз',
    link: 'images/arkhyz.jpg'
  }
];

const POPUP_OPENED_CLASS = 'popup_opened';

const editBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeBtn = popup.querySelector('.popup__close-btn');
const editForm = document.forms.editForm;
const nickInput = editForm.nick;
const jobInput = editForm.job;
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const photosContainer = document.querySelector('.photo-grid');

const openPopup = () => {
  popup.classList.add(POPUP_OPENED_CLASS);
}

const closePopup = () => {
  popup.classList.remove(POPUP_OPENED_CLASS);
}

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = nickInput.value;
  profileJob.textContent = jobInput.value;
  closePopup;
}

const createCard = (data) => {
  const cardTemplate = document.querySelector('.template').content;
  const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);

  cardElement.querySelector('.photo-grid__img').src = data.link;
  cardElement.querySelector('.photo-grid__img').alt = data.name;
  cardElement.querySelector('.photo-grid__title').textContent = data.name;

  photosContainer.append(cardElement);
}

initialCards.forEach(createCard);


editBtn.addEventListener('click', () => {
  openPopup();
  nickInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

closeBtn.addEventListener('click', () => {
  closePopup();
});

editForm.addEventListener('submit', formSubmitHandler);

