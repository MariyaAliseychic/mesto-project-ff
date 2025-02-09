// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardPlace = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(contentCard, deliteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeliteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').src = contentCard.link;
    cardElement.querySelector('.card__image').alt = contentCard.name;
    cardElement.querySelector('.card__title').textContent = contentCard.name;
    cardDeliteButton.addEventListener('click', deliteCard);
    return cardElement;
    
}

// @todo: Функция удаления карточки
    function deliteCard(el) {
        const cardElement = el.target.closest('.card');
        cardElement.remove();
    }
// @todo: Вывести карточки на страницу
function displayCard(initialCards) {
    initialCards.forEach((contentCard) => {
        const card = createCard(contentCard, deliteCard);
        cardPlace.append(card);
    });
}
displayCard(initialCards);
