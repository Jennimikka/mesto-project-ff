import { validationConfig } from '../components/constants.js';
export const showInputError = (formEl, inputEl, errorMessage, validationConfig) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(validationConfig.inputErrorClass);
  errorEl.textContent = errorMessage;
  errorEl.classList.add(validationConfig.errorClass);
};
console.log(showInputError);
export const hideInputError = (formEl, inputEl, validationConfig) => {
  console.log(inputEl.id);
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(validationConfig.inputErrorClass);
  errorEl.classList.remove(validationConfig.errorClass);
  errorEl.textContent = '';
};

export const checkInputValidity = (formEl, inputEl, validationConfig) => {
  if (inputEl.validity.patternMismatch) {
    inputEl.setCustomValidity(inputEl.dataset.errorMessage);
  } else {
    inputEl.setCustomValidity('');
  }

  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, validationConfig);
  } else {
    hideInputError(formEl, inputEl, validationConfig);
  }
};

const hasInvalidInput = inputList => {
  // проходим по этому массиву методом some
  return inputList.some(inputEl => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    console.log(inputEl);
    return !inputEl.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl, validationConfig) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonEl.disabled = true;
    buttonEl.classList.add(validationConfig.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonEl.disabled = false;
    buttonEl.classList.remove(validationConfig.inactiveButtonClass);
  }
};
const setEventListeners = formEl => {
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(formEl.querySelectorAll(validationConfig.inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonEl = formEl.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach(inputEl => {
    inputEl.addEventListener('input', () => {
      checkInputValidity(formEl, inputEl, validationConfig);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonEl, validationConfig);
    });
  });
};

export function clearValidation(formEl, validationConfig) {
  const formList = Array.from(formEl.querySelectorAll(validationConfig.inputSelector));
  const button = formEl.querySelector(validationConfig.submitButtonSelector);
  formList.forEach((inputEl, validationConfig) => {
    hideInputError(formEl, inputEl, validationConfig);
    formEl.addEventListener('submit', evt => {
      evt.target.reset();
    });

    button.classList.add(validationConfig.inactiveButtonClass);
  });
}

export const enableValidation = validationConfig => {
  const formList = document.querySelectorAll(validationConfig.formSelector);
  formList.forEach(formEl => {
    formEl.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formEl, validationConfig);
  });
};
