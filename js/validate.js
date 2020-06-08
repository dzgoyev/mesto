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
            const isFormValid = formElement.checkValidity(); //если checkValidity() true, то кнопка разблокируется
            submitButton.disabled = !isFormValid;
            submitButton.classList.toggle(options.inactiveButtonClass, !isFormValid) //через toggle передаем класс не активной кнопки и вторым параметром !isFormValid
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
        error.textContent = input.validationMessage; // и добавляем в span сообщение об ошибке
    }
}

