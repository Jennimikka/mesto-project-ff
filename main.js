(()=>{"use strict";function e(e){e.classList.remove("popup_is-opened"),e.classList.add("popup_is-animated"),document.removeEventListener("keydown",n)}function t(e){e.classList.add("popup_is-opened"),e.classList.add("popup_is-animated"),document.addEventListener("keydown",n)}function n(t){"Escape"===t.key&&e(document.querySelector(".popup_is-opened"))}document.querySelectorAll(".popup").forEach((function(t){t.addEventListener("click",(function(n){(n.target===n.currentTarget||n.target.classList.contains("popup__close"))&&e(t)}))}));var o=document.querySelector(".popup_type_edit"),r=document.querySelector(".popup_type_new-card"),c=document.querySelector(".popup_type_image"),p=document.querySelector(".profile__edit-button"),u=document.querySelector(".profile__add-button"),d=(document.querySelector(".popup__close"),document.querySelector(".places__list")),a=document.querySelector("#card-template").content,i=document.querySelector(".popup__input_type_name"),s=document.querySelector(".popup__input_type_description"),l=document.querySelector(".profile__title"),_=document.querySelector(".profile__description"),m=(document.querySelector(".popup"),document.forms.edit_profile),y=document.forms.new_place,v=document.querySelector(".popup__input_type_card-name"),f=document.querySelector(".popup__input_type_url"),k=document.querySelector(".popup__image"),q=document.querySelector(".popup__caption"),S=function(e,t,n,o){var r=a.querySelector(".card").cloneNode(!0);r.querySelector(".card__title").textContent=e.name;var c=r.querySelector(".card__image");return c.src=e.link,c.alt=e.name,r.querySelector(".card__like-button").addEventListener("click",n),c.addEventListener("click",(function(){t(e)})),r.querySelector(".card__delete-button").addEventListener("click",o),r};function g(e){k.src=e.link,k.alt=e.name,q.textContent=e.name,t(c)}function L(e){e.target.classList.toggle("card__like-button_is-active")}function E(e){e.target.closest(".card").remove()}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){d.append(S(e,g,L,E))})),u.addEventListener("click",(function(){t(r)})),p.addEventListener("click",(function(){i.value=l.textContent,s.value=_.textContent,t(o)})),m.addEventListener("submit",(function(t){t.preventDefault(),l.textContent=i.value,_.textContent=s.value,e(o),t.target.reset()})),y.addEventListener("submit",(function(t){t.preventDefault();var n={};n.name=v.value,n.link=f.value;var o=S(n,g,L,E);d.prepend(o),e(r),t.target.reset()}))})();