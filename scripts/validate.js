//Обработчик отправки формы
const handleFormSubmit = (evt, config) => {
  evt.preventDefault();
  const submitBtn = evt.target.querySelector(config.submitButtonSelector);
  disableSubmitButton(submitBtn, config.inactiveButtonClass);
};

//Обработчик ввода данных
const handleFormInput = (input, inputErrorClass, error) => {
  if(input.validity.valid) {
    hideInputError(input, error, inputErrorClass);
  } else {
    showInputError(input, error, inputErrorClass);
  }
};

const disableSubmitButton = (submitBtn, inactiveButtonClass) => {
  submitBtn.classList.add(inactiveButtonClass);
  submitBtn.disabled = true;
};

const enableSubmitButton = (submitBtn, inactiveButtonClass) => {
  submitBtn.classList.remove(inactiveButtonClass);
  submitBtn.disabled = false;
};

const showInputError = (input, error, inputErrorClass) => {
  input.classList.add(inputErrorClass);
  error.textContent = input.validationMessage;
};

const hideInputError = (input, error, inputErrorClass) => {
  input.classList.remove(inputErrorClass);
  error.textContent = '';
};

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => !input.validity.valid);
};

const toggleButtonState = (inputs, submitBtn, inactiveButtonClass) => {
  if(hasInvalidInput(inputs)) {
    disableSubmitButton(submitBtn, inactiveButtonClass)
  } else {
    enableSubmitButton(submitBtn, inactiveButtonClass);
  }  
};

const setEventListeners = (config, form) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const submitBtn = form.querySelector(config.submitButtonSelector);
  const inactiveButtonClass = config.inactiveButtonClass;
  const inputErrorClass = config.inputErrorClass;
  toggleButtonState(inputs, submitBtn, inactiveButtonClass);
  inputs.forEach((input) => {
    const error = form.querySelector(`.form-error-${input.name}`);
    input.addEventListener('input', () => {
      handleFormInput(input, inputErrorClass, error);
      toggleButtonState(inputs, submitBtn, inactiveButtonClass);
    });
  });
}

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => handleFormSubmit(evt, config));
    setEventListeners(config, form);
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__sub-btn',
  inactiveButtonClass: 'form__sub-btn_disabled',
  inputErrorClass: 'form__input_type_error',
});