
import { initialCards } from "./components/cards.js";
import "./pages/index.css";
import { openPopup, closePopup, handleEscapeKey, handleOverlayAndCloseButtonClick } from "./components/modal.js";
import { createCard, likeCard, deleteCard } from "./components/cards.js";

export const cardTemplate = document.querySelector("#card-template"); // темплейт
export const cardPlace = document.querySelector(".places__list"); // блок куда вставим карточки

// вывод на страницу
initialCards.forEach((contentCard) => {
    const cardElement = createCard(contentCard, deleteCard, likeCard, handleImageClick);
    cardPlace.append(cardElement);
});

// редактирование профиля
export const editButton = document.querySelector(".profile__edit-button"); // элемент кнопки
export const popupEdit = document.querySelector(".popup_type_edit"); // попап профиля
export const formEdit = document.forms["edit-profile"];
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");

//создание карточки
export const addButton = document.querySelector(".profile__add-button"); // кнопка
export const popupNewCard = document.querySelector(".popup_type_new-card"); // попап создания
export const formNewCard = document.forms["new-place"];

//картинка
export const popupImage = document.querySelector(".popup_type_image"); // попап картинки

editButton.addEventListener("click", () => {
    formEdit.name.value = profileTitle.textContent;
    formEdit.description.value = profileDescription.textContent;
    openPopup(popupEdit);
});

addButton.addEventListener("click", () => {
    formNewCard.reset();
    openPopup(popupNewCard);
});

// форма профиля
export function handleProfileFormSubmit(event) {
    event.preventDefault();

    profileTitle.textContent = formEdit.name.value;
    profileDescription.textContent = formEdit.description.value;

    closePopup(popupEdit);
}

// слушатель формы профиля
formEdit.addEventListener("submit", handleProfileFormSubmit);

// форма новой карточки
export function handleNewCardFormSubmit(event) {
    event.preventDefault();

    const newCardData = {
        name: formNewCard["place-name"].value,
        link: formNewCard.link.value,
    };

    const cardElement = createCard(newCardData, deleteCard);
    cardPlace.prepend(cardElement);

    closePopup(popupNewCard);
}

// слушатель сабмита для новой карточки
formNewCard.addEventListener("submit", handleNewCardFormSubmit);
//картинка в попапе
export const imageInPopup = popupImage.querySelector(".popup__image");
//описание картинки
export const captionInPopup = popupImage.querySelector(".popup__caption");

export function handleImageClick(CardData) {
    imageInPopup.src = CardData.link;
    imageInPopup.alt = CardData.name;
    captionInPopup.textContent = CardData.name;
    openPopup(popupImage);
}


 

 


