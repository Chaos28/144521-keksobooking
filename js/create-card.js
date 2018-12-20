'use strict';

// createCard.js

// функция сопоставления типа жилья
(function () {
  var getApartmentListElement = function (apartmentType) {
    var resultType;

    switch (apartmentType) {
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
    var popupAvatar = cardTemplate.querySelector('.popup__avatar');
    var popupTitle = cardTemplate.querySelector('.popup__title');
    var popupAddress = cardTemplate.querySelector('.popup__text--address');
    var popupPrice = cardTemplate.querySelector('.popup__text--price');
    var popupType = cardTemplate.querySelector('.popup__type');
    var popupCapacity = cardTemplate.querySelector('.popup__text--capacity');
    var popupTime = cardTemplate.querySelector('.popup__text--time');
    var popupDescription = cardTemplate.querySelector('.popup__description');
    var popupFeatures = cardTemplate.querySelector('.popup__features');
    var featuresIcon = cardTemplate.querySelector('.popup__feature');
    var popupPhotos = cardTemplate.querySelector('.popup__photos');
    var photo = cardTemplate.querySelector('.popup__photo');

    // функция добавления данных карты объявления

    var insertDataCard = function (cardInfo) {
      popupAvatar.src = cardInfo.author.avatar;
      popupTitle.textContent = cardInfo.offer.title;
      popupAddress.textContent = cardInfo.offer.address;
      popupPrice.textContent = cardInfo.offer.price + '₽/ночь';
      popupType.textContent = getApartmentListElement(cardInfo.offer.type);
      popupCapacity.textContent = cardInfo.offer.rooms + ' комнаты для ' + cardInfo.offer.guests;
      popupTime.textContent = 'Заезд после ' + cardInfo.offer.checkin + ', выезд до ' + cardInfo.offer.checkout;
      popupDescription.textContent = cardInfo.offer.description;
    };

    // функция добавления иконок удобств объявления

    var insertFeaturesCard = function (featuresData) {
      popupFeatures.innerHTML = '';

      Array.from(featuresData.offer.features).forEach(function (elementFeature) {
        var featuresElement = featuresIcon.cloneNode(true);
        featuresElement.setAttribute('class', 'popup__feature');
        featuresElement.classList.add('popup__feature' + '--' + elementFeature);
        popupFeatures.appendChild(featuresElement);
      });
    };

    // функция добавления фотографий объявления

    var insertPhotosCard = function (photoData) {
      popupPhotos.innerHTML = '';

      Array.from(photoData.offer.photos).forEach(function (elementPhoto) {
        var photoCard = photo.cloneNode(true);
        photoCard.src = elementPhoto;
        popupPhotos.appendChild(photoCard);
      });
    };

    insertDataCard(cardData);
    insertFeaturesCard(cardData);
    insertPhotosCard(cardData);
    // добавление обработчика закрытия карточки по нажатию на крестик

    cardTemplate.querySelector('.popup__close').addEventListener('click', window.utilities.deleteCard);

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
      if (window.utilities.map.querySelector('.map__card') !== null) {
        window.utilities.deleteCard();
      }
    }
  });
})();
