// import {popupImages, openPopup} from './utils.js';

export default class Card {
    constructor (name, link, cardSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }
    //найти шаблон, извлечь его содержимое, найти в нем элемент с классом gallery__container, клонировать его
    _getTemplate () {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.gallery__container').cloneNode(true);
        return cardElement; // вернуть клон   
    } 

    generateCard() {//метод для вставки в разметку
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.gallery__title').textContent = this._name;
        this._element.querySelector('.gallery__item').src = this._link;  
        this._element.querySelector('.gallery__item').alt = `${this._name} - фотография`;
        return this._element;
    }
     
    _handleLikeToggle () {
        this._element.querySelector('.gallery__like').classList.toggle('gallery__like_active');
    }
    _handleCardDelete () {
        this._element.querySelector('.gallery__trash').closest('.gallery__container').remove();
    }
    // _handleOpenPopup () {
    //     openPopup(popupImages);
    //     document.querySelector('.popup__image-src').src = this._link;
    // }

    //  handleCardClick () {
    //      openPopup(popupImages);
    //  document.querySelector('.popup__image-src').src = this._link;

    // }

    _setEventListeners() {
     this._element.querySelector('.gallery__item').addEventListener('click', () => {
         this._handleCardClick(this._name, this._link);

     });
     this._element.querySelector('.gallery__like').addEventListener('click', () => {
         this._handleLikeToggle();
     });
     this._element.querySelector('.gallery__trash').addEventListener('click', () => {
        this._handleCardDelete();
     })
    }
           
}