import { initialCards, formOptions } from './data.js';
import { Card } from './Card.js';
import {FormValidator} from './FormValidator.js';
import {PopupGallery} from './PopupGallery.js';
import {PopupNewCard} from './PopupNewCard.js';
import {PopupProfile} from './PopupProfile.js';


// ----- Элементы документа, необходимые для создания объектов
// Popups
const elementPopupProfile = document.querySelector('.popup'); //popup profile (other be its elements)
const elementPopupAddCard = document.querySelector('.popup__add'); // popup for adding a card
const elementPopupImages = document.querySelector('.popup__images'); // popup for large images

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


// --------- редактирования профиля
// создаем объект для всплывающего окна с формой
const popupFormEditProfile = new PopupProfile(elementPopupProfile, labelProfileName, labelProfileJob);
// Listeners
buttonEditProfile.addEventListener('click', () => {
  // Отобразить форму с заполнеными полями
  popupFormEditProfile.show(labelProfileName.innerHTML, labelProfileJob.innerHTML);
}); // Open Edit Profile


// --------- Создание валидатора для каждой формы
const formList = Array.from(document.querySelectorAll(formOptions.formSelector)); //Находим все формы
  formList.forEach((formElement) => { //перебираем массив форм
    (new FormValidator(formOptions, formElement)).enableValidation(true); // содаем валидатор связанный с формой и сразу включаем его
  });


// -------- Общие обработчики документа
  const popupAll = Array.from(document.querySelectorAll('.popup'));

// закрытие на черном фоне
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
popupCloseOnEsc(popupAll);