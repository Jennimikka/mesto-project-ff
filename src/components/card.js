import { template, imgLink, imgCaption, popupTypeDelete } from "./constants.js";
import { openModal } from "./modal.js";
import { popupTypeImage } from "./constants.js";
import { likeCards } from "./api.js";
export const createCardByTamplate = (item, openImage, likeCard, removeItem) => {
    const el = template.querySelector('.card').cloneNode(true);
    el.setAttribute('id', 'card-'+ item._id);
    const elTitle = el.querySelector('.card__title');
    elTitle.textContent = item.name;
    const elImg = el.querySelector('.card__image');
    elImg.src = item.link;
    elImg.alt = item.name;
    const elLike = el.querySelector('.card__like-button');
    elLike.dataset.id = item._id;
    elLike.addEventListener('click', likeCard);
    elImg.addEventListener('click', () => {
        openImage(item)});
        const deleteBtn = el.querySelector('.card__delete-button');
    if(item.owner._id  == '9340354ff2504a42f96423f0') {
        //Показываем кнопку удаления   
        deleteBtn.style.display ='block';
        deleteBtn.addEventListener('click', removeItem);
        deleteBtn.dataset.id = item._id;
    }  else {
        deleteBtn.style.display ='none';
    }
    el.querySelector('.card__like-counter').innerText = item.likes.length;
    let myLike = item.likes.find(user => user._id == '9340354ff2504a42f96423f0')
    if (myLike) {
        elLike.classList.add('card__like-button_is-active')
    }
    return el;
   

}

export function openImage(item) {   
    imgLink.src = item.link;
    imgLink.alt = item.name;
    imgCaption.textContent = item.name;
    openModal(popupTypeImage)
    
}

export function likeCard (evt) {
    evt.preventDefault();
    let countLikes = evt.target.parentNode.parentNode.querySelector('.card__like-counter');
    if (evt.target.classList.contains('card__like-button_is-active')) {
        // Убираем
        evt.target.classList.remove('card__like-button_is-active');
        countLikes.innerText = Number(countLikes.innerText) - 1;
        likeCards(evt.target.dataset.id, false);
    } else {
        // Добавляем
        evt.target.classList.add('card__like-button_is-active');
        countLikes.innerText = Number(countLikes.innerText) + 1;
        likeCards(evt.target.dataset.id, true);
    }

//    ;
//     likeCounter()
//     LikeCards(id, isLiked)
}

// export function likeCounter () {
//     const likes = document.querySelectorAll('.like');

// // В каждом элементе выбираем плюс и минус. Навешиваем на событие клик функцию render()
// likes.forEach(like => {
//   const plus = like.querySelector('.card__like-button');
//   const minus = like.querySelector('.card__like-button');
//   const counter_el = like.querySelector('.card__like-counter');
  
//   let counter = 0;
  
//   plus.addEventListener('click', () => {
//     render(++counter, counter_el);
//   });
  
//   minus.addEventListener('click', () => {
//     render(--counter, counter_el)
//   });
// });

// Функция обновляет текст
// const render = (counter, counter_element) => counter_element.innerText = counter;
// }

export function removeItem(evt) {
    evt.preventDefault()
    openModal(popupTypeDelete)
    document.querySelector('.popup__button_delete').dataset.id = evt.target.dataset.id;
    
    
}