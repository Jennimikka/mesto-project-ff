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

const closeOverlay = document.querySelectorAll('.popup')
    closeOverlay.forEach(item => {
        const popup = item.closest('.popup');
        item.addEventListener('click', (evt) => { 
            if(evt.currentTarget === evt.target){
            closeModal(popup)
            }
    });    
})


const closeButtons = document.querySelectorAll('.popup__close'); 
closeButtons.forEach((item) => { 
    const popup = item.closest('.popup');
    item.addEventListener('click', () => {
        closeModal(popup) 
    }); 
}); 

export {openModal, closeModal, closeOverlay }