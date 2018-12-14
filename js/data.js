'use strict';

// data.js

(function () {
  var offerList = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var appartamentTypes = ['palace', 'flat', 'house', 'bungalo'];
  var checkList = ['12:00', '13:00', '14:00'];
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];

  var map = document.querySelector('.map');

  // функция для расчёта координат маркера

  var getPinCoordinates = function () {
    var x = window.utilites.getRandomNumber(window.constants.X_COORDINATES.min, window.constants.X_COORDINATES.max) + (window.constants.PIN_WIDTH / 2);
    var y = window.utilites.getRandomNumber(window.constants.Y_COORDINATES.min, window.constants.Y_COORDINATES.max) + window.constants.PIN_HEIGHT + window.constants.PIN_END_HEIGHT;
    var coordinates = [x, y];
    return coordinates;
  };

  // функция создания массива photos в произвольном порядке

  var shufflePhoto = function (arr) {
    var photoArray = arr.slice();
    photoArray.sort(function () {
      return Math.random() - 0.5;
    });
    return photoArray;
  };

  // функция создания массива с features случайной длины

  var getRandomFeaturesList = function (featuresData) {
    var featuresAmount = Math.round(Math.random() * (featuresData.length - 1));
    var randomFeatures = featuresData.slice(featuresAmount);
    return randomFeatures;
  };

  // функция генерации массива объектов
  var getAdsCards = function () {

    var cardsList = [];
    for (var i = 0; i < window.constants.CARDS_QUANTITY; i++) {
      var currentCoordinates = getPinCoordinates();

      cardsList[i] = {
        author: {
          avatar: avatars[i]
        },

        offer: {
          title: offerList[i],
          address: currentCoordinates[0] + ',' + currentCoordinates[1],
          price: window.utilites.getRandomNumber(window.constants.PRICE_MIN, window.constants.PRICE_MAX),
          type: window.utilites.getRandomArrayElement(appartamentTypes),
          rooms: window.utilites.getRandomNumber(window.constants.ROOMS_MIN, window.constants.ROOMS_MAX),
          guest: window.utilites.getRandomNumber(window.constants.GUEST_MIN, window.constants.GUEST_MAX),
          checkin: window.utilites.getRandomArrayElement(checkList),
          checkout: window.utilites.getRandomArrayElement(checkList),
          features: getRandomFeaturesList(featuresList),
          description: '',
          photos: shufflePhoto(photosList)
        },

        location: {
          x: currentCoordinates[0],
          y: currentCoordinates[1]
        }
      };
    }
    return cardsList;
  };

  // создание массива объектов

  var adsNearbyList = getAdsCards();

  window.data = {
    photosList: photosList,
    map: map,
    adsNearbyList: adsNearbyList
  };
})();
