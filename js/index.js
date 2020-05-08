const buttonEdit = document.querySelector(".profile__button-edit");
const popup = document.querySelector(".popup");
const popupOpened = popup.querySelector(".popup_opened");
const toggle = popup.querySelector(".form__close-toggle");
const submit = popup.querySelector(".form__button");
const formContainer = document.querySelector(".form__container");
let formItem = formContainer.querySelectorAll(".form__item");

buttonEdit.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  formItem[0].value = document.querySelector(".profile__name").innerHTML;
  formItem[1].value = document.querySelector(".profile__job").innerHTML;
});

toggle.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});

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

  // Получите значение полей из свойства value

  //   console.log(document.querySelector(".form__item"));

  // Выберите элементы, куда должны быть вставлены значения полей
  document.querySelector(".profile__name").textContent = nameInput;
  document.querySelector(".profile__job").textContent = jobInput;

  // Вставьте новые значения с помощью textContent
}
submit.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
