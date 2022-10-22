const POPUP_OPENED_CLASS = 'popup_opened';

const editBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeBtn = popup.querySelector('.popup__close-btn');
const form = popup.querySelector('.form');
const nameInput = form.querySelectorAll('.form__input')[0];
const jobInput = form.querySelectorAll('.form__input')[1];
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

editBtn.addEventListener('click', () => {
  popup.classList.add(POPUP_OPENED_CLASS);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

closeBtn.addEventListener('click', () => {
  popup.classList.remove(POPUP_OPENED_CLASS);
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  popup.classList.remove(POPUP_OPENED_CLASS);
});