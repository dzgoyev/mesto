function enableValidation (options) {
const formElement = Array.from(document.querySelectorAll(options.formSelector)); //получаем форму из объекта по ключу
formElement.forEach(formElement => {

const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector)); // получаем все инпуты из формы
inputElements.forEach(input => { //И для каждого инпута добавим слушатель, который будет реагировать на событие нажатой кнопки (input)
    input.addEventListener('input', e => handleInput(e, options.inputErrorClass));
});

const submitButton = formElement.querySelector('.popup__button');
formElement.addEventListener('submit', evt => {
    evt.preventDefault();
    
})
formElement.addEventListener('input', () => {
    const isFormValid = formElement.checkValidity();
submitButton.disabled = !isFormValid;
submitButton.classList.toggle(options.inactiveButtonClass, !isFormValid)
})
})
}

function handleInput (evt, ErrorClass) { //на вход функции приходит событие и нам надо показать ошибку(если она есть)
    const input = evt.target; // целевой инпут
    
    const error = document.querySelector(`#${input.id}-error`);//получаем span в который будет добавлять сообщение об ошибке
    if(input.checkValidity()) { // и вызываем на инпуте проверку валидации
        // и если инпут валидный то обрабатываем его 
        input.classList.remove(ErrorClass); //когда ошибки нет, то удаляем класс
        error.textContent = ''; 
    } 
    else { //иначе показываем
        input.classList.add(ErrorClass); //когда ошибка есть, добавляем класс
console.log(input.validationMessage); //дефолтную ошибку браузера
error.textContent = input.validationMessage; // и добавляем в span сообщение об ошибке
    }
}


const objectFormValidation = { // Это уже вызванная функция
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

enableValidation(objectFormValidation);

