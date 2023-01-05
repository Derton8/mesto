//Селекторы попапов и фото-контейнера
export const cardListSelector = '.photo-grid';
export const popupAddSelector = '.popup-add-card';
export const popupEditSelector = '.popup-edit-card';
export const popupImgSelector = '.popup-image';
export const popupConfirmSelector = '.popup-confirm';

//Селекторы профиля
export const profileNameSelector = '.profile__title';
export const profileJobSelector = '.profile__subtitle';

//Кнопки
export const btnEdit = document.querySelector('.profile__edit-button');
export const btnAdd = document.querySelector('.profile__add-button');

//Форма добавления карточки
export const formAdd = document.forms.addForm;

//Форма редактирования профиля
export const formEdit = document.forms.editForm;
export const nickInput = editForm.nick;
export const jobInput = editForm.job;

//Api
export const apiConfig = {
  url: "https://nomoreparties.co/v1/cohort-56",
  headers: {
    authorization: '1bd039c2-a204-4fdd-a31b-cef6034c5bd1',
    'Content-Type': 'application/json; charset=UTF-8'
  }
}