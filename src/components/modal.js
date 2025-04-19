// открытие попапа
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscapeKey);
    popup.addEventListener('click', handleOverlayAndCloseButtonClick);
  };
  
  // закрытие попапа
  export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscapeKey);
    popup.removeEventListener('click', handleOverlayAndCloseButtonClick);
  };
  
  // Escape
  export function handleEscapeKey(event) {
    if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closePopup(openedPopup);
  };
  };
  
  // крестик и оверлэй
  export function handleOverlayAndCloseButtonClick(event)  {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
      closePopup(event.currentTarget);
    };
  };