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

// Массив попапов
let popups = {};
popups["edit_profile"] = {'element': popupProfile };
popups["add_new_card"] = {'element': popupAddCard };
popups["view_image"] = {'element': popupImages};

// Массив форм с назначенными им валидаторами
let forms = {};
forms["form__edit_profile"] = {
    'element': popups["edit_profile"].element,
    'validator': new FormValidator(formOptions, formElement)
};
forms["form__add_new_card"] = {
    'element': popups["add_new_card"].element,
    'validator': new FormValidator(formOptions, formElementAdd)
};

// Add any item to container
function addItem(container, item) {
    container.prepend(item);
}

// Узнать открыт ли какой-либо попап. Если открыт, то вернуть ссылку на него в масиве popups, иначе вернуть false.
// Функция возвращает ПЕРВЫЙ открытый popup! Считаем его текущим, выидимым для пользователя.
function getOpenedPopup() {
    for (let key in popups) {
        if (popups[key].element.classList.contains('popup_opened')) return popups[key];
    }

    return false;
}

// Открыть Popup.
// popup - DOM-элемент попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');

    for (let i=0; i < popup.getElementsByTagName('form').length; i++) {
        let formName = popup.getElementsByTagName('form').item(i).attributes.name.value;
        enableFormValidation(formName, true);
    }
}

// Закрыть Popup.
// popup - DOM-элемент попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');

    for (let i=0; i < popup.getElementsByTagName('form').length; i++) {
        let formName = popup.getElementsByTagName('form').item(i).attributes.name.value;
        enableFormValidation(formName, false);
    }
}

// Включить валидацию формы.
// formName - название формы, toggle - true/false
function enableFormValidation(formName, toggle) {
    if (formName in forms && forms[formName].validator !== undefined) {
        forms[formName].validator.enableValidation(toggle);
    }
}

for (let key in popups) { // Инициализация попапов из массива popups
    popups[key].element.querySelector('.popup__close-toggle').addEventListener('click', () => {
        closePopup(popups[key].element); // Вешаем листенер на крестик для закрытия
    });

    // листенер для нажатия за пределы попапа
    popups[key].element.addEventListener('click', (e) => {
        let openedPopup = getOpenedPopup(); // получить открытый попап
        if (openedPopup && openedPopup.element.contains(e.target)) { // если таковой есть и клик совершен за его пределы
            closePopup(e.target); // закрыть попап
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
}); // Open Edit Profile
buttonAdd.addEventListener('click', () => {
    openPopup(popups["add_new_card"].element);
}); // Open Add Image
formElement.addEventListener('submit', profileFormSubmitHandler); // submit Profile form
formElementAdd.addEventListener('submit', newCardFormSubmitHandler); // submit Add Card form

// -------- Общие обработчики документа
// Закрытие на Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        let openedPopup = getOpenedPopup();
        if (openedPopup) {
            closePopup(openedPopup.element);
        }
    }
});

export {popupImages, openPopup};