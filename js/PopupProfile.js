// Всплывающее окно с формой редактирования профиля
class PopupProfile extends Popup {
    // Параметры конструкутора: элемент попапа формы, элементы надписей для name и job 
    constructor (popupElement, nameLabel, jobLabel) {
        super(popupElement); // вызываем конструктор родительского класса

        this._popupElement = popupElement;
        this._nameLabel = nameLabel;
        this._jobLabel = jobLabel;

        // Ссылки на поля ввода формы
        this._inputName = this._popupElement.querySelector('.popup__form-item_name');
        this._inputJob = this._popupElement.querySelector('.popup__form-item_job');
    }
    // Отобразить всплывающее окно с формой для редактирования Profile
    show(name, job) {       
        // Кнопка сохранить в данной форме должна быть сразу активна при открытии формы
        this._popupElement.querySelector('button.popup__button').classList.remove(formOptions.inactiveButtonClass);
        this._popupElement.querySelector('button.popup__button').removeAttribute("disabled");
        
        // Заполняем поля для ввода текущими значениями Profile
        this._inputName.value = name;
        this._inputJob.value = job;

        // Показать форму
        this._popupElement.classList.add('popup_opened')
    }

    // Логика обработки данных формы после нажатия Сохранить
    _submit() {
        // Обновляем элементы надписей новыми значениями, которые были введены в поля формы
        this._nameLabel.textContent = this._inputName.value;
        this._jobLabel.textContent = this._inputJob.value;
    }

    _setEventListeners() {
        // Вызовов медота назначения обработчиков родитеского класса в первую очередь,
        super._setEventListeners(); 
        
        // а затем уже обработчики текущего класса
        document.querySelector('.popup__form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit();
            this.hide();
        });
    }
}


 
 