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
    elLike.addEventListener('click', likeCard);
    elImg.addEventListener('click', () => {
        openImage(item, imgCaption)});
    const deleteBtn = el.querySelector('.card__delete-button');    
    deleteBtn.addEventListener('click', removeItem);
    return el;
   

}

export function openImage(item) {   
    imgLink.src = item.link;
    imgCaption.alt = item.name;
    imgCaption.textContent = item.name;
    openModal(popupTypeImage)
    
}

export function likeCard (evt) {
    evt.target.classList.toggle('card__like-button_is-active');

}

export function removeItem(evt) {
    evt.target.closest('.card').remove();
}