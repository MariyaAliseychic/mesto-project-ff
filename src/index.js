import { initialCards } from "./components/cards.js";
import "./pages/index.css";
import {
  openPopup,
  closePopup,
  handleEscapeKey,
  handleOverlayAndCloseButtonClick,
} from "./components/modal.js";
import { createCard, likeCard, deleteCard } from "./components/card.js";
import {
  enableValidation,
  clearValidation,
  configValidation,
} from "./components/validation.js";
import {
  getCards,
  getProfile,
  deleteMyCard,
  setProfile,
  setAvatar,
  postNewCard,
} from "./components/api.js";

const cardTemplate = document.querySelector("#card-template"); // темплейт
const cardPlace = document.querySelector(".places__list"); // блок куда вставим карточки
// редактирование профиля
const editButton = document.querySelector(".profile__edit-button"); // элемент кнопки
const popupEdit = document.querySelector(".popup_type_edit"); // попап профиля
const formEdit = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
//z
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
//создание карточки
const addButton = document.querySelector(".profile__add-button"); // кнопка
const popupNewCard = document.querySelector(".popup_type_new-card"); // попап создания
const formNewCard = document.forms["new-place"];
//картинка
const popupImage = document.querySelector(".popup_type_image"); // попап картинки
//картинка в попапе
const imageInPopup = popupImage.querySelector(".popup__image");
//описание картинки
const captionInPopup = popupImage.querySelector(".popup__caption");
//аватар
const pupupAvatar = document.querySelector(".popup_avatar");
const profileImage = document.querySelector(".profile__image");
const InputAvatar = pupupAvatar.querySelector(".popup__input_type_url");
const popupButtonCloseAvatar = pupupAvatar.querySelector(".popup__close");
const formAvatar = document.forms["new-avatar"];

function renderLoading(isLoading, form) {
  const buttonTextPopup = form.querySelector(".popup__button");
  if (isLoading) {
    buttonTextPopup.textContent = "Сохранить";
  } else {
    buttonTextPopup.textContent = "Сохранение...";
  }
}

// Попап аватара

profileImage.addEventListener("click", () => {
  openPopup(pupupAvatar);
  clearValidation(formAvatar, configValidation); // очистка ошибок
});

popupButtonCloseAvatar.addEventListener("click", () => {
  openPopup(formAvatar);
});
formAvatar.addEventListener("submit", handleFormSubmitAvatar);

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  renderLoading(false, pupupAvatar);
  setAvatar(InputAvatar.value)
    .then((InputAvatar) => {
      profileImage.style = `background-image: url('${link}')`;
      closePopup(pupupAvatar);
      formAvatar.reset();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => renderLoading(true, pupupAvatar));
}

formAvatar.addEventListener("submit", handleFormSubmitAvatar);

//папап профиля

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
  clearValidation(formEdit, configValidation);
});

// форма профиля

function handleProfileFormSubmit(event) {
  event.preventDefault();
  renderLoading(false, popupEdit);
  setProfile(nameInput.value, jobInput.value)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      formEdit.reset();
      closePopup(popupEdit);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => renderLoading(true, popupEdit));
}

// слушатель формы профиля
formEdit.addEventListener("submit", handleProfileFormSubmit);

//попап новой карточки

addButton.addEventListener("click", () => {
  formNewCard.reset();
  openPopup(popupNewCard);
  clearValidation(formNewCard, configValidation);
});

// форма новой карточки
function handleNewCardFormSubmit(event) {
  event.preventDefault();
  renderLoading(false, popupNewCard);
  const newCardData = {
    name: formNewCard["place-name"].value,
    link: formNewCard.link.value,
  };
  postNewCard(newCardData.name, newCardData.link)
    .then((newCards) => {
      const userId = newCards.owner._id;
      const newCard = createCard(
        newCards,
        userId,
        deleteCard,
        likeCard,
        handleImageClick
      );
      cardPlace.prepend(newCard);
      closePopup(popupNewCard);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(true, popupEdit);
    });
}

// слушатель сабмита для новой карточки
formNewCard.addEventListener("submit", handleNewCardFormSubmit);

//попап с картинкой
function handleImageClick(сardImage) {
  imageInPopup.src = сardImage.link;
  imageInPopup.alt = сardImage.name;
  captionInPopup.textContent = сardImage.name;
  openPopup(popupImage);
}
enableValidation(configValidation);

//api
// данные карточек и профиля
Promise.all([getCards(), getProfile()])
  .then(([cards, profile]) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileImage.style.backgroundImage = `url('${profile.avatar}')`;
    const profileIdMe = profile._id;
    cards.forEach((cardData) => {
      const card = createCard(cardData, {
        deleteCard,
        likeCard,
        handleImageClick,
        deleteMyCard,
        profileIdMe,
      });
      cardPlace.append(card);
    });
    console.log("profile".Avatar);
  })
  .catch((err) => console.log("Ошибка при получении профиля:", err));
