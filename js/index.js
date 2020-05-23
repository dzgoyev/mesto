// Popups
const popup = document.querySelector('.popup'); //popup редактирования проофиля
const popupAdd = document.querySelector('.popup__add'); // popup добавления карточек
const submit = popup.querySelector('.popup__form-button'); //Кнопка сохранения в форме редактирования профиля

// Кнопки
const buttonEdit = document.querySelector('.profile__button-edit'); //получаем кнопку редактирования профиля
const buttonAdd = document.querySelector('.profile__button-add'); //Кнопка открытия формы добавления картинок
const submitAdd = popupAdd.querySelector('.popup__item_add'); //Кнопка сохранения в форме добавления картинок
const toggle = document.querySelectorAll('.popup__close-toggle'); //Кнопка-крест закрытия

// Формы
const formElement = document.querySelector('.popup__form'); // Форма редактирования профиля
const formElementAdd = document.querySelector('.popup__form_add'); // Форма добавления картинок

// Модификаторы true-false
const popupOpened = popup.querySelector('.popup_opened'); //Модификатор закрытия-открытия popup

// Инпуты и поля вывода профиля
let nameInput = popup.querySelector('.popup__form-item_name'); //Поле имени в форме регистрации профиля
let jobInput = popup.querySelector('.popup__form-item_job'); // Поле работы в форме регистрации профиля
let profileName = document.querySelector('.profile__name'); //Элемент имени на странице
let profileJob = document.querySelector('.profile__job'); //Элемент работы на странице

// Инпуты и поля добавления картинок
let container = document.querySelector('.main'); //основной контейнер

let gallery = container.querySelector('.gallery'); //вся галлерея - контейнер куда добавляются карточки
let namePlace = popupAdd.querySelector('.popup__form-item_place'); //Поле названия места в форме
let linkImage = popupAdd.querySelector('.popup__form-item_link-img'); //Поле вставки ссылки в форме
let galleryItem = document.querySelector('.gallery__item'); //сюда попадает  картинка после добавления с формы
let galleryName = document.querySelector('.gallery__title'); //сюда попадает название места после добавления с формы
let like = gallery.querySelector('.gallery__like'); // лайк для карточки

// Функции
//Начало работы над блоков добавления картинок
// Разметка
function addPlace(linkImageValue, namePlaceValue) {
  const galleryTemplate = document.querySelector('#gallery-template').content;
  const galleryElement = galleryTemplate.cloneNode(true);
  galleryElement.querySelector('.gallery__item').src = linkImageValue;
  galleryElement.querySelector('.gallery__title').textContent = namePlaceValue;
  galleryElement
    .querySelector('.gallery__like')
    .addEventListener('click', function (evt) {
      evt.target.classList.toggle('gallery__like_active');
    });

  gallery.prepend(galleryElement);

  let galleryContainer = gallery.querySelector('.gallery__container'); // контейнер куда будут добавляться картинки и имя места
  let trash = document.querySelector('.gallery__trash'); //корзина
  trash.addEventListener('click', function () {
    galleryContainer.remove();
  });
}

submitAdd.addEventListener('click', function () {
  addPlace(linkImage.value, namePlace.value);
  linkImage.value = '';
  namePlace.value = '';
});

//Конец блока работы над галлерей добавления

// Открыть попап картинок
function popupOpenAdd() {
  popupAdd.classList.add('popup_opened');
}

// Открыть попап редактирования профиля и заполнить инпуты
function popupOpenEdit() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileJob.innerHTML;
}

//Закрытие форм при клике на крест
function popupClose() {
  popup.classList.remove('popup_opened');
  popupAdd.classList.remove('popup_opened');
}

// Перехватываем событие на кнопку в профиле
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

// Перехватываем событие на кнопку в форме редактирвования картинок
function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
}

// Выбираем нужны кнопку крест для закрытия окна
toggle.forEach(function (item) {
  item.addEventListener('click', popupClose);
});

// Слушатели
submit.addEventListener('click', popupClose); //Сохранить и закрыть в форме профиля
submitAdd.addEventListener('click', popupClose); //Сохранить и закрыть в форме картинок
buttonEdit.addEventListener('click', popupOpenEdit); //Кнопка открытия редактирования профиля
buttonAdd.addEventListener('click', popupOpenAdd); //Кнопка открытия добавления картинок

formElement.addEventListener('submit', formSubmitHandler); //отправка формы редактирования профиля
formElementAdd.addEventListener('submit', formSubmitHandlerAdd); //отправка формы добавления картинок
