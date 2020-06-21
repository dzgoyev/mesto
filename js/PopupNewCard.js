import {Popup} from './Popup.js';
import {Card} from './Card.js';


// Всплывающее окно с формой добавления новой карточки в галерею
export class PopupNewCard extends Popup {
    constructor (popupElement, popupGallery) {
        super(popupElement); // вызываем конструктор родительского класса

        this._popupElement = popupElement;
        this._container = document.querySelector('.main');
        this._gallery = this._container.querySelector('.gallery'); //all gallery
        this._popupGallery = popupGallery;
        this._name = '';
        this._link = '';
    }

    // Отображение всплывающего окна с формой для добавления новой карточки в галерею
    show() {       
        this._popupElement.classList.add('popup_opened')
    }
    // Add any item to container
    _addItem(container, item) {
        container.prepend(item);
    }

    _submit() {
        const namePlace = this._popupElement.querySelector('.popup__form-item_place'); //name place in the form add
        const linkImage = this._popupElement.querySelector('.popup__form-item_link-img'); //link img in the form add

        const newCard = new Card(namePlace.value, linkImage.value, '#gallery-template', this._popupGallery); // creating new card
        this._addItem(this._gallery, newCard.generateCard()); // adding new card to the gallery
        namePlace.value = '';
        linkImage.value = '';
    }
  
    _setEventListeners() {
        // Вызовов медота назначения обработчиков родитеского класса в первую очередь,
        super._setEventListeners(); 
        
        // а затем уже обработчики текущего класса
        // Event on the button images editing and image add via submit
        document.querySelector('form.popup__form_add').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit();
            this.hide();
        });
    }
}


 
 