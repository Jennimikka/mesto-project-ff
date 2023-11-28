import { popupTypeCard, popupTypeProfile, popupTypeImage, profileEditButton, addButton, closeButton, popup } from "../scripts/index.js"

function closeModal(el) {       
    el.classList.remove('popup_is-opened'); 
    el.classList.add('popup_is-animated');
    document.removeEventListener("keydown", handleEscClose); 

} 

function openModal(el) {  
    el.classList.add('popup_is-opened'); 
    el.classList.add('popup_is-animated');
    document.addEventListener("keydown", handleEscClose); 
   
} 
function handleEscClose(el) {
    if (el.key === "Escape") {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}

const popups = document.querySelectorAll('.popup'); 
popups.forEach((popup) => {
 popup.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')){
   closeModal(popup);
  }
 });
}); 

export { openModal, closeModal }