// Увеличенное изображение карточки
import {Popup} from './Popup.js';


export class PopupGallery extends Popup {
    constructor (popupElement) {
        super(popupElement); // вызов конструктора родителя
        this._popupElement = popupElement;
        this._elementImage = this._popupElement.querySelector('.popup__image-src'); // элемент IMG
        
        
    }

    // Реализация отображения всплываюего окна для обображдения выбранного изображения
    show(imageURL, alt) {       
        this._elementImage.src = imageURL; // Присваиваем изображение элементу IMG
        this._elementImage.alt = alt;
        this._popupElement.classList.add('popup_opened')
    }   
}


 
 