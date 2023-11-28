import '../pages/index.css'; 
import { openModal,closeModal } from "../components/modal.js";
import { initialCards } from '../components/cards.js';
import { createCardByTamplate, openImage,  likeCard, removeItem } from '../components/card.js';
import { popupTypeProfile, popupTypeCard, popupTypeImage, profileEditButton, addButton, closeButton, containerEl, template, profileNameInput, profileDescriptionInput, profileNameValue,  profileDescriptionValue, popup, formElementProfile, formElementCard, cardNameInput, cardUrlInput } from '../components/constants.js'
const render = () => { 
    initialCards.forEach((item) => { 
        containerEl.append(createCardByTamplate(item, openImage, likeCard, removeItem)); 
    }); 
}; 

render(); 

addButton.addEventListener('click', function(){
    openModal(popupTypeCard)   
    
})
profileEditButton.addEventListener('click', openPopupProfile)
function openPopupProfile() {
    profileNameInput.value = profileNameValue.textContent;
    profileDescriptionInput.value = profileDescriptionValue.textContent;
    openModal(popupTypeProfile)
}

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
    const newEl = createCardByTamplate(newCard, openImage, likeCard, removeItem );   
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
