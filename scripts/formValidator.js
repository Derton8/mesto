export default class FormValidator {

  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._submitBtn = this._form.querySelector(this._config.submitButtonSelector);
    this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
  }
  
  //Обработчик отправки формы
  _handleFormSubmit(evt) {
    evt.preventDefault();
    const submitBtn = evt.target.querySelector(this._config.submitButtonSelector);
    this._disableSubmitButton(submitBtn);
  }

  //Обработчик ввода данных
  _handleFormInput(input, error) {
    if(input.validity.valid) {
      this._hideInputError(input, error);
    } else {
      this._showInputError(input, error);
    }
  }

  _showInputError(input, error) {
    input.classList.add(this._config.inputErrorClass);
    error.textContent = input.validationMessage;
};

  _hideInputError(input, error) {
    input.classList.remove(this._config.inputErrorClass);
    error.textContent = '';
};

  _disableSubmitButton() {
    this._submitBtn.classList.add(this._config.inactiveButtonClass);
    this._submitBtn.disabled = true;
  }

  _enableSubmitButton() {
    this._submitBtn.classList.remove(this._config.inactiveButtonClass);
    this._submitBtn.disabled = false;
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => !input.validity.valid);
  };

  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._disableSubmitButton()
    } else {
      this._enableSubmitButton();
    };
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      const error = this._form.querySelector(`.form-error-${input.name}`);
      input.addEventListener('input', () => {
        this._handleFormInput(input, error);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => this._handleFormSubmit(evt, this._config));
    this._setEventListeners(this._config);
  }
}