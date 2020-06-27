// import { initialCards, formOptions } from "./data";

export default class FormValidator { //класс валидатор формы
  constructor(formOptions, formElement) { //получает на вход параметры: Объект с параметрами формы и форму
      this._formOptions = formOptions; //this указывает на экземпляр класса
      this._formElement = formElement;
      
  }

  _hasInvalidInput(inputList) { //имеет недопустимый ввод
      //принимаем массив полей
      return inputList.some((inputElement) => {
          //проверяем через метод some наличие хотя бы одного не валидного поля
          return !inputElement.validity.valid; //возвращает false - если все валидно
      });
  }

//Включение и выключение кнопки на основе данных от hasInvalidInput
  _toggleButtonState(inputList, buttonElement) { //состояние кнопки переключения
      if (this._hasInvalidInput(inputList)) {
          this._setSubmitInactive(buttonElement)
      } else {
          this._setSubmitActive(buttonElement)
      }
  }

// Сделать кнопку активной
  _setSubmitActive(buttonElement) { //принимает на вход кнопку батон
      buttonElement.classList.remove(this._formOptions.inactiveButtonClass); // удалить не активный класс кнопки батона
      buttonElement.removeAttribute("disabled"); //и удалить атрибут disabled в html у кнопки батона
  }

// Сделать кнопку неактивной --- //весь функционал такой же как у метода выше, но наоборот
  _setSubmitInactive(buttonElement) {
      buttonElement.classList.add(this._formOptions.inactiveButtonClass);
      buttonElement.disabled = true;
  }

//Показать браузерные ошибки
  _showInputError(formElement, inputElement, errorMessage) {
      //на вход форму, инпут и браузерное сообщение
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //находим нужный span через id
      inputElement.classList.add(this._formOptions.inputErrorClass); // активировать ошибку в нужном инпуте
      errorElement.textContent = errorMessage; //записать ошибку в span
      errorElement.classList.add(this._formOptions.errorClass); // добавить класс spanу (это просто цвет шрифта и т.д)
  }

//Скрыть ошибки
  _hideInputError(formElement, inputElement) {
      //на вход форму и инпут, далее все как выше, но наоборот
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._formOptions.inputErrorClass);
      errorElement.classList.remove(this._formOptions.errorClass);
      errorElement.textContent = ""; //очищаем span
  }
//Сброс ошибок при открытии форм
resetErrorFormOpen () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._formOptions.inputSelector));
    inputList.forEach(inputElement => {
    this._hideInputError(this._formElement, inputElement);
      })
}

  _checkInputValidity(formElement, inputElement) { //проверить правильность ввода данных //на вход форму и инпут
      //Если при вводе в инпут есть не корректные данные
      if (!inputElement.validity.valid) { //validity - св-во встроен объекта js ValidateState. validity тоже объект с 11 свойствами буля. valid - это итоговое св-во - если все остальные верны, то оно true
          //то запускаем метод Показать браузерные ошибки
          this._showInputError( //на вход
              formElement, //форму
              inputElement, //инпут
              inputElement.validationMessage //сообщение, которое браузер отобразит, когда значение валидности будет ложным.
          );
      } else { //иначе запускаем метод скрыть ошибки
          this._hideInputError(formElement, inputElement);
      }
  }

// Включить или выключить валидацию формы -- пока закоментил
  enableValidation(toggle) {
      if (toggle) {
          this._setEventListeners();       // если true, то включить валидацию (запускаем метод набора слушателей)
          this._isEnabled = true; // на всякий случай храним состояние валидатора (вкл/выкл)
      } else {
          const inputList = Array.from(
              this._formElement.querySelectorAll(this._formOptions.inputSelector)
          );
          inputList.forEach((inputElement) => {
              this._hideInputError(this._formElement, inputElement);
          });
          this._isEnabled = false;
      }
  }


// ------
  _setEventListeners() { //набор слушателей событий
      const inputList = Array.from(
          this._formElement.querySelectorAll(this._formOptions.inputSelector)
      ); //массив всех инпутов формы
      const buttonElement = this._formElement.querySelector(
          this._formOptions.submitButtonSelector
      ); //найти в форме кнопку сабмита
      this._toggleButtonState(inputList, buttonElement); // применяем метод Включение и выключение кнопки на основе данных от hasInvalidInput

      // Сохраняем текущий контекст, чтобы использовать его ниже 
      const outterThis = this; // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/this

      inputList.forEach((inputElement) => {

          //вешаем на инпуты обработчик
          inputElement.addEventListener("input", function () { //слушаем событие input

              outterThis._checkInputValidity(outterThis._formElement, inputElement); // получаем форму и инпут, проверяем валидность инпута
              outterThis._toggleButtonState(inputList, buttonElement);

          });

      });

      // После submit формы, делаем кнопку неактивной
      this._formElement.addEventListener("submit", function () {
          outterThis._setSubmitInactive(buttonElement);

      });

  }

}
