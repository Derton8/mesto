export default class Card {

  constructor(data, templateSelector, onClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.photo-grid__img');
    this._btnLike = this._element.querySelector('.photo-grid__button');
    this._btnDelete = this._element.querySelector('.photo-grid__delete-button');
    this._onClick = onClick;
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
    this._btnLike.classList.toggle('photo-grid__button_active');
  }

  _removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._btnLike.addEventListener('click', () => {
      this._likeCard(this._btnLike);
    });
    this._btnDelete.addEventListener('click', () => {
      this._removeCard();
    });
    this._cardImage.addEventListener('click', (evt) => {
      this._onClick(this._name, this._link);
    });
  }
  
  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.photo-grid__title').textContent = this._name;
    
    return this._element;
  }
}