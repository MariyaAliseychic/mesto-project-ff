
import { initialCards } from "./components/cards.js";
import "./pages/index.css";
import { openPopup, closePopup, handleEscapeKey, handleOverlayAndCloseButtonClick } from "./components/modal.js";
import { createCard, likeCard, deleteCard } from "./components/card.js";

const cardTemplate = document.querySelector("#card-template"); // темплейт
const cardPlace = document.querySelector(".places__list"); // блок куда вставим карточки

// вывод на страницу
initialCards.forEach((contentCard) => {
    const cardElement = createCard(contentCard, deleteCard, likeCard, handleImageClick);
    cardPlace.append(cardElement);
});

// редактирование профиля
const editButton = document.querySelector(".profile__edit-button"); // элемент кнопки
const popupEdit = document.querySelector(".popup_type_edit"); // попап профиля
const formEdit = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//создание карточки
const addButton = document.querySelector(".profile__add-button"); // кнопка
const popupNewCard = document.querySelector(".popup_type_new-card"); // попап создания
const formNewCard = document.forms["new-place"];

//картинка
const popupImage = document.querySelector(".popup_type_image"); // попап картинки

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
function handleProfileFormSubmit(event) {
    event.preventDefault();

    profileTitle.textContent = formEdit.name.value;
    profileDescription.textContent = formEdit.description.value;

    closePopup(popupEdit);
}

// слушатель формы профиля
formEdit.addEventListener("submit", handleProfileFormSubmit);

// форма новой карточки
function handleNewCardFormSubmit(event) {
    event.preventDefault();

    const newCardData = {
        name: formNewCard["place-name"].value,
        link: formNewCard.link.value,
    };

    const cardElement = createCard(newCardData, deleteCard, likeCard, handleImageClick);
    cardPlace.prepend(cardElement);
    closePopup(popupNewCard);
}

// слушатель сабмита для новой карточки
formNewCard.addEventListener("submit", handleNewCardFormSubmit);
//картинка в попапе
const imageInPopup = popupImage.querySelector(".popup__image");
//описание картинки
const captionInPopup = popupImage.querySelector(".popup__caption");

function handleImageClick(сardData) {
    imageInPopup.src = сardData.link;
    imageInPopup.alt = сardData.name;
    captionInPopup.textContent = сardData.name;
    openPopup(popupImage);
}


 

 


