'use strict';

// валидация форм

// изменение минимального значения цены и placeholder при изменении типа жилья

var houseType = document.querySelector('#type');
var priceInput = document.querySelector('#price');

var MIN_PRICES = {
  bungalo: '0',
  flat: '1000',
  house: '5000',
  palace: '10000'
};

var setMinPrice = function () {
  var type = houseType.value;
  priceInput.setAttribute('min', MIN_PRICES[type]);
  priceInput.setAttribute('placeholder', MIN_PRICES[type]);
};

houseType.addEventListener('change', setMinPrice);

// функция задания стартового значения количества гостей для 1 комнаты по умолчанию (атрибут selected)

var getRoomGuestStart = function () {
  roomGuest.querySelector('option[value="0"]').remove();
  roomGuest.querySelector('option[value="2"]').remove();
  roomGuest.querySelector('option[value="3"]').remove();
};

// синхронизация количества комнат и допустимого числа гостей

var ROOM_QUANTITY = ['1', '2', '3', '100'];

var roomSelect = document.querySelector('#room_number');
var roomGuest = document.querySelector('#capacity');
var roomGuestNumber = roomGuest.querySelectorAll('option');

var setGuestQuantity = function () {
  roomGuest.innerHTML = '';
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < roomGuestNumber.length; i++) {
    fragment.appendChild(roomGuestNumber[i]);
  }

  roomGuest.appendChild(fragment);
  var roomNumber = roomSelect.value;

  if (roomNumber === ROOM_QUANTITY[0]) {
    roomGuest.querySelector('option[value="0"]').remove();
    roomGuest.querySelector('option[value="2"]').remove();
    roomGuest.querySelector('option[value="3"]').remove();
  } else if (roomNumber === ROOM_QUANTITY[1]) {
    roomGuest.querySelector('option[value="0"]').remove();
    roomGuest.querySelector('option[value="3"]').remove();
  } else if (roomNumber === ROOM_QUANTITY[2]) {
    roomGuest.querySelector('option[value="0"]').remove();
  } else if (roomNumber === ROOM_QUANTITY[3]) {
    roomGuest.querySelector('option[value="1"]').remove();
    roomGuest.querySelector('option[value="2"]').remove();
    roomGuest.querySelector('option[value="3"]').remove();
  }
};

getRoomGuestStart();
roomSelect.addEventListener('change', setGuestQuantity);
