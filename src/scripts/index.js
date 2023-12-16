import '../pages/index.css';
import { openModal, closeModal } from '../components/modal.js';
// import { initialCards } from '../components/cards.js';
import { createCardByTamplate, openImage, likeCard, removeItem } from '../components/card.js';
import {
  popupTypeProfile,
  popupTypeCard,
  popupTypeImage,
  profileEditButton,
  addButton,
  closeButton,
  containerEl,
  template,
  profileNameInput,
  profileDescriptionInput,
  profileNameValue,
  profileDescriptionValue,
  popup,
  formElementProfile,
  formElementCard,
  formElementAvatar,
  avatarUrlInput,
  cardNameInput,
  cardUrlInput,
  validationConfig,
  photoAvatar,
  popupTypeAvatar,
  popupDeleteButton,
  popupTypeDelete
} from '../components/constants.js';
import { checkInputValidity, clearValidation, enableValidation } from './validation.js';
import {
  getInitialCards,
  saveCards,
  deleteCard,
  setUserAvatar,
  getUserInfo
} from '../components/api.js';

getUserInfo().then(function (user) {
  profileNameValue.textContent = user.name;
  profileDescriptionValue.textContent = user.about;
});

// export const config = {
//     baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
//     headers: {
//       authorization: 'd588555b-0738-4ae4-bf1a-640bce42094e',
//       'Content-Type': 'application/json'
//     }
//   }

//   export const getInitialCards = () => {
//     return fetch(`${config.baseUrl}/cards`, {
//       headers: config.headers
//     })
//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         }

//         // если ошибка, отклоняем промис
//         return Promise.reject(`Ошибка: ${res.status}`);
//       });

//   }

//const updateUser = (evt) => {
//  evt.preventDefault();
// код предыдущего спринта
//}
// новый спринт
// const updateUser = (evt) => {
//  evt.preventDefault();
//  api.updateUser(profileFormData)
//  .then((data) => {
// код предыдущего спринта
//  })
//  .catch(console.log);
// }

//import { getInitialCards } from '../components/api.js'

//getInitialCards()
//.then(res => res.json())
//.then((result) => {
// console.log(result);
//});
// обрабатываем результат

//.catch((err) => {
// console.log(err); // выводим ошибку в консоль
//});

const render = () => {
  containerEl.innerHTML = '';
  getInitialCards()
    .then(cards => {
      console.log(cards);
      cards.forEach(item => {
        containerEl.append(createCardByTamplate(item, openImage, likeCard, removeItem));
      });
    })
    .catch(err => {
      console.log(err); // выводим ошибку в консоль
    });
};

render();

addButton.addEventListener('click', function () {
  openModal(popupTypeCard);
});

photoAvatar.addEventListener('click', function () {
  openModal(popupTypeAvatar);
});

function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  const newAvatar = {};
  newAvatar.link = avatarUrlInput.value;
  setUserAvatar(newAvatar);
  closeModal(popupTypeAvatar);
  evt.target.reset();
}

formElementAvatar.addEventListener('submit', handleFormAvatarSubmit);

profileEditButton.addEventListener('click', openPopupProfile);
function openPopupProfile() {
  profileNameInput.value = profileNameValue.textContent;
  profileDescriptionInput.value = profileDescriptionValue.textContent;
  openModal(popupTypeProfile);
}

function handleFormProfileSubmit(evt) {
  clearValidation(formElementProfile, checkInputValidity);
  profileNameValue.textContent = profileNameInput.value;
  profileDescriptionValue.textContent = profileDescriptionInput.value;
  closeModal(popupTypeProfile);
  userInfo({
    name: profileNameValue.textContent,
    about: profileDescriptionInput.value
  });
  evt.target.reset();
}

formElementProfile.addEventListener('submit', handleFormProfileSubmit);

function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = cardNameInput.value;
  newCard.link = cardUrlInput.value;
  saveCards(newCard).then(function () {
    render();
    //const newEl = createCardByTamplate(newCard, openImage, likeCard, removeItem );
    //containerEl.prepend(newEl);
    closeModal(popupTypeCard);
    evt.target.reset();
  });
}

document.querySelector('.popup__button_delete').addEventListener('click', function (evt) {
  evt.preventDefault();
  let id = evt.target.dataset.id;
  document.querySelector('#card-' + id).remove();
  closeModal(popupTypeDelete);
  deleteCard(id);
  //сделать отправку на сервер удаление.
});

formElementCard.addEventListener('submit', handleFormCardSubmit);
console.log('test', enableValidation);
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

export {
  popupTypeCard,
  popupTypeProfile,
  popupTypeImage,
  profileEditButton,
  addButton,
  closeButton,
  popup,
  containerEl,
  template,
  openModal
};

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

//1) Постановка и снятие лайка:
//Чтобы лайкнуть карточку, отправьте PUT-запрос:
//PUT https://nomoreparties.co/v1/cohortId/cards/likes/cardId
//Чтобы убрать лайк, нужно отправить DELETE-запрос с тем же URL:
//DELETE https://nomoreparties.co/v1/cohortId/cards/likes/cardId
//Вместо cardId в URL нужно подставить свойство _id соответствующей карточки.

//2)Чтобы сменить аватар, отправьте такой PATCH-запрос:
//PATCH https://nomoreparties.co/v1/cohortId/users/me/avatar
//В теле запроса передайте JSON с единственным свойством — avatar. Это свойство должно хранить ссылку на новый аватар. Если отправить не ссылку, сервер вернёт ошибку.
//Опционально, если хотите потренироваться, можете проверить, что это именно URL на изображение, и он действительный. Для этого вам потребуется сделать запрос с методом HEAD по этому адресу и проверить статус ответа и mime-тип в заголовках.

//3) Поработайте над UX. При редактировании профиля уведомите пользователя о процессе загрузки, поменяв текст кнопки на: «Сохранение...», пока данные загружаются

//4) Чтобы удалить карточку, отправьте DELETE-запрос:
//DELETE https://nomoreparties.co/v1/cohortId/cards/cardId
//Вместо cardId в URL нужно подставить параметр _id карточки, которую нужно удалить. _id каждой карточки есть в её JSON       СДЕЛАЛА!!!
//В результате запрос на удаление этой карточки должен выглядеть так:
//DELETE https://nomoreparties.co/v1/cohortId/cards/5d1f0611d321eb4bdcd707dd
