import { template } from './constants.js';
//import { openModal } from './modal.js';
//import { popupTypeImage } from './constants.js';
import { likeCards } from './api.js';
import { openPopupDelete } from '../scripts/index.js';

export const createCardByTamplate = (item, openImage, likeCard, userId) => {
  const el = template.querySelector('.card').cloneNode(true);
  el.setAttribute('id', 'card-' + item._id);
  const elTitle = el.querySelector('.card__title');
  elTitle.textContent = item.name;
  const elImg = el.querySelector('.card__image');
  elImg.src = item.link;
  elImg.alt = item.name;
  const elLike = el.querySelector('.card__like-button');
  elLike.dataset.id = item._id;
  elLike.addEventListener('click', likeCard);
  elImg.addEventListener('click', () => {
    openImage(item);
  });
  const deleteBtn = el.querySelector('.card__delete-button');
  if (item.owner._id == userId) {
    //Показываем кнопку удаления
    deleteBtn.style.display = 'block';
    deleteBtn.addEventListener('click', openPopupDelete);
    deleteBtn.dataset.id = item._id;
  } else {
    deleteBtn.style.display = 'none';
  }
  el.querySelector('.card__like-counter').innerText = item.likes.length;
  console.log(456, item.likes, userId);
  const myLike = item.likes.some(user => user._id == userId);
  if (myLike) {
    elLike.classList.add('card__like-button_is-active');
  }
  return el;
};

export function likeCard(evt) {
  evt.preventDefault();
  const countLikes = evt.target.parentNode.parentNode.querySelector('.card__like-counter');
  likeCards(evt.target.dataset.id, !evt.target.classList.contains('card__like-button_is-active'))
    .then(res => {
      countLikes.innerText = res.likes.length;
      evt.target.classList.toggle('card__like-button_is-active');
    })
    .catch(err => {
      console.log(err); // выводим ошибку в консоль
    });
}

export function removeCard(id) {
  document.querySelector('#card-' + id).remove();
}
//почему кнопки удаления загружаются позже всего остального
//как removeCard и клик по кнопке урны перенести в index.js из card
