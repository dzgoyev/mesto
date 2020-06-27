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

const editProfileValidation = new FormValidator(formOptions, formElement); //на яндексе я так понял хотят чтобы было так
const addCardValidation = new FormValidator(formOptions, formElementAdd);


// Массив попапов // Его пока оставил - вроде все работает нормально, но на яндексе почему-то недовольны
let popups = {};
popups["edit_profile"] = {'element': popupProfile };
popups["add_new_card"] = {'element': popupAddCard };
popups["view_image"] = {'element': popupImages};

// Массив форм с назначенными им валидаторами // Наверное этот массив стоит убрать
// let forms = {};
// forms["form__edit_profile"] = {
//     'element': popups["edit_profile"].element,
//     'validator': new FormValidator(formOptions, formElement)
// };
// forms["form__add_new_card"] = {
//     'element': popups["add_new_card"].element,
//     'validator': new FormValidator(formOptions, formElementAdd)
// };

// Add any item to container
function addItem(container, item) {
    container.prepend(item);
}
//getOpenedPopup() -- она точно пойдет на удаление
// Узнать открыт ли какой-либо попап. Если открыт, то вернуть ссылку на него в масиве popups, иначе вернуть false.
// Функция возвращает ПЕРВЫЙ открытый popup! Считаем его текущим, выидимым для пользователя.
// function getOpenedPopup() {
//     for (let key in popups) {
//         if (popups[key].element.classList.contains('popup_opened')) return popups[key];
//     }

//     return false;
// }

//Переписал эту функцию закрытия на Esc и вынес ее в utils.js
// function closePopupEsc(e) {
//     const openedPopup = document.querySelector('.popup_opened');
//     if (e.key === 'Escape') {
//       closePopup(openedPopup);
//     }
//   }
  

// // Открыть Popup. --- тоже вынес в utils.js
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupEsc); 
// }
// Закрыть Popup. --- тоже вынес в utils.js
// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closePopupEsc);
// }

// Включить валидацию формы. - Это тоже не нужно будет. Лишняя функция
// formName - название формы, toggle - true/false
// function enableFormValidation(formName, toggle) {
//     if (formName in forms && forms[formName].validator !== undefined) {
//         forms[formName].validator.enableValidation(toggle);
//     }
// }

for (let key in popups) { // Инициализация попапов из массива popups -- оставил но если убирать массив то надо переделать
    popups[key].element.querySelector('.popup__close-toggle').addEventListener('click', () => {
        closePopup(popups[key].element); // Вешаем листенер на крестик для закрытия
    });
   
    // листенер для нажатия за пределы попапа -- оставил, но если убирать массив то надо переделать
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
const toggle = true; 
editProfileValidation.enableValidation(toggle);
addCardValidation.enableValidation(toggle);
formElement.addEventListener('submit', profileFormSubmitHandler); // submit Profile form
formElementAdd.addEventListener('submit', newCardFormSubmitHandler); // submit Add Card form

