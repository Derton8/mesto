export default class FormValidator {

  constructor(config, form) {
    this._config = config;
    this._form = form;
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

  _disableSubmitButton(submitBtn) {
    submitBtn.classList.add(this._config.inactiveButtonClass);
    submitBtn.disabled = true;
  }

  _enableSubmitButton(submitBtn) {
    submitBtn.classList.remove(this._config.inactiveButtonClass);
    submitBtn.disabled = false;
  }

  _hasInvalidInput(inputs) {
    return inputs.some((input) => !input.validity.valid);
  };

  _toggleButtonState(inputs, submitBtn) {
    if(this._hasInvalidInput(inputs)) {
      this._disableSubmitButton(submitBtn)
    } else {
      this._enableSubmitButton(submitBtn);
    };
  }

  _setEventListeners() {
    const inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    const submitBtn = this._form.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(inputs, submitBtn);
    inputs.forEach((input) => {
      const error = this._form.querySelector(`.form-error-${input.name}`);
      input.addEventListener('input', () => {
        this._handleFormInput(input, error);
        this._toggleButtonState(inputs, submitBtn);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => this._handleFormSubmit(evt, this._config));
    this._setEventListeners(this._config);
  }
}