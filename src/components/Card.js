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
        const cardImg = this._element.querySelector('.gallery__item');
        const cardTitle = this._element.querySelector('.gallery__title');
        this._setEventListeners();
        cardTitle.textContent = this._name;
        cardImg.src = this._link;  
        cardImg.alt = `${this._name} - фотография`;
        return this._element;
    }
        
    _handleLikeToggle () {
        this._element.querySelector('.gallery__like').classList.toggle('gallery__like_active');
    }
    
    _handleCardDelete () {
        this._element.querySelector('.gallery__trash').closest('.gallery__container').remove();
        this._element = null;
    }
    
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