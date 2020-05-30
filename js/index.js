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

//сюда галлерею
const container = document.querySelector('.main'); //main container
const gallery = container.querySelector('.gallery'); //all gallery

//вытащил наружу темплэйт
const galleryTemplate = document.querySelector('#gallery-template').content;

// Inputs and output fileds profile
const nameInput = popup.querySelector('.popup__form-item_name'); //name field in the profile registration
const jobInput = popup.querySelector('.popup__form-item_job'); // name job in the profile registration
const profileName = document.querySelector('.profile__name'); //name element on the page
const profileJob = document.querySelector('.profile__job'); //name job jn the page

// Inputs and output fields add images

const namePlace = popupAdd.querySelector('.popup__form-item_place'); //name place in the form add
const linkImage = popupAdd.querySelector('.popup__form-item_link-img'); //link img in the form add

//The function on creating cards

function createCard(linkImageValue, namePlaceValue) {
  const galleryElement = galleryTemplate.cloneNode(true);
  galleryElement.querySelector('.gallery__item').src = linkImageValue;
  galleryElement.querySelector('.gallery__title').textContent = namePlaceValue;
  galleryElement.querySelector('.gallery__item').alt = namePlaceValue;
  // --- large image output
  const cardImage = galleryElement.querySelector('.gallery__item');
  const popupImageLarge = document.querySelector('.popup__image-src'); // src image
  const popupImageCaption = document.querySelector('.popup__caption'); //caption for large images
  cardImage.src = linkImageValue;
  cardImage.addEventListener('click', function () {
    popupOpenImg(); //the function adds a modifier for pop-up popup large images
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
  //Trash, using --closest--
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
  let newCard = createCard(link, name); // creating new card
  addItem(gallery, newCard); // adding new card to the gallery
});

// Open a large image popup
function popupOpenImg() {
  popupImages.classList.add('popup_opened');
}

// function closing popups

function popupOpenClose() {
  const parent = document.querySelector('.page');
  parent.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('profile__button-edit')) {
      popup.classList.add('popup_opened');
      nameInput.value = profileName.innerHTML;
      jobInput.value = profileJob.innerHTML;
    }
    if (event.target.classList.contains('profile__button-add')) {
      popupAdd.classList.add('popup_opened');
    }
    if (evt.target.classList.contains('popup__close-toggle')) {
      // close popup on cross (without saving data)
      evt.target.closest('.popup').classList.remove('popup_opened');
    }
    if (evt.target.classList.contains('popup__item')) {
      // select opened popup
      let pop = document.querySelector('.popup_opened');
      // check if any popup opened
      if (pop != null) {
        // select required fields on the currenct popup
        let requiredFileds = pop.querySelectorAll('[required]');

        // Go through selected required fields and check if it is empty
        for (let i = 0; i < requiredFileds.length; i++) {
          // if any required filed is empty then return from the function before closing popup
          // if (requiredFileds[i].value.trim() == '') return; // without pattern (field type) validation
          if (!requiredFileds[i].checkValidity()) return;
        }
      }

      // close popup on save date
      evt.target.closest('.popup').classList.remove('popup_opened');
    }
  });
}

// Event on the button in the profile
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupOpenClose();
}

// Event on the button images editing and image add via submit
function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  let name = namePlace.value;
  let link = linkImage.value;
  let newCard = createCard(link, name); // creating new card
  addItem(gallery, newCard); // adding new card to the gallery
  namePlace.value = '';
  linkImage.value = '';
  popupOpenClose();
}

// Select the proprite cross button to close
toggle.forEach(function (item) {
  item.addEventListener('click', popupOpenClose);
});

// Listeners
buttonEdit.addEventListener('click', popupOpenClose); //button for opening profile editing
buttonAdd.addEventListener('click', popupOpenClose); //button for open add images
formElement.addEventListener('submit', formSubmitHandler); //sending a profile editing form
formElementAdd.addEventListener('submit', formSubmitHandlerAdd); //sending a form adding images
