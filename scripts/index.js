
// @todo: Темплейт карточки

const containerEl = document.querySelector('.places__list');
const template = document.querySelector('#card-template').content;
const createCardByTamplate = (item) => {
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
    const deleteBtn = el.querySelector('.card__delete-button');
    function removeItem(evt){
        evt.target.closest('.card').remove();
    }
    deleteBtn.addEventListener('click', removeItem);
    return el;

}
const render = () => { 

    initialCards.forEach((item) => { 

        containerEl.append(createCardByTamplate(item)); 

    }); 

}; 

render(); 


// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
