import '../pages/index.css'; 
import { openModal,closeModal } from "../components/modal.js";
import { initialCards } from '../components/cards';
import { createCardByTamplate } from '../components/card';
const popupTypeProfile = document.querySelector('.popup_type_edit');
const popupTypeCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelector('.popup__close');
const containerEl = document.querySelector('.places__list');
const template = document.querySelector('#card-template').content;
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileDescriptionInput = document.querySelector('.popup__input_type_description');
const profileNameValue = document.querySelector('.profile__title');
const profileDescriptionValue = document.querySelector('.profile__description');
const popup = document.querySelector('.popup');
const formElementProfile = document.forms.edit_profile;
const formElementCard = document.forms.new_place;
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');

const render = () => { 
    initialCards.forEach((item) => { 
        containerEl.append(createCardByTamplate(item)); 
    }); 
}; 

render(); 

addButton.addEventListener('click', function(){
    openModal(popupTypeCard)   
    
})
profileEditButton.addEventListener('click', function(){
    openModal(popupTypeProfile)
    profileNameInput.value = profileNameValue.textContent;
    profileDescriptionInput.value = profileDescriptionValue.textContent;
    
})

function handleFormProfileSubmit(evt) {
    evt.preventDefault(); 
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
    const newEl = createCardByTamplate(newCard);   
    containerEl.prepend(newEl);   
    closeModal(popupTypeCard)  
    evt.target.reset(); 
  
  } 

formElementCard.addEventListener('submit', handleFormCardSubmit) 







export { popupTypeCard, popupTypeProfile, popupTypeImage, profileEditButton, addButton, closeButton, popup, containerEl, template, openModal }

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
