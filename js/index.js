// Popups
const popupProfile = document.querySelector('.popup'); //popup profile (other be its elements)
const popupAddCard = document.querySelector('.popup__add'); // popup for adding a card
const popupImages = document.querySelector('.popup__images'); // popup for large images

// buttons
// const submit = popupProfile.querySelector('.popup__form-button'); //button in the profile form
const buttonEdit = document.querySelector('.profile__button-edit'); //save button in the profile form edit
const buttonAdd = document.querySelector('.profile__button-add'); //button in the adding form
// const submitAdd = popupAddCard.querySelector('.popup__item_add'); //save button in the form add images
// const toggle = document.querySelectorAll('.popup__close-toggle'); //close button - cross

// Forms
const formElement = document.querySelector('.popup__form'); // profile editing form
const formElementAdd = document.querySelector('.popup__form_add'); // form for add images

//Gallery
const container = document.querySelector('.main'); //main container
const gallery = container.querySelector('.gallery'); //all gallery

//Template
const galleryTemplate = document.querySelector('#gallery-template').content;

// Inputs and output fileds profile
const nameInput = popupProfile.querySelector('.popup__form-item_name'); //name field in the profile registration
const jobInput = popupProfile.querySelector('.popup__form-item_job'); // name job in the profile registration
const profileName = document.querySelector('.profile__name'); //name element on the page
const profileJob = document.querySelector('.profile__job'); //name job jn the page
nameInput.value = profileName.innerHTML;
jobInput.value = profileJob.innerHTML;

// Inputs and output fields add images
const namePlace = popupAddCard.querySelector('.popup__form-item_place'); //name place in the form add
const linkImage = popupAddCard.querySelector('.popup__form-item_link-img'); //link img in the form add

// Toggle popup
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

//The function on creating cards
function createCard(linkImageValue, namePlaceValue) {
  const galleryElement = galleryTemplate.cloneNode(true);
  const cardImage = galleryElement.querySelector('.gallery__item');
  cardImage.src = linkImageValue;
  galleryElement.querySelector('.gallery__title').textContent = namePlaceValue;
  cardImage.alt = `${namePlaceValue} - фотография`;
  // --- large image output
  const popupImageLarge = document.querySelector('.popup__image-src'); // src image
  const popupImageCaption = document.querySelector('.popup__caption'); //caption for large images
  cardImage.addEventListener('click', () => {
    togglePopup(popupImages); //the function adds a modifier for pop-up popup large images
    popupImageLarge.src = linkImageValue;
    popupImageLarge.alt = `${namePlaceValue} - увеличенное изображение`;
    popupImageCaption.textContent = namePlaceValue;
  });

  //Like
  galleryElement
    .querySelector('.gallery__like')
    .addEventListener('click', function (evt) {
      evt.target.classList.toggle('gallery__like_active');
    });
  //Trash, using -- closest --
  const trash = galleryElement.querySelector('.gallery__trash');
  trash.addEventListener('click', function () {
    const trashItem = trash.closest('.gallery__container');
    trashItem.remove();
  });

  return galleryElement;
}

// Add any item to container
function addItem(container, item) {
  container.prepend(item);
}

// Init gallery
initialCards.forEach(function (item) {
  const name = item.name;
  const link = item.link;
  const newCard = createCard(link, name); // creating new card
  addItem(gallery, newCard); // adding new card to the gallery
});

// Event on the button in the profile
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupProfile);
}

// Event on the button images editing and image add via submit
function newCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const name = namePlace.value;
  const link = linkImage.value;
  const newCard = createCard(link, name); // creating new card
  addItem(gallery, newCard); // adding new card to the gallery
  namePlace.value = '';
  linkImage.value = '';
  togglePopup(popupAddCard);
}

// Listeners
buttonEdit.addEventListener('click', () => {
  togglePopup(popupProfile);
}); // Open Edit Profile
buttonAdd.addEventListener('click', () => {
  togglePopup(popupAddCard);
}); // Open Add Image
formElement.addEventListener('submit', profileFormSubmitHandler); // submit Profile form
formElementAdd.addEventListener('submit', newCardFormSubmitHandler); // submit Add Card form

// Init close buttons listeners
const popupCloseButtons = document.getElementsByClassName(
  'popup__close-toggle'
);

for (let i = 0; i < popupCloseButtons.length; i++) {
  popupCloseButtons[i].addEventListener('click', () => {
    togglePopup(document.querySelector('.popup_opened'));
  });
}


const popupAll = Array.from(document.querySelectorAll('.popup'));
// ------ закрытие на черном фоне
const popupCloseOnBackground = (item) => document.addEventListener('click', (e) => {
  item.forEach(function (item) {
    if (e.target.className != item) {
      e.target.classList.remove('popup_opened');
    }

  })
});
popupCloseOnBackground(popupAll);

//----- Закрытие на Escape
const popupCloseOnEsc = (item) => document.addEventListener('keydown', (e) => {
  item.forEach(function (item) {
    if (e.key === 'Escape') {
      item.classList.remove('popup_opened');
    }
  });
})
popupCloseOnEsc(popupAll);

enableValidation(formOptions);

