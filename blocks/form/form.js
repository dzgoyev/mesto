/*-------------------------*/

// Находим форму в DOM
let formElement = document.querySelector(".form__register"); // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Находим поля формы в DOM
  let nameInput = formItem[0].value; // Воспользуйтесь инструментом .querySelector()
  let jobInput = formItem[1].value; // Воспользуйтесь инструментом .querySelector()
  console.log(nameInput);
  console.log(jobInput);
  //   console.log(jobInput);
  // Получите значение полей из свойства value

  //   console.log(document.querySelector(".form__item"));

  // Выберите элементы, куда должны быть вставлены значения полей
  document.querySelector(".profile__title").textContent = nameInput;
  document.querySelector(".profile__subtitle").textContent = jobInput;

  // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
