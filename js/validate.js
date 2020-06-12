//Показать ошибки
const showInputError = (formElement, inputElement, errorMessage) => { //на вход форму, инпут и браузерное сообщение
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //находим нужный span через id
  inputElement.classList.add(formOptions.inputErrorClass); // активировать ошибку в нужном инпуте
  errorElement.textContent = errorMessage; //записать ошибку в span
  errorElement.classList.add(formOptions.errorClass); // включить класс в span
};
//Скрыть ошибки 
const hideInputError = (formElement, inputElement) => { //на вход форму и инпут, далее все как выше, но наоборот
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formOptions.inputErrorClass);
  errorElement.classList.remove(formOptions.errorClass);
  errorElement.textContent = ''; //очищаем span
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//Проверяем валидность полей и возможность активности кнопки сабмита
const hasInvalidInput = (inputList) => {  //принимаем массив полей
  return inputList.some((inputElement) => {//проверяем через метод some наличие хотя бы одного не валидного поля
    return !inputElement.validity.valid; //возвращает false - если все валидно
  });
}
//Включение и выключение кнопки на основе данных от hasInvalidInput
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formOptions.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(formOptions.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formOptions.inputSelector)); //массив всех инпутов формы
  const buttonElement = formElement.querySelector(formOptions.submitButtonSelector); //найти в форме нопку сабмита
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => { //вешаем на инпуты обработчик
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement); // получаем форму и инпут, проверяем валидность инпута
      toggleButtonState(inputList, buttonElement);

    });

  });

};

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector)); //Находим все формы
  formList.forEach((formElement) => { //перебираем массив форм
    
    setEventListeners(formElement);

  });
};
