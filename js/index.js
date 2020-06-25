import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, formOptions} from './data.js';

// Popups
const popupProfile = document.querySelector('.popup'); //popup profile (other be its elements)
const popupAddCard = document.querySelector('.popup__add'); // popup for adding a card
const popupImages = document.querySelector('.popup__images'); // popup for large images

// buttons
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

// Listeners
buttonEdit.addEventListener('click', () => {
 nameInput.value =  profileName.textContent;
 jobInput.value = profileJob.innerHTML;
 togglePopup(popupProfile);
  
}); // Open Edit Profile
buttonAdd.addEventListener('click', () => {
  togglePopup(popupAddCard);
  
}); // Open Add Image
formElement.addEventListener('submit', profileFormSubmitHandler); // submit Profile form
formElementAdd.addEventListener('submit', newCardFormSubmitHandler); // submit Add Card form

// Init close buttons listeners
const popupCloseButtons = document.getElementsByClassName(
  'popup__close-toggle'
);

for (let i = 0; i < popupCloseButtons.length; i++) {
  popupCloseButtons[i].addEventListener('click', () => {
    togglePopup(document.querySelector('.popup_opened'));
  });
}

// --------- Создание валидатора для каждой формы
const formList = Array.from(document.querySelectorAll(formOptions.formSelector)); //Находим все формы
  formList.forEach((formElement) => { //перебираем массив форм
    (new FormValidator(formOptions, formElement)).enableValidation(true); // содаем валидатор связанный с формой и сразу включаем его
  });

// -------- Общие обработчики документа
const popupAll = Array.from(document.querySelectorAll('.popup'));
// ------ закрытие на черном фоне
const popupCloseOnBackground = (item) => document.addEventListener('click', (e) => {
  item.forEach(function (item) {
    if (e.target.className != item) {
      e.target.classList.remove('popup_opened');
    }

  })
});
popupCloseOnBackground(popupAll);

//----- Закрытие на Escape
const popupCloseOnEsc = (item) => document.addEventListener('keydown', (e) => {
  item.forEach(function (item) {
    if (e.key === 'Escape') {
      item.classList.remove('popup_opened');
    }
  });
})
popupCloseOnEsc(popupAll);

export {popupImages};