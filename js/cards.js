'use strict';

// cards.js

(function () {
  // функция для расчёта координат маркера

  var getPinCoordinates = function () {
    var x = window.randomizeData.getRandomNumber(window.utilites.X_COORDINATES.min, window.utilites.X_COORDINATES.max) + (window.utilites.PIN_WIDTH / 2);
    var y = window.randomizeData.getRandomNumber(window.utilites.Y_COORDINATES.min, window.utilites.Y_COORDINATES.max) + window.utilites.PIN_HEIGHT + window.utilites.PIN_END_HEIGHT;
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
    for (var i = 0; i < window.utilites.CARDS_QUANTITY; i++) {
      var currentCoordinates = getPinCoordinates();

      cardsList[i] = {
        author: {
          avatar: window.data.avatars[i]
        },

        offer: {
          title: window.data.offerList[i],
          address: currentCoordinates[0] + ',' + currentCoordinates[1],
          price: window.randomizeData.getRandomNumber(window.utilites.PRICE_MIN, window.utilites.PRICE_MAX),
          type: window.randomizeData.getRandomArrayElement(window.data.appartamentTypes),
          rooms: window.randomizeData.getRandomNumber(window.utilites.ROOMS_MIN, window.utilites.ROOMS_MAX),
          guest: window.randomizeData.getRandomNumber(window.utilites.GUEST_MIN, window.utilites.GUEST_MAX),
          checkin: window.randomizeData.getRandomArrayElement(window.data.checkList),
          checkout: window.randomizeData.getRandomArrayElement(window.data.checkList),
          features: getRandomFeaturesList(window.data.featuresList),
          description: '',
          photos: shufflePhoto(window.data.photosList)
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

  window.adsNearbyList = getAdsCards();
})();
