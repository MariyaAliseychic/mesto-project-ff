
import { putLike, delLike, deleteMyCard} from './api.js';
import { openPopup } from './modal.js';
const cardTemplate = document.querySelector('#card-template');  // темплейт

//создание карточки

  export const createCard = (cardData, {deleteCard, userId, handleImageClick, likeCard} = {}) => {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  //const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likesCountur = cardElement.querySelector('.counting-likes');
  

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.counting-likes').textContent = cardData.likes.length;
  //cardElement.dataset.id = data._id;
  cardLikeButton.addEventListener('click', () => 
   likeCard(cardLikeButton, cardData._id, likesCountur));

  if (cardData.owner._id !== userId) {
    cardDeleteButton.addEventListener('click', () => {
      deleteCard(cardElement, cardElement._id);
      
    })
  } else {
    cardDeleteButton.classList.add('card__delete-button-hidden');
  };

   if (cardData.likes.some((like) => {
    return like._id === userId;
    })) { 
      cardLikeButton.classList.add('card__like-button_is-active');
    } else {
      cardLikeButton.classList.remove('card__like-button_is-active')
    }

    cardDeleteButton.addEventListener('click', () => {
      deleteCard(cardElement, cardData._id);
});
    cardImage.addEventListener('click', () => {
      handleImageClick(cardData);
});

    cardLikeButton.addEventListener('click', () => {
      likeCard(cardLikeButton, cardData._id, likesCountur);
});

return cardElement;
}

  //лайк
export function likeCard(cardLikeButton, cardId, likesCountur) {
  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    delLike(cardId)
      .then((updatedCard) => {
        cardLikeButton.classList.remove('card__like-button_is-active');
        likesCountur.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log('Ошибка при снятии лайка:', err));
  } else {
    putLike(cardId)
      .then((updatedCard) => {
        cardLikeButton.classList.add('card__like-button_is-active');
        likesCountur.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log('Ошибка при добавлении лайка:', err));
  }
};

// удаление карточек
export function deleteCard(cardElement, cardId) {
  deleteMyCard(cardId)
  .then(() => {
    cardElement.remove();
  })
  .catch((err) => {
    console.log('Ошибка при удалении карточки:', err);
  });
}

/*
export const createCard = (cardData, deleteCard, userId, handleImageClick, likeCard) => {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  //const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likesCountur = cardElement.querySelector('.counting-likes');
  

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.counting-likes').textContent = cardData.likes.length;
  //cardElement.id = cardItem._id;

  //удаление карточек
  if (cardData.owner._id === userId) {
    cardDeleteButton.addEventListener('click', () => {
      deleteCard(cardElement, cardElement._id);
    })
  } else {
    cardDeleteButton.classList.add('card__delete-button-hidden');
  };
  //лайк
   if (cardData.likes.some((like) => {
    return like._id === userId;
    })) { 
      cardLikeButton.classList.add('card__like-button_is-active');
    } else {
      cardLikeButton.classList.remove('card__like-button_is-active')
    }

    cardLikeButton.addEventListener('click', (evt) => {
      likeCard(evt, cardData._id);
    });
    cardImage.addEventListener('click', handleImageClick);
      return cardElement
};

  //лайк 
/*export function likeCard(evt, cardId) {
  const clickLikeEvt = evt.target.classList.toggle('card__like-button_is-active')
  const clickLike = () => {
    if(clickLikeEvt) {
      return putLike(cardId)
    } else {
      return delLike(cardId)
    }
  };
  const cardLikeCounter = cardItem.querySelector('.card__like-counter')
  clickLike()
  .then(res => {
    cardLikeCounter.textContent = res.likes.length;
  })
  .catch (err => {
    console.error(err)
  })
}*/
 /* if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    delLike(cardId)
      .then((updatedCard) => {
        cardLikeButton.classList.remove('card__like-button_is-active');
        likesCountur.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log('Ошибка при снятии лайка:', err));
  } else {
    putLike(cardId)
      .then((updatedCard) => {
        cardLikeButton.classList.add('card__like-button_is-active');
        likesCountur.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log('Ошибка при добавлении лайка:', err));
  }


// удаление карточек
export function deleteCard(cardElement, cardId) {
  deleteMyCard(cardId)
  .then(() => {
    cardElement.remove();
  })
  .catch((err) => {
    console.log('Ошибка при удалении карточки:', err);
  });
}*/
