import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.form');
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._btnSubmit = this._popupForm.querySelector('.form__sub-btn');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._temp = this._btnSubmit.textContent;
      this._btnSubmit.textContent = 'Сохранение...';
    } else {
      if(this._temp) {
        this._btnSubmit.textContent = this._temp;
      }
    }
  }

}