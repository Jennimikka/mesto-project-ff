import '../pages/index.css';
import { openModal, closeModal, closePopupByClick } from '../components/modal.js';
// import { initialCards } from '../components/cards.js';
import { createCardByTamplate, openImage, likeCard, removeCard } from '../components/card.js';
import {
  popupTypeProfile,
  popupTypeCard,
  popupTypeImage,
  profileEditButton,
  addButton,
  closeButton,
  popupDeleteButton,
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
  photoAvatar,
  popupTypeAvatar,
  popupTypeDelete,
  validationConfig
} from '../components/constants.js';
import { checkInputValidity, clearValidation, enableValidation } from './validation.js';
import {
  getInitialCards,
  saveCards,
  deleteCard,
  setUserAvatar,
  getUserInfo,
  saveUserInfo,
  config
} from '../components/api.js';

//getUserInfo().then(function (user) {
//profileNameValue.textContent = user.name;
//profileDescriptionValue.textContent = user.about;
//photoAvatar.style = `background-image: url(${user.avatar})`;
//});
let userId = '';
Promise.all([getInitialCards(), getUserInfo()])
  .then(([res1, res2]) => {
    userId = res2._id;
    profileNameValue.textContent = res2.name;
    profileDescriptionValue.textContent = res2.about;
    photoAvatar.style = `background-image: url(${res2.avatar})`;

    res1.forEach(data => {
      const listCard = createCardByTamplate(data, likeCard, userId);
      elements.append(listCard);
    });
  })
  .catch(err => {
    console.log(err);
  });

const render = () => {
  containerEl.innerHTML = '';
  getInitialCards()
    .then(cards => {
      console.log(cards);
      cards.forEach(item => {
        containerEl.append(createCardByTamplate(item, openImage, likeCard));
      });
    })
    .catch(err => {
      console.log(err); // выводим ошибку в консоль
    });
};

render();

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    closePopupByClick(evt);
  });
});

addButton.addEventListener('click', function () {
  openModal(popupTypeCard);
  clearValidation(popupTypeCard, validationConfig);
});

photoAvatar.addEventListener('click', function () {
  openModal(popupTypeAvatar);
  clearValidation(popupTypeAvatar, validationConfig);
});

function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoaiding(evt.submitter, 'Сохранение...');
  setUserAvatar({ avatar: avatarUrlInput.value })
    .then(userData => {
      photoAvatar.style = `background-image: url(${userData.avatar})`;
      closeModal(popupTypeAvatar);
      evt.target.reset();
    })

    .finally(() => renderLoaiding(evt.submitter, 'Сохранить'));
}

formElementAvatar.addEventListener('submit', handleFormAvatarSubmit);

profileEditButton.addEventListener('click', openPopupProfile);
function openPopupProfile() {
  profileNameInput.value = profileNameValue.textContent;
  profileDescriptionInput.value = profileDescriptionValue.textContent;
  openModal(popupTypeProfile);
  clearValidation(popupTypeProfile, validationConfig);
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  renderLoaiding(evt.submitter, 'Сохранение...');
  saveUserInfo({
    name: profileNameInput.value,
    about: profileDescriptionInput.value
  })
    .then(userData => {
      console.log(userData);
      profileNameValue.textContent = userData.name;
      profileDescriptionValue.textContent = userData.about;
      closeModal(popupTypeProfile);
      evt.target.reset();
    })
    .finally(() => renderLoaiding(evt.submitter, 'Сохранить'));
}

formElementProfile.addEventListener('submit', handleFormProfileSubmit);

function handleFormCardSubmit(evt) {
  evt.preventDefault();
  renderLoaiding(evt.submitter, 'Сохранение...');
  const newCard = {};
  newCard.name = cardNameInput.value;
  newCard.link = cardUrlInput.value;
  saveCards(newCard)
    .then(function () {
      render();
      closeModal(popupTypeCard);
      evt.target.reset();
    })
    .finally(() => renderLoaiding(evt.submitter, 'Сохранить'));
}

// popupDeleteButton.addEventListener('click', () => {
//   openModal(popupTypeDelete);
// });

document.querySelector('.popup__button_delete').addEventListener('click', function (evt) {
  evt.preventDefault();
  const id = evt.target.dataset.id;
  deleteCard(id).then(() => {
    removeCard(id);
    closeModal(popupTypeDelete);
  });
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

function renderLoaiding(popupButton, status) {
  popupButton.textContent = status;
}

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
  openModal,
  userId
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
