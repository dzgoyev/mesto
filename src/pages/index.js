import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards, formOptions} from '../utils/data.js';
import {popupImages, cardListSelector } from '../utils/utils.js'; //CardListSelector (проектная работа 8)
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Popups
const popupProfile = document.querySelector('.popup'); //popup profile (other be its elements)
const popupAddCard = document.querySelector('.popup__add'); // popup for adding a card
// const popupImages = document.querySelector('.popup__images'); // popup for large images

// buttons
// const submit = popupProfile.querySelector('.popup__form-button'); //button in the profile form
const buttonEdit = document.querySelector('.profile__button-edit'); //save button in the profile form edit
const buttonAdd = document.querySelector('.profile__button-add'); //button in the adding form

// Forms
const formElement = document.querySelector('.popup__form'); // profile editing form
const formElementAdd = document.querySelector('.popup__form_add'); // form for add images

//Gallery
// const container = document.querySelector('.main'); //main container
// const gallery = container.querySelector('.gallery'); //all gallery

// Inputs and output fileds profile
const nameInput = popupProfile.querySelector('.popup__form-item_name'); //name field in the profile registration
const jobInput = popupProfile.querySelector('.popup__form-item_job'); // name job in the profile registration
const profileName = document.querySelector('.profile__name'); //name element on the page
const profileJob = document.querySelector('.profile__job'); //name job jn the page
nameInput.value = profileName.innerHTML;
jobInput.value = profileJob.innerHTML;

// Inputs and output fields add images
const namePlace = popupAddCard.querySelector('.popup__form-item_place'); //name place in the form add
const linkImage = popupAddCard.querySelector('.popup__form-item_link-img'); //link img in the form add

const userInfo = new UserInfo({
    name: profileName,
    job: profileJob
})

const editProfileValidation = new FormValidator(formOptions, formElement); 
const addCardValidation = new FormValidator(formOptions, formElementAdd);
const popupWithImages = new PopupWithImage('.popup__images'); // popup for large images
popupWithImages.setEventListeners();
const popupWithFormProfile = new PopupWithForm({selector: '.popup', submit: (values) => {userInfo.setUserInfo(values)}});
popupWithFormProfile.setEventListeners();
const popupWithFormAddCard = new PopupWithForm({
    selector: '.popup__add', submit: () => {
    const card = new Card(namePlace.value, linkImage.value, '#gallery-template', handleCardClick).generateCard();
    cardList.addItem(card);
    }
})
popupWithFormAddCard.setEventListeners();

function handleCardClick (name, link) {
    popupWithImages.open(name, link);
}

const cardList = new Section ({
    data: initialCards,
    renderer: (item) => {
        const card = new Card(item.name, item.link, '#gallery-template', handleCardClick).generateCard();
        cardList.addItem(card);
    }  
}, cardListSelector); // в утилитах
cardList.renderItems();

buttonEdit.addEventListener('click', () => {
    const profileUser =  userInfo.getUserInfo();
    nameInput.value = profileUser.name;
    jobInput.value = profileUser.job;
    popupWithFormProfile.open();
    editProfileValidation.resetErrorFormOpen();
}); // Open Edit Profile

buttonAdd.addEventListener('click', () => {
    namePlace.value = ''; //очищаем инпуты
    linkImage.value = '';
    popupWithFormAddCard.open();
    addCardValidation.resetErrorFormOpen();
   
  }); // Open Add Image

const toggle = true; //рубильник валидации
editProfileValidation.enableValidation(toggle);
addCardValidation.enableValidation(toggle);

