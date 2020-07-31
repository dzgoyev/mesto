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
const popupAddCard = document.querySelector('.popup_add'); //попап добавления карточек
const popupDeleteCard = new PopupDeleteCard('.popup_delete', loading, handleDeleteCard); // попап подтверждения удаления карточек

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
const popupAvatar = document.querySelector('.popup_avatar'); //попап аватара
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

const userInfo = new UserInfo({name: profileName, job: profileJob}, profileAvatar,
    function(data) {
        return api.editProfile(data).then(data => {
            profileName.textContent = data.name;
            profileJob.textContent = data.about;
        });
},
    function (data) {
        return api.updateAvatar(data).then(data => {
                profileAvatar.setAttribute('src', data.avatar)
            });
}, function(data) {
        return api.getUserInfo().then(data => {
            this._name.textContent = data.name;
            this._job.textContent =  data.about;
            this._avatar.setAttribute('src', data.avatar);
            return data._id;
        });
});

//Турникеты
const editProfileValidation = new FormValidator(formOptions, formElement);
const addCardValidation = new FormValidator(formOptions, formElementAdd);
const formAvatarValidation = new FormValidator(formOptions, formElementAvatar);
const popupWithImages = new PopupWithImage('.popup_images'); // popup for large images

const popupWithFormProfile = new PopupWithForm({
    selector: '.popup',
    submit: (data) => {
        loading(buttonSubmitEdit, true, 'Сохранение...')
        userInfo.setUserInfo(data)
        .finally(() => {
            popupWithFormProfile.close()
            loading(buttonSubmitEdit, false, 'Сохранить')

        })
    }

});

let cardList = null;
userInfo.getUserProfile().then(id => {
api.getInitialCards().then(function(items) {
    cardList = new Section ({
    data: items,
    renderer: (item) => {
        const card = new Card({
            data: item, cardSelector: '#gallery-template', handleCardClick: handleCardClick,
            api: api, myId: id, handleTrashClick, handleSetCardLike, handleDeleteCardLike
        }).generateCard();
        cardList.addItem(card);
    }
}, cardListSelector) // в утилитах
cardList.renderItems();
})
})

const popupWithFormAddCard = new PopupWithForm({
    selector: '.popup_add',
    submit: (data) => {
        loading(buttonSubmitAdd, true, 'Сохранение...')
        api.addNewCard(data).then(data => {
                    const card = new Card({
                        data, cardSelector: '#gallery-template', handleCardClick: handleCardClick,
                        api: api, myId: data.owner._id, handleTrashClick, handleSetCardLike, handleDeleteCardLike
                    }).generateCard();
                    cardList.addItem(card);
            }, cardListSelector);

            cardList.renderItems()
                popupWithFormAddCard.close();
                loading(buttonSubmitAdd, false, 'Создать');

    }
})

// -----------------
const popupEditAvatar = new PopupWithForm({
    selector: '.popup_avatar',
    submit: (data) => {
        loading(buttonAvatar, true, 'Сохранение...')
        userInfo.setUserAvatar(data)
            .finally(() => {
                popupEditAvatar.close()
                loading(buttonAvatar, false, 'Сохранить')
            })
    }
})

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
        button.removeAttribute('disabled')
        button.textContent = text;
    }
    else {
        button.setAttribute('disabled', true)
        button.textContent = text;
    }
}
function handleCardClick (name, link) {
    popupWithImages.open(name, link);
}

function editUserAvatar() {
    const userAvatar = userInfo.getUserAvatar();
    inputAvatarLink.value = userAvatar.link;
    popupEditAvatar.open();
    formAvatarValidation.enableValidation();
}

function handleSetCardLike(cardId) {
    api.setLikes(cardId)
    .then(data => {
        this._handleLikeToggle(data)
    })
}

function handleDeleteCardLike(cardId) {
    api.delete(cardId)
    .then(data => {
        this._handleLikeToggle(data)
    })
}

function handleTrashClick(cardId, element) {
    popupDeleteCard.open(cardId, element)
}

function handleDeleteCard(cardId, element) {
    api.delete(`/${cardId}`)
        .then(() => {
            element.remove()
        })
        .finally(() => {
            this.close();
            this._loading(this._button, true, 'Удалить')
        })
}

// Радары
popupWithImages.setEventListeners();
popupDeleteCard.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupWithFormProfile.setEventListeners();
popupEditAvatar.setEventListeners();
