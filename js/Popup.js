class Popup {
    constructor(selector) { //на вход селектор попапа
        this._selector = document.querySelector(selector);
    }

    open(){ //открытие попапа. Функция с прошлой версии работы (utils.js)
        this._selector.classList.add('popup_opened'); 
    document.addEventListener('keydown', this._handleEscClose());
    }

    close() {//закрытие попапа. Функция с прошлой версии работы
        this._selector.classList.remove('popup_opened');
        // document.removeEventListener('keydown', closePopupEsc);
    }

    _handleEscClose = (e) => { //закрытие на esc
        if (e.key === 'Escape') {
           this.close();
          }
        
    }

    setEventListeners () {//слушатель клика по кресту закрытия
        this._selector.addEventListener('click', (e) => { //если клик 
            if (e.target.clasList.contains('.popup__close-toggle')) {//попал по кресту
                this.close();//закрываем попап
            }
        })
    }

}