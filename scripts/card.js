export default class Card {

  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.photo-grid__item')
    .cloneNode(true);

    return cardElement;
  }

  _likeCard() {
    this._element.querySelector('.photo-grid__button').classList.toggle('photo-grid__button_active');
  }

  _removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.photo-grid__button').addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.photo-grid__delete-button').addEventListener('click', () => {
      this._removeCard();
    });
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector('.photo-grid__img');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector('.photo-grid__title').textContent = this._name;
    
    return this._element;
  }
}