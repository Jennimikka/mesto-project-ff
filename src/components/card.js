import { template, popupTypeImage, openModal } from "../scripts";

export const createCardByTamplate = (item) => {
    const el = template.querySelector('.card').cloneNode(true);
    const elTitle = el.querySelector('.card__title');
    elTitle.textContent = item.name;
    const elImg = el.querySelector('.card__image');
    elImg.src = item.link;
    elImg.alt = item.name;
    const elLike = el.querySelector('.card__like-button');
    elLike.addEventListener('click', function(evt) {
        evt.target.classList.toggle('card__like-button_is-active')

    })

    elImg.addEventListener('click', function(){
        openModal(popupTypeImage)
        const imgCaption = document.querySelector('.popup__caption');
        const imgLink = document.querySelector('.popup__image');
        imgLink.src = elImg.src;
        imgLink.name = elImg.name;
        imgCaption.textContent = elTitle.textContent; 
        
    })

    const deleteBtn = el.querySelector('.card__delete-button');
    function removeItem(evt){
        evt.target.closest('.card').remove();
    }
    deleteBtn.addEventListener('click', removeItem);
    return el;

}