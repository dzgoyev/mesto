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
let container = document.querySelector('.main'); //основной контейнер картинок

let gallery = container.querySelector('.gallery'); //вся галлерея - контейнер куда добавляются карточки
let namePlace = popupAdd.querySelector('.popup__form-item_place'); //Поле ввода места в форме
let linkImage = popupAdd.querySelector('.popup__form-item_link-img'); //Поле ввода ссылки в форме
let galleryItem = document.querySelector('.gallery__item'); //сюда попадает  картинка после добавления с формы
let galleryName = document.querySelector('.gallery__title'); //сюда попадает название места после добавления с формы
let like = gallery.querySelector('.gallery__like'); // лайк для карточки

// Изначальный массив
// -----------------
const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// Функции
//Начало работы над блоком добавления картинок
function addPlace(linkImageValue, namePlaceValue) {
  const galleryTemplate = document.querySelector('#gallery-template').content;
  const galleryElement = galleryTemplate.cloneNode(true);
  galleryElement.querySelector('.gallery__item').src = linkImageValue;
  galleryElement.querySelector('.gallery__title').textContent = namePlaceValue;
  galleryElement.querySelector('.gallery__item').alt = namePlaceValue;
  //Like
  galleryElement
    .querySelector('.gallery__like')
    .addEventListener('click', function (evt) {
      evt.target.classList.toggle('gallery__like_active');
    });
  //Добавляем новый элемент в начало галлереи
  gallery.prepend(galleryElement);
  const galleryContainer = gallery.querySelector('.gallery__container'); // контейнер куда будут добавляться картинки
  // Корзина - удаляем карточки
  const trash = document.querySelector('.gallery__trash');
  trash.addEventListener('click', function () {
    galleryContainer.remove();
  });
}
//Функция добавления картинок - изначальный массив попадает в нее и потом передается в addPlace.
function CardAdd() {
  initialCards.forEach(function (item) {
    const name = item.name;
    const link = item.link;
    addPlace(link, name);
  });
}
CardAdd();

//Конец блока работы над галлерей изобряжений

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

// Перехватываем событие на кнопку в форме редактирвования картинок и добавляем картинку на сайт через submit
function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  let name = namePlace.value;
  let link = linkImage.value;
  addPlace(link, name); //передеаем в функцию шаблон добавления картинок
  //Обнуляем значения полей ввода в форме
  namePlace.value = '';
  linkImage.value = '';
}

// submitAdd.addEventListener('click', function () {
//   addPlace(linkImage.value, namePlace.value);
//   linkImage.value = '';
//   namePlace.value = '';
// });

// Выбираем нужный кнопку крест для закрытия окна
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
