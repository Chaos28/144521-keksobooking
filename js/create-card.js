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

    var popupAvatar = cardTemplate.querySelector('.popup__avatar');
    var popupTitle = cardTemplate.querySelector('.popup__title');
    var popupAddress = cardTemplate.querySelector('.popup__text--address');
    var popupPrice = cardTemplate.querySelector('.popup__text--price');
    var popupType = cardTemplate.querySelector('.popup__type');
    var popupCapacity = cardTemplate.querySelector('.popup__text--capacity');
    var popupTime = cardTemplate.querySelector('.popup__text--time');
    var popupDescription = cardTemplate.querySelector('.popup__description');

    popupAvatar.src = cardData.author.avatar;
    popupTitle.textContent = cardData.offer.title;
    popupAddress.textContent = cardData.offer.address;
    popupPrice.textContent = cardData.offer.price + '₽/ночь';
    popupType.textContent = getAppartamentListElement(cardData.offer.type);
    popupCapacity.textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests;
    popupTime.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    popupDescription.textContent = cardData.offer.description;

    var popupFeatures = cardTemplate.querySelector('.popup__features');
    var featuresIcon = cardTemplate.querySelector('.popup__feature');
    popupFeatures.innerHTML = '';

    for (var k = 0; k < cardData.offer.features.length; k++) {
      var featuresElement = featuresIcon.cloneNode(true);
      featuresElement.setAttribute('class', 'popup__feature');
      featuresElement.classList.add('popup__feature' + '--' + cardData.offer.features[k]);
      popupFeatures.appendChild(featuresElement);
    }

    // отображение фотографий

    var popupPhotos = cardTemplate.querySelector('.popup__photos');
    var photo = cardTemplate.querySelector('.popup__photo');
    popupPhotos.innerHTML = '';

    for (var j = 0; j < cardData.offer.photos.length; j++) {
      var photoCard = photo.cloneNode(true);
      photoCard.src = cardData.offer.photos[j];

      popupPhotos.appendChild(photoCard);
    }

    // добавление обработчика закрытия карточки по нажатию на крестик

    cardTemplate.querySelector('.popup__close').addEventListener('click', window.utilites.deleteCard);

    // проверка на наличие данных при загрузке и скрытие блоков без данных

    if (!cardData.author.avatar) {
      popupAvatar.setAttribute('style', 'display: none;');
    }

    if (!cardData.offer.title) {
      popupTitle.setAttribute('style', 'display: none;');
    }

    if (!cardData.offer.address) {
      popupAddress.setAttribute('style', 'display: none;');
    }

    if (!cardData.offer.price) {
      popupPrice.setAttribute('style', 'display: none;');
    }

    if (!cardData.offer.type) {
      popupType.setAttribute('style', 'display: none;');
    }

    if (!cardData.offer.checkin || !cardData.offer.checkout) {
      popupTime.setAttribute('style', 'display: none;');
    }

    if (cardData.offer.features.length === 0) {
      popupFeatures.setAttribute('style', 'display: none;');
    }

    if (!cardData.offer.description) {
      popupDescription.setAttribute('style', 'display: none;');
    }

    if (cardData.offer.photos.length === 0) {
      popupPhotos.setAttribute('style', 'display: none;');
    }

    if (!cardData.offer.rooms || !cardData.offer.guests) {
      popupCapacity.setAttribute('style', 'display: none;');
    }

    return cardTemplate;
  };

  // добавление обработчика на закрытие карточки при нажатии ESC

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      if (window.utilites.map.querySelector('.map__card') !== null) {
        window.utilites.deleteCard();
      }
    }
  });
})();
