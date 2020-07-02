class PopupWithForm extends Popup { // для каждого попапа добавить свой экз этого класса
    constructor (selector, submit) { 
        super(selector); 
        this._submit = submit;
        this._form = this._selector.querySelector('popup__form'); //получить ЭТУ форму
    }

    

    _getInputValues() { // собирает данные всех инпутов
        this.inputData = {}; //пустой объект - он будет наполняться данными с инпутов
        this._inputList = this._selector.querySelectorAll('.popup__input'); //найти все инпуты
        this._inputList.forEach(element => this._inputData[element.name] = input.value); //заполняем объект данными
        return this._inputData;
            
       


    }

    open() {
        this._setEventListeners();
        super.open();
    }

    close() {   //перезаписываем метод close() из предка (добавляем сброс формы)
        super.close();
        this._form.reset();

    }
    _handleSubmit = (e) => { //дописываем к существующему в родителе обработчику клика обработчик сабмита
        e.preventDefault();
        this.close();

    }

    _setEventListeners() { //перезаписываем родительский метод (как и у предка он публичный)
        super(selector);
    
    this._handleSubmit ();


    }
}