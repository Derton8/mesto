import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.form');
  }

  _getInputValues() {
    //достаём все инпуты
    this._inputList = this._popup.querySelectorAll('.form__input');
    // создаём пустой объект
    this._formValues = {};

    //Добавляем в этот объект значения инпутов
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

}