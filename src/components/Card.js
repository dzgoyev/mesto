export default class Card {
    constructor ({data, cardSelector, handleCardClick, myId, handleTrashClick, handleSetCardLike, handleDeleteCardLike}) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._handleSetCardLike = handleSetCardLike;
        this._handleDeleteCardLike = handleDeleteCardLike;
        this._like = data.likes;
        this._ownerId = data.owner._id;
        this._cardId = data._id;
        this._myId = myId;
       
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
        const galleryTrash = this._element.querySelector('.gallery__trash');
        const galleryLike = this._element.querySelector('.gallery__like');
        const galleryLikeCounter = this._element.querySelector('.gallery__like-counter');
        this._setEventListeners();
        cardTitle.textContent = this._name;
        cardImg.src = this._link;  
        cardImg.alt = `${this._name} - фотография`;
//trash display Если фотки мои, показать корзину
        if (this._ownerId === this._myId) {
            galleryTrash.classList.add('gallery__trash_active');
        }
// --- end trash display
        galleryLikeCounter.textContent = this._like.length;
        this._like.some(item => {
            if (item._id === this._myId) {
                galleryLike.classList.add('gallery__like_active')
            }

       
    })
    return this._element;
}
    _handleLikeToggle (data) {
        this._element.querySelector('.gallery__like-counter').textContent = data.likes.length;
        this._element.querySelector('.gallery__like').classList.toggle('gallery__like_active');
       
    }
    
    _handleLikeClick(evt) {
        if(!evt.target.classList.contains('gallery__like_active')) {
            this._handleSetCardLike(`${this._cardId}`);
        } else {
            this._handleDeleteCardLike(`/likes/${this._cardId}`)
        }
        
    }
// ------------------------------
    _setEventListeners() {
     this._element.querySelector('.gallery__item').addEventListener('click', () => {
       this._handleCardClick(this._name, this._link);

     });
     this._element.querySelector('.gallery__like').addEventListener('click', (evt) => {
         this._handleLikeClick(evt);
     });

     this._element.querySelector('.gallery__trash').addEventListener('click', (evt) => {
        this._cardElement = evt.target.parentElement;
        this._handleTrashClick(this._cardId, this._cardElement);
    })

    }
           
}