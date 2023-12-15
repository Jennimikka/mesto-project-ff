import '../pages/index.css'; 
import { openModal,closeModal } from "../components/modal.js";
// import { initialCards } from '../components/cards.js';
import { createCardByTamplate, openImage,  likeCard, removeItem } from '../components/card.js';
import { popupTypeProfile, popupTypeCard, popupTypeImage, profileEditButton, addButton, closeButton, containerEl, template, profileNameInput, profileDescriptionInput, profileNameValue,  profileDescriptionValue, popup, formElementProfile, formElementCard, cardNameInput, cardUrlInput, validationConfig, photoAvatar, popupTypeAvatar, popupDeleteButton, popupTypeDelete } from '../components/constants.js';
import { checkInputValidity, clearValidation, enableValidation } from './validation.js';
import { getInitialCards, saveCards } from '../components/api.js';

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
  
fetch('https://nomoreparties.co/v1/wff-cohort-2/users/me ', {
  headers: {
    authorization: 'd588555b-0738-4ae4-bf1a-640bce42094e'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });  

  fetch('https://nomoreparties.co/v1/wff-cohort-2/users/me', {
  method: 'PATCH',
  headers: {
    authorization: 'd588555b-0738-4ae4-bf1a-640bce42094e',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Jacques Cousteau',
    about: 'Sailor, researcher'
  })
}); 
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
    getInitialCards()
    .then((cards) => {
        console.log(cards)
        cards.forEach((item) => { 
            containerEl.append(createCardByTamplate(item, openImage, likeCard, removeItem)); 
        }); 
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}; 

render(); 

addButton.addEventListener('click', function(){
    openModal(popupTypeCard)   
    
})

photoAvatar.addEventListener('click', function(){
    openModal(popupTypeAvatar)   
})

profileEditButton.addEventListener('click', openPopupProfile)
function openPopupProfile() {
    profileNameInput.value = profileNameValue.textContent;
    profileDescriptionInput.value = profileDescriptionValue.textContent;
    openModal(popupTypeProfile)
}

function handleFormProfileSubmit(evt) {
    clearValidation(formElementProfile, checkInputValidity);
    profileNameValue.textContent = profileNameInput.value;
    profileDescriptionValue.textContent = profileDescriptionInput.value;
    closeModal(popupTypeProfile)
    evt.target.reset(); 
}

formElementProfile.addEventListener('submit', handleFormProfileSubmit)

function handleFormCardSubmit (evt) { 
    evt.preventDefault();   
    const newCard = {};  
    newCard.name = cardNameInput.value;  
    newCard.link = cardUrlInput.value;
    saveCards(newCard)
    const newEl = createCardByTamplate(newCard, openImage, likeCard, removeItem );   
    containerEl.prepend(newEl);   
    closeModal(popupTypeCard)  
    evt.target.reset(); 
  
  } 

 // popupDeleteButton.addEventListener('click', function(){
    openModal(popupTypeDelete)   
//})

formElementCard.addEventListener('submit', handleFormCardSubmit) 
console.log('test',enableValidation );
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 





export { popupTypeCard, popupTypeProfile, popupTypeImage, profileEditButton, addButton, closeButton, popup, containerEl, template, openModal }

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
