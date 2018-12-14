'use strict';

// валидация форм

(function () {
  // минимальные цены на жилье

  var MIN_PRICES = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  // изменение минимального значения цены и placeholder при изменении типа жилья. Синхронизация времени заеда и выезда

  var houseType = document.querySelector('#type');
  var priceInput = document.querySelector('#price');


  // поиск select с временем заезда и выезда

  var checkin = document.querySelector('#timein');
  var checkout = document.querySelector('#timeout');

  // количество комнат из списка

  var ROOM_QUANTITY = ['1', '2', '3', '100'];

  // поиск select с количеством комнат и гостей

  var roomSelect = document.querySelector('#room_number');
  var roomGuest = document.querySelector('#capacity');
  var roomGuestNumber = roomGuest.querySelectorAll('option');

  // установка минимальной цены за жилье

  var setMinPrice = function () {
    var type = houseType.value;
    priceInput.setAttribute('min', MIN_PRICES[type]);
    priceInput.setAttribute('placeholder', MIN_PRICES[type]);
  };

  // функция задания стартового значения количества гостей для 1 комнаты по умолчанию (атрибут selected)

  var getRoomGuestStart = function () {
    roomGuest.querySelector('option[value="0"]').remove();
    roomGuest.querySelector('option[value="2"]').remove();
    roomGuest.querySelector('option[value="3"]').remove();
  };

  // синхронизация количества комнат и допустимого числа гостей

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

  // синхронизация времени заезда и выезда (и наоборот)

  var timeSynchronize = function (evt) {
    if (evt.target.closest('#timein')) {
      checkout.value = checkin.value;
    }

    checkin.value = checkout.value;
  };

  houseType.addEventListener('change', setMinPrice);

  getRoomGuestStart();
  roomSelect.addEventListener('change', setGuestQuantity);

  checkin.addEventListener('change', timeSynchronize);
  checkout.addEventListener('change', timeSynchronize);
})();
