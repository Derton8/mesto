export default class Card {

  constructor(data, templateSelector, user, onClick, onRemove) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._templateSelector = templateSelector;
    this._userId = user._id;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.photo-grid__img');
    this._btnLike = this._element.querySelector('.photo-grid__button');
    this._btnDelete = this._element.querySelector('.photo-grid__delete-button');
    this._onClick = onClick;
    this._onRemove = onRemove;
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
    this._element = null;
  }

  _setEventListeners() {
    this._btnLike.addEventListener('click', () => {
      this._likeCard(this._btnLike);
    });
    this._btnDelete.addEventListener('click', () => {
      this._onRemove(this._element);
    });
    this._cardImage.addEventListener('click', (evt) => {
      this._onClick(this._name, this._link);
    });
    this._
  }
  
  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.photo-grid__title').textContent = this._name;
    this._element.querySelector('.photo-grid__counter').textContent = this._data.likes.length;

    if(this._data.owner._id === this._userId) {
      this._btnDelete.classList.remove('photo-grid__delete-button_type_hidden');
    }
    
    return this._element;
  }
}