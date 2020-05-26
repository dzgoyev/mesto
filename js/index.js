//initial array
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

// Popups
const popup = document.querySelector('.popup'); //popup profile (other be its elements)
const popupAdd = document.querySelector('.popup__add'); // popup for adding a card
const popupImages = document.querySelector('.popup__images'); // popup for large images

// buttons
const submit = popup.querySelector('.popup__form-button'); //button in the profile form
const buttonEdit = document.querySelector('.profile__button-edit'); //save button in the profile form edit
const buttonAdd = document.querySelector('.profile__button-add'); //button in the adding form
const submitAdd = popupAdd.querySelector('.popup__item_add'); //save button in the form add images
const toggle = document.querySelectorAll('.popup__close-toggle'); //close button - cross

// Forms
const formElement = document.querySelector('.popup__form'); // profile editing form
const formElementAdd = document.querySelector('.popup__form_add'); // form for add images

// Modifier
const popupOpened = popup.querySelector('.popup_opened'); //open and close modifier popup

// Inputs and output fileds profile
let nameInput = popup.querySelector('.popup__form-item_name'); //name field in the profile registration
let jobInput = popup.querySelector('.popup__form-item_job'); // name job in the profile registration
let profileName = document.querySelector('.profile__name'); //name element on the page
let profileJob = document.querySelector('.profile__job'); //name job jn the page

// Inputs and output fields add images
let container = document.querySelector('.main'); //main container
let gallery = container.querySelector('.gallery'); //all gallery
let namePlace = popupAdd.querySelector('.popup__form-item_place'); //name place in the form add
let linkImage = popupAdd.querySelector('.popup__form-item_link-img'); //link img in the form add
let galleryItem = container.querySelector('.gallery__item'); //images element on the page
let galleryName = container.querySelector('.gallery__title'); //place name element on the page
let like = gallery.querySelector('.gallery__like'); // like for cards

//The function on creating cards
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
  //Add new element to the begining
  gallery.prepend(galleryElement);
  const galleryContainer = gallery.querySelector('.gallery__container'); // container for add cards
  // Trash for cards
  const trash = document.querySelector('.gallery__trash');
  trash.addEventListener('click', function () {
    galleryContainer.remove();
  });

  const galleryItem = document.querySelector('.gallery__item'); //place image after add from the form

  //Block function display large images
  const popupImageLarge = document.querySelector('.popup__image-src'); // src image
  const popupImageCaption = document.querySelector('.popup__caption'); //caption for large images

  galleryItem.addEventListener('click', function () {
    popupOpenImg();
    popupImageLarge.src = linkImageValue;
    popupImageCaption.textContent = namePlaceValue;
  });
}

//Function images add - the initial array go to it and then to addPlace
function CardAdd() {
  initialCards.forEach(function (item) {
    const name = item.name;
    const link = item.link;
    addPlace(link, name);
  });
}
CardAdd(); //function call

//End block gallery images

// Open the popup form adding images
function popupOpenAdd() {
  popupAdd.classList.add('popup_opened');
}
//Open a large image popup
function popupOpenImg() {
  popupImages.classList.add('popup_opened');
}

// Open the profile editing popup and fill in inputs
function popupOpenEdit() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileJob.innerHTML;
}

//Close form on clicking on the cross - list necessary popups
function popupClose() {
  popup.classList.remove('popup_opened');
  popupAdd.classList.remove('popup_opened');
  popupImages.classList.remove('popup_opened');
}

// Event on the button in the profile
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

// Event on the button images editing and image add via submit
function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  let name = namePlace.value;
  let link = linkImage.value;
  addPlace(link, name);
  namePlace.value = '';
  linkImage.value = '';
}

// Select the proprite cross button to close
toggle.forEach(function (item) {
  item.addEventListener('click', popupClose);
});

// Listeners
submit.addEventListener('click', popupClose); //save and close in the profile form
submitAdd.addEventListener('click', popupClose); //save and close in the profile image
buttonEdit.addEventListener('click', popupOpenEdit); //button for opening profile editing
buttonAdd.addEventListener('click', popupOpenAdd); //button for open add images
formElement.addEventListener('submit', formSubmitHandler); //sending a profile editing form
formElementAdd.addEventListener('submit', formSubmitHandlerAdd); //sending a form adding images
