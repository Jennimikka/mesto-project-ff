import { template, imgLink, imgCaption } from "./constants.js";
import { openModal } from "./modal.js";
import { popupTypeImage } from "./constants.js";
export const createCardByTamplate = (item, openImage, likeCard, removeItem) => {
    const el = template.querySelector('.card').cloneNode(true);
    const elTitle = el.querySelector('.card__title');
    elTitle.textContent = item.name;
    const elImg = el.querySelector('.card__image');
    elImg.src = item.link;
    elImg.alt = item.name;
    const elLike = el.querySelector('.card__like-button');
    console.log(elLike)
    elLike.addEventListener('click', likeCard);
    elImg.addEventListener('click', () => {
        openImage(imgLink, imgCaption)
    });
    const deleteBtn = el.querySelector('.card__delete-button');    
    deleteBtn.addEventListener('click', removeItem);
    return el;
   

}
console.log(openImage)
export function openImage(imgLink, imgCaption) {   
    item.link = imgLink;
    item.name = imgCaption;
    imgCaption.textContent = elTitle.textContent; 
    openModal(popupTypeImage)
    
}

export function likeCard (evt) {
    evt.target.classList.toggle('card__like-button_is-active');

}

export function removeItem(evt) {
    evt.target.closest('.card').remove();
}