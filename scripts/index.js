const POPUP_OPENED_CLASS = 'popup_opened';

const editBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeBtn = popup.querySelector('.popup__close-btn');
const editForm = document.forms.editForm;
const nickInput = editForm.nick;
const jobInput = editForm.job;
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add(POPUP_OPENED_CLASS);
}

function closePopup() {
  popup.classList.remove(POPUP_OPENED_CLASS);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nickInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

editBtn.addEventListener('click', () => {
  openPopup();
  nickInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

closeBtn.addEventListener('click', () => {
  closePopup();
});

editForm.addEventListener('submit', formSubmitHandler);