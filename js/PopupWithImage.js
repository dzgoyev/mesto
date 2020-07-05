import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(selector) { //на вход селектор попапа
        super(selector);
    }
    open (name, link) {//перезаписать метод open от предка Popup
        //вставить в  popup картинку с атрубитами src и alt
        super.open();
        this._element = this._selector.querySelector('.popup__image-src');
        this._element.src = link;  
        this._element.alt = `${name} - фотография`;
        this._selector.querySelector('.popup__caption').textContent = name;        
    }
}

