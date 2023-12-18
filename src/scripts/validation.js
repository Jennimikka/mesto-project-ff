import { validationConfig } from '../components/constants.js';
export const showInputError = (formEl, inputEl, errorMessage) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add('popup__input_type_error');
  errorEl.textContent = errorMessage;
  errorEl.classList.add('popup__error_visible');
};
console.log(showInputError);
export const hideInputError = (formEl, inputEl) => {
  console.log(inputEl.id);
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove('popup__input_type_error');
  errorEl.classList.remove('popup__error_visible');
  errorEl.textContent = '';
};

export const checkInputValidity = (formEl, inputEl) => {
  if (inputEl.validity.patternMismatch) {
    inputEl.setCustomValidity(inputEl.dataset.errorMessage);
  } else {
    inputEl.setCustomValidity('');
  }

  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
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

const toggleButtonState = (inputList, buttonEl) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonEl.disabled = true;
    buttonEl.classList.add('popup__button_disabled');
  } else {
    // иначе сделай кнопку активной
    buttonEl.disabled = false;
    buttonEl.classList.remove('popup__button_disabled');
  }
};
const setEventListeners = formEl => {
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(formEl.querySelectorAll('.popup__input'));
  // Найдём в текущей форме кнопку отправки
  const buttonEl = formEl.querySelector('.popup__button');

  inputList.forEach(inputEl => {
    inputEl.addEventListener('input', () => {
      checkInputValidity(formEl, inputEl);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonEl);
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
export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach(formEl => {
    formEl.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formEl);
  });
};
