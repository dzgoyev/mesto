export default class Popup {
    constructor(selector) { //на вход селектор попапа
        this._selector = document.querySelector(selector);
        this._handleEscClose = (e) => { //закрытие на esc
            if (e.key === 'Escape') {
             this.close();
            }
      }

    }
    
    open() { //открываем попапы
        this.setEventListeners();
        this._selector.classList.add('popup_opened'); 
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() { //закрываем попапы 
        this._selector.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    setEventListeners () {
        this._selector.addEventListener('click', (e) => { 
            if (e.target.classList.contains('popup__close-toggle') || (e.target.classList.contains('popup'))) {//попал по кресту ИЛИ попапу
                this.close();//закрываем попап
           
            }
    
    })
}
  
 }