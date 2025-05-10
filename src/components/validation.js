export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 
//показать ошибку
const showInputError = (formElement, inputElement, errorMessage, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configValidation.errorClass);
};
//скрыть ошибку
const hideInputError = (formElement, inputElement, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(configValidation.inputErrorClass);
  errorElement.classList.remove(configValidation.errorClass);
  errorElement.textContent = '';
};
//проверка валидности
const checkInputValidity = (formElement, inputElement, configValidation) => {
  if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
      inputElement.setCustomValidity('');
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, configValidation);
  } else {
    hideInputError(formElement, inputElement, configValidation);
  }
};

//поиск невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
};
//состояние кнопок
const toggleButtonState = (inputList, buttonElement, configValidation) => {
  if (hasInvalidInput(inputList, configValidation)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(configValidation.inactiveButtonClass);
  } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(configValidation.inactiveButtonClass)
  }
};
//слушатель на полях ввода
const setEventListeners = (formElement, configValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
  //if (buttonElement) {
    //  toggleButtonState(inputList, buttonElement, configValidation);
 // }
  toggleButtonState(inputList, buttonElement, configValidation);
  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
          checkInputValidity(formElement, inputElement, configValidation);
          toggleButtonState(inputList, buttonElement, configValidation);
      });
  });
};

export const enableValidation = (configValidation) => {
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener('sumbit', function (evt) {
          evt.preventDefault();
      });
      setEventListeners(formElement, configValidation);
  })
}

//отчистка поля валидации
export const clearValidation = (formElement, configValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, configValidation);
      inputElement.value = '';
  });

  toggleButtonState(inputList, buttonElement, configValidation);
};


