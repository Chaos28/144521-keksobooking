'use strict';

// createCard.js

// функция сопоставления типа жилья
(function () {
  var getAppartamentListElement = function (appartamentType) {
    var resultType;

    switch (appartamentType) {
      case 'flat':
        resultType = 'Квартира';
        break;

      case 'bungalo':
        resultType = 'Бунгало';
        break;

      case 'house':
        resultType = 'Дом';
        break;

      case 'palace':
        resultType = 'Дворец';
        break;
    }

    return resultType;
  };

  // фунция создания карточки объявления

  window.createCard = function (cardData) {
    var cardExample = document.querySelector('#card').content.querySelector('.map__card');
    var cardTemplate = cardExample.cloneNode(true);
    // добавление данных из массива в карточку

    cardTemplate.querySelector('.popup__avatar').src = cardData.author.avatar;
    cardTemplate.querySelector('.popup__title').textContent = cardData.offer.title;
    cardTemplate.querySelector('.popup__text--address').textContent = cardData.offer.address;
    cardTemplate.querySelector('.popup__text--price').textContent = cardData.offer.price + '₽/ночь';
    cardTemplate.querySelector('.popup__type').textContent = getAppartamentListElement(cardData.offer.type);
    cardTemplate.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guest;
    cardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;

    // отображение иконок удобств

    var featuresIconList = cardTemplate.querySelector('.popup__features');
    var featuresIcon = cardTemplate.querySelector('.popup__feature');
    featuresIconList.innerHTML = '';

    for (var k = 0; k < cardData.offer.features.length; k++) {
      var featuresElement = featuresIcon.cloneNode(true);
      featuresElement.setAttribute('class', 'popup__feature');
      featuresElement.classList.add('popup__feature' + '--' + cardData.offer.features[k]);
      featuresIconList.appendChild(featuresElement);
    }

    cardTemplate.querySelector('.popup__description').textContent = cardData.offer.description;

    // отображение фотографий

    var cards = cardTemplate.querySelector('.popup__photos');
    var photo = cardTemplate.querySelector('.popup__photo');
    cards.innerHTML = '';

    for (var j = 0; j < window.data.photosList.length; j++) {
      var photoCard = photo.cloneNode(true);
      photoCard.src = cardData.offer.photos[j];

      cards.appendChild(photoCard);
    }

    // добавление обработчика закрытия карточки по нажатию на крестик

    cardTemplate.querySelector('.popup__close').addEventListener('click', window.utilites.deleteCard);

    return cardTemplate;
  };

  // добавление обработчика на закрытие карточки при нажатии ESC

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      if (window.data.map.querySelector('.map__card') !== null) {
        window.utilites.deleteCard();
      }
    }
  });
})();
