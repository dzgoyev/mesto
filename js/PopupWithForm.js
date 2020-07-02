class PopupWithForm extends Popup { // для каждого попапа добавить свой экз этого класса
    constructor (selector, submit) { 
        super(selector); 
        this._submit = submit;
        this._form = this._selector.querySelector('popup__form'); //получить ЭТУ форму
    }

    

    _getInputValues() { // собирает данные всех инпутов
        this.inputData = {}; //пустой объект - он будет наполняться данными с инпутов
        this._inputList = this._selector.querySelectorAll('.popup__input'); //найти все инпуты
        this._inputList.forEach(element => this._inputData[element.]{
            
        });


    }

    close() {   //перезаписываем метод close() из предка (добавляем сброс формы)
        super.close();
        this._form.reset();

    }
 

    _setEventListeners() { //перезаписываем родительский метод (как и у предка он публичный)
        super(selector);
    //дописываем к существующему в родителе обработчику клика обработчик сабмита
    this._handleSubmit = (e) => {
        e.preventDefault();
        this.close();

    }


    }
}