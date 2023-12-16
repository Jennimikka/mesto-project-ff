const popupTypeProfile = document.querySelector('.popup_type_edit');
const popupTypeCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelector('.popup__close');
const containerEl = document.querySelector('.places__list');
const template = document.querySelector('#card-template').content;
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileDescriptionInput = document.querySelector('.popup__input_type_description');
const profileNameValue = document.querySelector('.profile__title');
const profileDescriptionValue = document.querySelector('.profile__description');
const popup = document.querySelector('.popup');
const formElementProfile = document.forms.edit_profile;
const formElementCard = document.forms.new_place;
const formElementAvatar = document.forms.avatar_name;
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');
const imgLink = document.querySelector('.popup__image');
const imgCaption = document.querySelector('.popup__caption');
const photoAvatar = document.querySelector('.profile__image');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const popupDeleteButton = document.querySelector('.card__delete-button');
const popupTypeDelete = document.querySelector('.popup_type_delete');
const avatarUrlInput = document.querySelector('.popup__input_type_avatar');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
export { popupTypeProfile, popupTypeCard, popupTypeImage, profileEditButton, addButton, closeButton, containerEl, template, profileNameInput, profileDescriptionInput, profileNameValue,  profileDescriptionValue, popup, formElementProfile, formElementCard, cardNameInput, cardUrlInput, imgLink, imgCaption, validationConfig, photoAvatar, popupTypeAvatar, popupDeleteButton, popupTypeDelete, formElementAvatar, avatarUrlInput }