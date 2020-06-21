// Родительский класс для всплывающих окон
export class Popup {
    constructor (popupElement) {
        this._popupElement = popupElement;
        this._setEventListeners();
    }

    // Отобразить окно. Реализовано в дочерних классах 
    show() {  
         
        return;
    }
    // Закрытие окна
    hide() {
        this._popupElement.classList.remove('popup_opened');        
    }

    _setEventListeners() {
        // отдельный обработчик нажатия на кнопку закрытия popup
        this._popupElement.querySelector('.popup__close-toggle').addEventListener('click', () => {
            this.hide();
        });
    }   
}


 
 