<<<<<<< HEAD
import { initialCards, formOptions } from './data.js';
import { Card } from './Card.js';
import {FormValidator} from './FormValidator.js';
import {PopupGallery} from './PopupGallery.js';
import {PopupNewCard} from './PopupNewCard.js';
import {PopupProfile} from './PopupProfile.js';
=======
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, formOptions} from './data.js';

// Popups
const popupProfile = document.querySelector('.popup'); //popup profile (other be its elements)
const popupAddCard = document.querySelector('.popup__add'); // popup for adding a card
const popupImages = document.querySelector('.popup__images'); // popup for large images

// buttons
// const submit = popupProfile.querySelector('.popup__form-button'); //button in the profile form
const buttonEdit = document.querySelector('.profile__button-edit'); //save button in the profile form edit
const buttonAdd = document.querySelector('.profile__button-add'); //button in the adding form

>>>>>>> temp


// ----- Элементы документа, необходимые для создания объектов
// Popups
const elementPopupProfile = document.querySelector('.popup'); //popup profile (other be its elements)
const elementPopupAddCard = document.querySelector('.popup__add'); // popup for adding a card
const elementPopupImages = document.querySelector('.popup__images'); // popup for large images

<<<<<<< HEAD
// Buttons
const buttonEditProfile = document.querySelector('.profile__button-edit'); //save button in the profile form edit
const buttonAddNewCard = document.querySelector('.profile__button-add'); //button in the adding form

// Inputs and output fileds profile
const labelProfileName = document.querySelector('.profile__name'); //name element on the page
const labelProfileJob = document.querySelector('.profile__job'); //name job jn the page


// ------ Галерея Карточек
// создаем объект для всплывающего окна изображения карточки в галереи, но не отображаем его
const popupGallery = new PopupGallery(elementPopupImages); 
// Первоначальная инициализация галереи, создание карточек из исходных данных
initialCards.forEach((item) => {
  // Для каждой карточки создаем отдельный объект и указываем в какую галерею ее вставить,
  // а так же в каком всплывающем окне отображать увеличенное изображение
  const card = new Card(item.name, item.link, '#gallery-template', popupGallery);
  const cardElement = card.generateCard(); // генереция HTML карточки
  document.querySelector('.gallery').prepend(cardElement);
});

// ------- Добавление новой карточки после заполнения формы
// создаем объект для всплывающего окна с формой
let popupFormNewCard = new PopupNewCard(elementPopupAddCard, popupGallery);
buttonAddNewCard.addEventListener('click', () => {
  // Отобразить форму
  popupFormNewCard.show();
}); // Open Add Image

=======
// //Template
// const galleryTemplate = document.querySelector('#gallery-template').content;

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


// Toggle popup
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}
// Add any item to container
function addItem(container, item) {
  container.prepend(item);
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
  togglePopup(popupProfile);
 
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
  togglePopup(popupAddCard);
}
>>>>>>> temp

// --------- редактирования профиля
// создаем объект для всплывающего окна с формой
const popupFormEditProfile = new PopupProfile(elementPopupProfile, labelProfileName, labelProfileJob);
// Listeners
<<<<<<< HEAD
buttonEditProfile.addEventListener('click', () => {
  // Отобразить форму с заполнеными полями
  popupFormEditProfile.show(labelProfileName.innerHTML, labelProfileJob.innerHTML);
}); // Open Edit Profile

=======
buttonEdit.addEventListener('click', () => {
 nameInput.value =  profileName.textContent;
 jobInput.value = profileJob.innerHTML;
 togglePopup(popupProfile);
//  popupErrorClear();
  
}); // Open Edit Profile
buttonAdd.addEventListener('click', () => {
  togglePopup(popupAddCard);
  // popupErrorClear();
}); // Open Add Image
formElement.addEventListener('submit', profileFormSubmitHandler); // submit Profile form
formElementAdd.addEventListener('submit', newCardFormSubmitHandler); // submit Add Card form

// Init close buttons listeners
const popupCloseButtons = document.getElementsByClassName(
  'popup__close-toggle'
  
);
>>>>>>> temp

// --------- Создание валидатора для каждой формы
const formList = Array.from(document.querySelectorAll(formOptions.formSelector)); //Находим все формы
  formList.forEach((formElement) => { //перебираем массив форм
    (new FormValidator(formOptions, formElement)).enableValidation(true); // содаем валидатор связанный с формой и сразу включаем его
  });

// --------- Создание валидатора для каждой формы
const formList = Array.from(document.querySelectorAll(formOptions.formSelector)); //Находим все формы
  formList.forEach((formElement) => { //перебираем массив форм
    (new FormValidator(formOptions, formElement)).enableValidation(true); // содаем валидатор связанный с формой и сразу включаем его
  });

// -------- Общие обработчики документа
<<<<<<< HEAD
  const popupAll = Array.from(document.querySelectorAll('.popup'));

// закрытие на черном фоне
=======
const popupAll = Array.from(document.querySelectorAll('.popup'));
// ------ закрытие на черном фоне
>>>>>>> temp
const popupCloseOnBackground = (item) => document.addEventListener('click', (e) => {
  item.forEach(function (item) {
    if (e.target.className != item) {
      e.target.classList.remove('popup_opened');
    }

  })
});
popupCloseOnBackground(popupAll);

// Закрытие на Escape
const popupCloseOnEsc = (item) => document.addEventListener('keydown', (e) => {
  item.forEach(function (item) {
    if (e.key === 'Escape') {
      item.classList.remove('popup_opened');
    }
  });
})
<<<<<<< HEAD
popupCloseOnEsc(popupAll);
=======
popupCloseOnEsc(popupAll);

export {popupImages};
>>>>>>> temp
