class PopupWithImage extends Popup {
    constructor(selector) { //на вход селектор попапа
        super(selector);
    }
    open (link, name) {//перезаписать метод open от предка Popup
        //вставить в  popup картинку с атрубитами src и alt
        this._element = this._selector.querySelector('.popup__images');
        this._element.querySelector('.gallery__title').textContent = this._name;
        this._element.querySelector('.gallery__item').src = this._link;  
        this._element.querySelector('.gallery__item').alt = `${this._name} - фотография`;

        super.open();
    }
}