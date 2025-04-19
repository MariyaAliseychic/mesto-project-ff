const cardTemplate = document.querySelector('#card-template');  // темплейт

//создание карточки
export function createCard(contentCard, deleteCard, likeCard, handleImageClick) {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');


  cardElement.querySelector('.card__image').src = contentCard.link;
  cardElement.querySelector('.card__image').alt = contentCard.name;
  cardElement.querySelector('.card__title').textContent = contentCard.name;

  cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));

  cardLikeButton.addEventListener('click', () => 
    likeCard(cardLikeButton))

  cardImage.addEventListener('click', () => 
    handleImageClick(contentCard))

  return cardElement;
  };

  //лайк
export function likeCard(cardLikeButton) {
  cardLikeButton.classList.add('card__like-button_is-active'); 
}
// удаление карточек
export function deleteCard(cardElement) {
  cardElement.remove();
}

