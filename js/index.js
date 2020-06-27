import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, formOptions} from './data.js';
import {popupImages, openPopup, closePopup } from './utils.js';

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
const container = document.querySelector('.main'); //main container
const gallery = container.querySelector('.gallery'); //all gallery

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

const editProfileValidation = new FormValidator(formOptions, formElement); 
const addCardValidation = new FormValidator(formOptions, formElementAdd);


// Массив попапов //
let popups = {};
popups["edit_profile"] = {'element': popupProfile };
popups["add_new_card"] = {'element': popupAddCard };
popups["view_image"] = {'element': popupImages};

// Add any item to container
function addItem(container, item) {
    container.prepend(item);
}

for (let key in popups) { // Инициализация попапов из массива popups 
    popups[key].element.querySelector('.popup__close-toggle').addEventListener('click', () => {
        closePopup(popups[key].element); // Вешаем листенер на крестик для закрытия
    });
   
    // листенер для нажатия за пределы попапа
    popups[key].element.addEventListener('click', (e) => {
      // получить открытый попап
      if (popups[key].element.classList.contains('popup_opened')) { 
        if (popups[key] && popups[key].element.contains(e.target)) { // если таковой есть и клик совершен за его пределы
            closePopup(e.target); // закрыть попап
        }
      }
    });
}

// Первоначальная инициализация галереи, создание карточек из исходных данных
initialCards.forEach((item) => {
    // Для каждой карточки создаем отдельный объект и указываем куда ее вставить,
    const card = new Card(item.name, item.link, '#gallery-template').generateCard();
    addItem(gallery, card);
});

// Event on the button in the profile
function profileFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popups["edit_profile"].element);
}

// Event on the button images editing and image add via submit
function newCardFormSubmitHandler(evt) { //функция добавления новой карточки 
    evt.preventDefault();
    const name = namePlace.value; //данные поля названия места
    const link = linkImage.value; //данные поля URL картинки
    const newCard = new Card(name, link, '#gallery-template').generateCard();
    addItem(gallery, newCard); // adding new card to the gallery
    namePlace.value = '';
    linkImage.value = '';
    closePopup(popups["add_new_card"].element);
}

// Listeners
buttonEdit.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.innerHTML;
    openPopup(popups["edit_profile"].element);
    editProfileValidation.resetErrorFormOpen();
}); // Open Edit Profile

buttonAdd.addEventListener('click', () => {
  popups["add_new_card"].element.querySelector('.popup__form-item_place').value = ''; //очищаем инпуты
  popups["add_new_card"].element.querySelector('.popup__form-item_link-img').value = '';
  openPopup(popups["add_new_card"].element);
  addCardValidation.resetErrorFormOpen();
 
}); // Open Add Image
const toggle = true; //рубильник
editProfileValidation.enableValidation(toggle);
addCardValidation.enableValidation(toggle);
formElement.addEventListener('submit', profileFormSubmitHandler); // submit Profile form
formElementAdd.addEventListener('submit', newCardFormSubmitHandler); // submit Add Card form

