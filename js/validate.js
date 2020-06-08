function enableValidation(options) {
    const formElement = Array.from(document.querySelectorAll(options.formSelector)); //получаем форму
    formElement.forEach(formElement => {
        const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector)); // получаем все инпуты из формы
        inputElements.forEach(input => { //И для каждого инпута добавим слушатель, который будет реагировать на событие нажатой кнопки (input)
            input.addEventListener('input', e => handleInput(e, options.inputErrorClass));
        });

        const submitButton = formElement.querySelector(options.submitButtonSelector);
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

function handleInput(evt, ErrorClass) { //на вход функции приходит событие и нам надо показать ошибку(если она есть)
    //ErrorClass - это просто сокращение аргумента options.inputErrorClass
    const input = evt.target; // целевой инпут

    const error = document.querySelector(`#${input.id}-error`);//получаем span в который будет добавляться сообщение об ошибке
    if (input.checkValidity()) { // и вызываем на инпуте проверку валидации
        // и если инпут валидный то обрабатываем его 
        input.classList.remove(ErrorClass); //когда ошибки нет, удаляем класс
        error.textContent = '';
    }
    else { //иначе 
        input.classList.add(ErrorClass); //когда ошибка есть, добавляем класс
        console.log(input.validationMessage); //это я уберу потом
        error.textContent = input.validationMessage; // и добавляем в span сообщение об ошибке
    }
}


const objectFormValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'//зачем это тут непонятно - я задал его по умолчанию для spana
};

enableValidation(objectFormValidation);

