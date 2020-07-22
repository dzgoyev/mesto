import Popup from './Popup.js';

export default class PopupWithForm extends Popup { // для каждого попапа добавить свой экз этого класса
    constructor ({selector, submit}) {  //передаем селектор попапа и колбэк самбита формы
        super(selector); 
        this._submit = submit;
        this._clickOnSubmit = (e) => { //дописываем к существующему в родителе обработчику клика обработчик сабмита
            e.preventDefault();
            this._submit(this._getInputValues());
            // this.close();
        }
        this._form = this._selector.querySelector('.popup__form'); //получить ЭТУ форму
    }
    _getInputValues() { // собирает данные всех инпутов
        this._inputDataInput = {}; //пустой объект - он будет наполняться данными с инпутов
        this._inputList = this._selector.querySelectorAll('.popup__input'); //найти все инпуты
        this._inputList.forEach(input => this._inputDataInput[input.name] = input.value); //заполняем объект данными
        return this._inputDataInput;

    }
    open() {
        // this.setEventListeners();
        super.open();
    }

    close() {   //перезаписываем метод close() из предка (добавляем сброс формы)
        super.close();
        this._form.removeEventListener('submit', this._clickOnSubmit);
        this._form.reset();

    }
    setEventListeners() { //перезаписываем родительский метод  (обработчик клика иконке закрытия идет из предка)
        super.setEventListeners();
        this._form.addEventListener('submit', this._clickOnSubmit);
       
    }
}