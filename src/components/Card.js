export default class Card {

  constructor(data, templateSelector, user, handleAddLike, handleDeleteLike, onClick, onRemove) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.photo-grid__img');
    this._btnLike = this._element.querySelector('.photo-grid__button');
    this._btnDelete = this._element.querySelector('.photo-grid__delete-button');
    this._likesCoiunter = this._element.querySelector('.photo-grid__counter');
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;
    this._onClick = onClick;
    this._onRemove = onRemove;
    this._userId = user._id;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.photo-grid__item')
    .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._btnLike.addEventListener('click', () => {
      if(!this._isLiked()) {
        this._handleAddLike(this, this._data._id);
      } else {
        this._handleDeleteLike(this, this._data._id);
      }
    });
    this._btnDelete.addEventListener('click', () => {
      this._onRemove(this);
    });
    this._cardImage.addEventListener('click', (evt) => {
      this._onClick(this._name, this._link);
    });
  }

  _isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }
  
  likeCard(data) {
    this._likes = data.likes;
    this._likesCoiunter.textContent = this._likes.length;
    if(this._isLiked()) {
      this._btnLike.classList.add('photo-grid__button_active');
    } else {
      this._btnLike.classList.remove('photo-grid__button_active');
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.photo-grid__title').textContent = this._name;
    this.likeCard(this._data);

    if(this._data.owner._id === this._userId) {
      this._btnDelete.classList.remove('photo-grid__delete-button_type_hidden');
    }
    
    return this._element;
  }
}