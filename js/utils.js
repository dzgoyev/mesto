const popupImages = document.querySelector('.popup__images'); // popup for large images

// Открыть Popup.
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc); 
}

function closePopupEsc(e) {
    const openedPopup = document.querySelector('.popup_opened');
    if (e.key === 'Escape') {
      closePopup(openedPopup);
    }
  }

  function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
    // думаю может тут нужно вставить отдельную функцию сброса ошибок? Эту функцию написать в FormValidation (яша так хотел) . Только как ее вызывать тут.

}
export {popupImages, openPopup, closePopupEsc, closePopup};