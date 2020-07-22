import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
    constructor(selector, loading) {
        super(selector);
        this._loading = loading;
        this._button = this._selector.querySelector('.popup__button')
    }

    open(cardId, element, api) {
        this._cardId = cardId;
        this._button.addEventListener('click', (evt) => {
            evt.preventDefault()
            this._loading(this._button, true, 'Удаление...')
            api.delete(`/${cardId}`)
            .then(() => {
                element.remove()
            })
            .finally(() => {
                this.close();
                this._loading(this._button, false, 'Удалить')
            })
        })
        super.open()
    }

    close() {
        super.close();
    }
}