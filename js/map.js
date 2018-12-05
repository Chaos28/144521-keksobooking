'use strict';

var offerList = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var appartamentTypes = ['palace', 'flat', 'house', 'bungalo'];
var checkList = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var CARDS_QUANTITY = 8;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var PIN_X_MIN = 0;
var PIN_X_MAX = 1100;
var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;

var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;

var ROOMS_MIN = 1;
var ROOMS_MAX = 5;

var GUEST_MIN = 1;
var GUEST_MAX = 3;

var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];

// случайное число для price от 1000 до 1000000 и rooms от 1 до 5, для количества гостей guest, для координат

var getRandomNumber = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

// функция для расчёта координат маркера

var getPinCoordinates = function () {
  var x = getRandomNumber(PIN_X_MIN, PIN_X_MAX) - (PIN_WIDTH / 2);
  var y = getRandomNumber(PIN_Y_MIN, PIN_Y_MAX) - PIN_HEIGHT;
  var coordinates = [x, y];
  return coordinates;
};

// вывод случайного элемента массива

var getRandomArrayElement = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

// функция создания массива photos в произвольном порядке

var shufflePhoto = function (arr) {
  var j;
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

// функция создания массива с features случайной длины

var getRandomFeaturesList = function (featuresData) {
  var featuresAmount = Math.round(Math.random() * (featuresData.length - 1));
  var randomFeatures = featuresData.slice(featuresAmount);
  return randomFeatures;
};

// функция сопоставления типа жилья

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

// функция отрисовки маркера

var insertPinTemplate = function (dataList) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = dataList.location.x + 'px';
  pinElement.style.top = dataList.location.y + 'px';
  var pinImage = pinElement.querySelector('img');
  pinImage.src = dataList.author.avatar;
  pinImage.alt = dataList.offer.title;

  return pinElement;
};

// генерация массива объектов

var getAdsCards = function () {

  var cardsList = [];
  for (var i = 0; i < CARDS_QUANTITY; i++) {
    var currentCoordinates = getPinCoordinates();

    cardsList[i] = {
      author: {
        avatar: avatars[i]
      },

      offer: {
        title: offerList[i],
        address: currentCoordinates[0] + ',' + currentCoordinates[1],
        price: getRandomNumber(PRICE_MIN, PRICE_MAX),
        type: getRandomArrayElement(appartamentTypes),
        rooms: getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        guest: getRandomNumber(GUEST_MIN, GUEST_MAX),
        checkin: getRandomArrayElement(checkList),
        checkout: getRandomArrayElement(checkList),
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

document.querySelector('.map').classList.remove('map--faded');

// создание массива объектов

var adsNearbyList = getAdsCards();

// отрисовка DOM элементов маркеров

var fragment = document.createDocumentFragment();
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

for (var i = 0; i < adsNearbyList.length; i++) {
  fragment.appendChild(insertPinTemplate(adsNearbyList[i]));
}

var pinsList = document.querySelector('.map__pins');
pinsList.appendChild(fragment);

// Создание карточки

var createCard = function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  cardTemplate.querySelector('.popup__title').textContent = adsNearbyList[0].offer.title;
  cardTemplate.querySelector('.popup__text--address').textContent = adsNearbyList[0].offer.address;
  cardTemplate.querySelector('.popup__text--price').textContent = adsNearbyList[0].offer.price + '₽/ночь';
  cardTemplate.querySelector('.popup__type').textContent = getAppartamentListElement(adsNearbyList[0].offer.type);
  cardTemplate.querySelector('.popup__text--capacity').textContent = adsNearbyList[0].offer.rooms + ' комнаты для ' + adsNearbyList[0].offer.guest;
  cardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsNearbyList[0].offer.checkin + ', выезд до ' + adsNearbyList[0].offer.checkout;

  var featuresIconList = cardTemplate.querySelector('.popup__features');
  var featuresIcon = cardTemplate.querySelector('.popup__feature');
  featuresIconList.innerHTML = '';

  for (var k = 0; k < adsNearbyList[0].offer.features.length; k++) {
    var featuresElement = featuresIcon.cloneNode(true);
    featuresElement.setAttribute('class', 'popup__feature');
    featuresElement.classList.add('popup__feature' + '--' + adsNearbyList[0].offer.features[k]);
    featuresIconList.appendChild(featuresElement);
  }

  cardTemplate.querySelector('.popup__description').textContent = adsNearbyList[0].offer.description;

  var cards = cardTemplate.querySelector('.popup__photos');
  var photo = cardTemplate.querySelector('.popup__photo');
  cards.innerHTML = '';

  for (var j = 0; j < photosList.length; j++) {
    var photoCard = photo.cloneNode(true);
    photoCard.src = photosList[j];

    cards.appendChild(photoCard);
  }
  return cardTemplate;
};

var map = document.querySelector('.map');
var mapFilterContainer = document.querySelector('.map__filters-container');

map.insertBefore(createCard(), mapFilterContainer);
