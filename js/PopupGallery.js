// Увеличенное изображение карточки
class PopupGallery extends Popup {
    constructor (popupElement) {
        super(popupElement); // вызов конструктора родителя
        this._popupElement = popupElement;
        this._elementImage = this._popupElement.querySelector('.popup__image-src'); // элемент IMG
    }

    // Реализация отображения всплываюего окна для обображдения выбранного изображения
    show(imageURL) {       
        this._elementImage.src = imageURL; // Присваиваем изображение элементу IMG
        this._popupElement.classList.add('popup_opened')
    }   
}


 
 