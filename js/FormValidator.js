export class FormValidator {
  constructor(formOptions, formElement) {
    this._formOptions = formOptions;
    this._formElement = formElement;
    this._isValidated = false;
  }

  _hasInvalidInput(inputList) {
    //принимаем массив полей
    return inputList.some((inputElement) => {
      //проверяем через метод some наличие хотя бы одного не валидного поля
      return !inputElement.validity.valid; //возвращает false - если все валидно
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._setSubmitInactive(buttonElement)
    } else {
      this._setSubmitActive(buttonElement)
    }
  }

  // Сделать кнопку активной
  _setSubmitActive(buttonElement) {
    buttonElement.classList.remove(this._formOptions.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }

  // Сделать кнопку неактивной
  _setSubmitInactive(buttonElement) {
    buttonElement.classList.add(this._formOptions.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  //Показать ошибки
  _showInputError(formElement, inputElement, errorMessage) {
    //на вход форму, инпут и браузерное сообщение
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //находим нужный span через id
    inputElement.classList.add(this._formOptions.inputErrorClass); // активировать ошибку в нужном инпуте
    errorElement.textContent = errorMessage; //записать ошибку в span
    errorElement.classList.add(this._formOptions.errorClass); // включить класс в span
  }
  //Скрыть ошибки
  _hideInputError(formElement, inputElement) {
    //на вход форму и инпут, далее все как выше, но наоборот
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._formOptions.inputErrorClass);
    errorElement.classList.remove(this._formOptions.errorClass);
    errorElement.textContent = ""; //очищаем span
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  // Включить или выключить валидацию формы
  enableValidation(toggle) {
      if(toggle) this._setEventListeners();       // если true, то включить валидацию
      else elementFormProfile.removeEventListener("input"); // инчае выключить
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._formOptions.inputSelector)
    ); //массив всех инпутов формы
    const buttonElement = this._formElement.querySelector(
      this._formOptions.submitButtonSelector
    ); //найти в форме нопку сабмита
    this._toggleButtonState(inputList, buttonElement);

    // Сохраняем текущий контекст, чтобы использовать его ниже
    const outterThis = this;

    inputList.forEach((inputElement) => {
      //вешаем на инпуты обработчик
      inputElement.addEventListener("input", function () {
        outterThis._checkInputValidity(outterThis._formElement, inputElement); // получаем форму и инпут, проверяем валидность инпута
        outterThis._toggleButtonState(inputList, buttonElement);
      });
    });

    // После submit формы, делаем кнопку неактивной
    this._formElement.addEventListener("submit", function() {
      outterThis._setSubmitInactive(buttonElement);
    });
  }
}
