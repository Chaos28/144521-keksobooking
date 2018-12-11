'use strict';

var offerList = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var appartamentTypes = ['palace', 'flat', 'house', 'bungalo'];
var checkList = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var ESC_KEYCODE = 27;

var CARDS_QUANTITY = 8;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;

var PIN_END_HEIGHT = 22;

var PIN_X_MIN = 100;
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
  return Math.floor((Math.random() * (max - min) + min));
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


// функция генерации массива объектов

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

// поиск шаблона маркера

var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// поиск места в DOM дереве для добавления карточки товара

var map = document.querySelector('.map');
var mapFilterContainer = document.querySelector('.map__filters-container');

// функция удаления отрисованной карточки объявления

var deleteCard = function () {
  map.removeChild(map.querySelector('.map__card'));
};

// функция отрисовки маркера

var getPinTemplate = function (dataList) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = dataList.location.x + 'px';
  pinElement.style.top = dataList.location.y + 'px';
  var pinImage = pinElement.querySelector('img');
  pinImage.src = dataList.author.avatar;
  pinImage.alt = dataList.offer.title;

  // обработчик для вызова карточки объявления при клике на маркер.
  // При клике на другой маркер удаляется старая карточка и создается новая

  pinElement.addEventListener('click', function () {
    if (map.querySelector('.map__card') !== null) {
      deleteCard();
    }

    map.insertBefore(createCard(dataList), mapFilterContainer);
  });
  return pinElement;
};

// поиск блока в DOM дереве, куда будут вставляться маркеры

var pinsList = document.querySelector('.map__pins');

// функция отрисовки DOM элементов маркеров с добавлением во фрагмент

var insertPin = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adsNearbyList.length; i++) {
    fragment.appendChild(getPinTemplate(adsNearbyList[i]));
  }

  pinsList.appendChild(fragment);
};

// функция получения координат основной метки (неактивная страница)

var pinMain = document.querySelector('.map__pin--main');

var getNonActivePinMainCoordinate = function () {
  var pinMainCoordinate = [];
  pinMainCoordinate[0] = parseInt(pinMain.style.left, 10) + Math.floor(MAIN_PIN_WIDTH / 2);
  pinMainCoordinate[1] = parseInt(pinMain.style.top, 10) + Math.floor((MAIN_PIN_HEIGHT / 2));

  return pinMainCoordinate;
};

// функция получения координат основной метки (активная страница)

var getActivePinMainCoordinate = function () {
  var pinMainActiveCoordinate = [];
  pinMainActiveCoordinate[0] = parseInt(pinMain.style.left, 10) + Math.floor(MAIN_PIN_WIDTH / 2);
  pinMainActiveCoordinate[1] = parseInt(pinMain.style.top, 10) + MAIN_PIN_HEIGHT + PIN_END_HEIGHT;

  return pinMainActiveCoordinate;
};

// фунция создания карточки объявления

var createCard = function (cardData) {
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

  for (var j = 0; j < photosList.length; j++) {
    var photoCard = photo.cloneNode(true);
    photoCard.src = cardData.offer.photos[j];

    cards.appendChild(photoCard);
  }

  // добавление обработчика закрытия карточки по нажатию на крестик

  cardTemplate.querySelector('.popup__close').addEventListener('click', deleteCard);

  return cardTemplate;
};

// добавление обработчика на закрытие карточки при нажатии ESC

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (map.querySelector('.map__card') !== null) {
      deleteCard();
    }
  }
});

// _______________________________________________________________________________

// создание массива объектов

var adsNearbyList = getAdsCards();

// поиск поля "Адрес" в форме

var formAddressValue = document.querySelector('#address');

// добавление первоначальных координат главного маркера в поле

formAddressValue.setAttribute('value', getNonActivePinMainCoordinate()[0] + ', ' + getNonActivePinMainCoordinate()[1]);

// добавление обработчика событий для перетаскивания метки.
// Переводит страницу в активное состояние.
// Отрисовывает маркеры, убирает атрибут disabled и класс у недоступных элементов формы

var mapPin = document.querySelector('.map__pin--main');

mapPin.addEventListener('mouseup', function () {
  document.querySelector('.map').classList.remove('map--faded');

  var disabledForm = document.querySelectorAll('.ad-form--disabled');
  var disabledElements = document.querySelectorAll('[disabled]');

  for (var i = 0; i < disabledElements.length; i++) {
    disabledElements[i].removeAttribute('disabled');
  }

  for (var j = 0; j < disabledForm.length; j++) {
    disabledForm[j].classList.remove('ad-form--disabled');
  }
  formAddressValue.setAttribute('value', getActivePinMainCoordinate()[0] + ', ' + getActivePinMainCoordinate()[1]);

  insertPin();
});


