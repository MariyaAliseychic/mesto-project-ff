import { putLike, delLike, deleteMyCard } from "./api.js";
const cardTemplate = document.querySelector("#card-template"); // темплейт

//создание карточки

export const createCard = (
  cardData,
  { deleteCard, likeCard, handleImageClick, profileIdMe, userId } = {}
) => {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likesCountur = cardElement.querySelector(".counting-likes");
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".counting-likes").textContent =
    cardData.likes.length;

  // Добавление обработчика для кнопки удаления
  cardDeleteButton.addEventListener("click", () => {
    deleteCard(cardElement, cardData._id);
  });

  // Добавление обработчика для изображения карточки
  cardImage.addEventListener("click", () => {
    handleImageClick(cardData);
  });

  // Добавление обработчика для кнопки «лайк»
  cardLikeButton.addEventListener("click", () => {
    likeCard(cardLikeButton, cardData._id, likesCountur);
  });

  //if (cardData.likes.some(like => like._id === userId)) {
  //cardLikeButton.classList.add("card__like-button_is-active");
  //} else {
  //cardLikeButton.classList.remove("card__like-button_is-active");
  //}
  if (
    cardData.likes.some((like) => {
      return like._id === userId;
    })
  ) {
    cardLikeButton.classList.add("card__like-button_is-active");
  } else {
    cardLikeButton.classList.remove("card__like-button_is-active");
  }

  if (cardData.owner._id !== profileIdMe) {
    cardDeleteButton.style.display = "none";
  } else {
    cardDeleteButton.classList.add("card__delete-button-hidden");
  }

  return cardElement;
};

//лайк
export function likeCard(cardLikeButton, cardId, likesCountur) {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    delLike(cardId)
      .then((updatedCard) => {
        cardLikeButton.classList.remove("card__like-button_is-active");
        likesCountur.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log("Ошибка при снятии лайка:", err));
  } else {
    putLike(cardId)
      .then((updatedCard) => {
        cardLikeButton.classList.add("card__like-button_is-active");
        likesCountur.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log("Ошибка при добавлении лайка:", err));
  }
}

// удаление карточек
export function deleteCard(cardElement, cardId) {
  deleteMyCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log("Ошибка при удалении карточки:", err);
    });
}
