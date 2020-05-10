const buttonEdit = document.querySelector(".profile__button-edit"); //получаем кнопку редактирования
const popup = document.querySelector(".popup"); //Находим popup
const popupOpened = popup.querySelector(".popup_opened"); //Модификатор закрытия-открытия
const toggle = popup.querySelector(".popup__close-toggle"); //Кнопка закрытия
const submit = popup.querySelector(".popup__form-button"); //Получаем кнопку сохранения в форме
const formContainer = popup.querySelector(".popup__form-container");
const formElement = document.querySelector(".popup__form"); // Находим форму в DOM
/*Поля ввода - вывода*/
let nameInput = popup.querySelector(".popup__item_name"); //Поле имени в форме
let jobInput = popup.querySelector(".popup__item_job"); // Поле работы в форме
let profileName = document.querySelector(".profile__name"); //Поле имени на странице
let profileJob = document.querySelector(".profile__job"); //Поле работы на странице

function popupOpen() {
  //Открыть окно и заполнить поля формы из profile
  popup.classList.add("popup_opened");
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileJob.innerHTML;
}
//Закрытие окна
function popupClose() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Находим поля формы в DOM
  // Воспользуйтесь инструментом .querySelector()
  // Воспользуйтесь инструментом .querySelector()
  // Получите значение полей из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent

  // document.querySelector(".profile__name").textContent = nameInput.value;
  // document.querySelector(".profile__job").textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

submit.addEventListener("click", popupClose);
buttonEdit.addEventListener("click", popupOpen);
toggle.addEventListener("click", popupClose);
formElement.addEventListener("submit", formSubmitHandler);
