import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
    constructor(selector, loading, handleDeleteCard) {
        super(selector);
        this._loading = loading;
        this._handleDeleteCard = handleDeleteCard;
        this._button = this._selector.querySelector('.popup__button')

        // Листенер на удаление карты
        this._button.addEventListener('click', (evt) => {this._deleteButtonListener(evt) });
    }

    open(cardId, element) {
        this._cardId = cardId;
        this._element = element;
        super.open()
    }

    // Обработчик события удаления карточки
    _deleteButtonListener(evt) {
        evt.preventDefault();
        this._loading(this._button, true, 'Удаление...');
        this._handleDeleteCard(this._cardId, this._element);
    }

    close() {
        super.close();
    }
}