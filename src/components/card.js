import { template, imgLink, imgCaption, popupTypeDelete } from './constants.js';
import { openModal } from './modal.js';
import { popupTypeImage } from './constants.js';
import { likeCards } from './api.js';
import { userId } from '../scripts/index.js';
export const createCardByTamplate = (item, openImage, likeCard) => {
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
    deleteBtn.addEventListener('click', openPopupDelite);
    deleteBtn.dataset.id = item._id;
  } else {
    deleteBtn.style.display = 'none';
  }
  el.querySelector('.card__like-counter').innerText = item.likes.length;
  const myLike = item.likes.some(user => user._id == userId);
  if (myLike) {
    elLike.classList.add('card__like-button_is-active');
  }
  return el;
};

export function openImage(item) {
  imgLink.src = item.link;
  imgLink.alt = item.name;
  imgCaption.textContent = item.name;
  openModal(popupTypeImage);
}

export function likeCard(evt) {
  evt.preventDefault();
  let countLikes = evt.target.parentNode.parentNode.querySelector('.card__like-counter');
  likeCards(evt.target.dataset.id, !evt.target.classList.contains('card__like-button_is-active'))
    .then(res => {
      countLikes.innerText = res.likes.length;
      evt.target.classList.toggle('card__like-button_is-active');
    })
    .catch(err => {
      console.log(err); // выводим ошибку в консоль
    });
}

export function openPopupDelite(evt) {
  evt.preventDefault();
  openModal(popupTypeDelete);
  document.querySelector('.popup__button_delete').dataset.id = evt.target.dataset.id;
}

export function removeCard(id) {
  document.querySelector('#card-' + id).remove();
}
