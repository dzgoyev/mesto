import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {formOptions, token} from '../utils/data.js';
import {cardListSelector } from '../utils/utils.js'; //CardListSelector (проектная работа 8)
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import Api from '../components/Api';

const api = new Api(token);

// Попапы
const popupProfile = document.querySelector('.popup'); //попап профиля основной
const popupAddCard = document.querySelector('.popup__add'); //попап добавления карточек
const popupDeleteCard = new PopupDeleteCard('.popup__delete', loading); // попап подтверждения удаления карточек

// buttons
// const submit = popupProfile.querySelector('.popup__form-button'); //button in the profile form
const buttonEdit = document.querySelector('.profile__button-edit'); //save button in the profile form edit
const buttonAdd = document.querySelector('.profile__button-add'); //button in the adding form
// const button = document.querySelector('.popup__button'); //общий батон

// Forms
const formElement = document.querySelector('.popup__form'); // profile editing form
const formElementAdd = document.querySelector('.popup__form_add'); // form for add images
const buttonSubmitEdit = formElement.querySelector('.popup__form-submit_edit');
const buttonSubmitAdd = formElementAdd.querySelector('.popup__form-submit_add');

//Avatar
const popupAvatar = document.querySelector('.popup__avatar'); //попап аватара
const formElementAvatar = popupAvatar.querySelector('.popup__form_avatar_update');//форма аватара
const buttonAvatar = formElementAvatar.querySelector('.popup__button');//кнопка формы аватара
const profileAvatar = document.querySelector('.profile__avatar');//фото аватара
const inputAvatarLink = formElementAvatar.querySelector('.popup__form-item_link-img');//ссылка в форме 

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
const profileFoto = document.querySelector('.profile__foto-container');

const userInfo = new UserInfo({name: profileName, job: profileJob, api: api}, profileAvatar);

//Турникеты
const editProfileValidation = new FormValidator(formOptions, formElement); 
const addCardValidation = new FormValidator(formOptions, formElementAdd);
const formAvatarValidation = new FormValidator(formOptions, formElementAvatar);
const popupWithImages = new PopupWithImage('.popup__images'); // popup for large images

const popupWithFormProfile = new PopupWithForm({
    selector: '.popup', 
    submit: (values) => {
        loading(buttonSubmitEdit, true, 'Сохранение...')
        userInfo.setUserInfo(values).then(data => {
            profileName.textContent = data.name;
            profileJob.textContent = data.about;
        })
        .finally(() => {
            popupWithFormProfile.close()
            loading(buttonSubmitEdit, false, 'Сохранить')
               
        })
    }

});

const popupWithFormAddCard = new PopupWithForm({
    selector: '.popup__add',
    submit: (data) => {
        loading(buttonSubmitAdd, true, 'Сохранение...') 
        api.addNewCard(data).then(data => {
            const cardList = new Section({
                data: [data],
                renderer: (item) => {
                    const card = new Card({
                        data: item,
                        cardSelector: '#gallery-template',
						handleCardClick: handleCardClick,
                         api: api,
                         myId: item.owner._id,
                         handleTrashClick: (cardId, element, api) => {
                            popupDeleteCard.open(cardId, element, api)
                        },
                    }).generateCard();
					cardList.addItem(card); 
                }
            }, cardListSelector);
            
            cardList.renderItems()
        })
        .finally(() => {
            popupWithFormAddCard.close();
            loading(buttonSubmitAdd, false, 'Сохранить');
        })
    }
})

userInfo.getUserProfile().then(id => {
api.getInitialCards().then(function(items) {
    const cardList = new Section ({
    data: items,
    renderer: (item) => {
        const card = new Card({data: item, cardSelector: '#gallery-template', handleCardClick: handleCardClick, api: api, myId: id,
         handleTrashClick: (cardId, element, api) => {
            popupDeleteCard.open(cardId, element, api);
        }
        }).generateCard();
        cardList.addItem(card);
    }  
}, cardListSelector) // в утилитах
cardList.renderItems();
})
})

const popupEditAvatar = new PopupWithForm({
    selector: '.popup__avatar',
    submit: (data) => {
        loading(buttonAvatar, true, 'Сохранение...')
        userInfo.editUserAvatar(data)
            .then(data => {
                profileAvatar.setAttribute('src', data.avatar) 
            })
            .finally(() => {
                popupEditAvatar.close()
                loading(buttonAvatar, false, 'Сохранить')
            })
    }
})

function editUserAvatar() {
    const userAvatar = userInfo.getUserAvatar();
    inputAvatarLink.value = userAvatar.link;
    popupEditAvatar.open();
    formAvatarValidation.enableValidation();
}

profileFoto.addEventListener('click', editUserAvatar)

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
// Включить или выключить валидацию у нужной формы
editProfileValidation.enableValidation(toggle);
addCardValidation.enableValidation(toggle);
formAvatarValidation.enableValidation(toggle);

//функции
function loading (button, isLoading, text) { 
    if(isLoading) {
        button.setAttribute('disabled', true)
        button.textContent = text;
    }
    else {    
        // button.removeAttribute('disabled')
        button.textContent = text;
    }
}
function handleCardClick (name, link) {
    popupWithImages.open(name, link);
}

// Радары
popupWithImages.setEventListeners();
popupDeleteCard.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupWithFormProfile.setEventListeners();
popupEditAvatar.setEventListeners();
