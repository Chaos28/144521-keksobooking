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

  var roomNumber = roomSelect.querySelectorAll('option');
  var guestNumber = roomGuest.querySelectorAll('option');

  // установка минимальной цены за жилье

  var setMinPrice = function () {
    var type = houseType.value;
    priceInput.setAttribute('min', MIN_PRICES[type]);
    priceInput.setAttribute('placeholder', MIN_PRICES[type]);
  };

  var setGuestQuantity = function () {

    Array.from(guestNumber).forEach(function (element) {
      element.disabled = false;
    });

    for (var i = 0; i < roomNumber.length; i++) {
      if (roomNumber[i].selected === true) {
        switch (roomNumber[i].value) {
          case ROOM_QUANTITY[0]:
            guestNumber[2].selected = true;
            guestNumber[0].disabled = true;
            guestNumber[1].disabled = true;
            guestNumber[3].disabled = true;
            break;
          case ROOM_QUANTITY[1]:
            guestNumber[1].selected = true;
            guestNumber[0].disabled = true;
            guestNumber[3].disabled = true;
            break;
          case ROOM_QUANTITY[2]:
            guestNumber[0].selected = true;
            guestNumber[3].disabled = true;
            break;
          case ROOM_QUANTITY[3]:
            guestNumber[3].selected = true;
            guestNumber[0].disabled = true;
            guestNumber[1].disabled = true;
            guestNumber[2].disabled = true;
            break;
        }
      }
    }
  };

  // синхронизация времени заезда и выезда (и наоборот)

  var timeSynchronize = function (evt) {
    if (evt.target.closest('#timein')) {
      checkout.value = checkin.value;
    }

    checkin.value = checkout.value;
  };

  setGuestQuantity();
  houseType.addEventListener('change', setMinPrice);

  roomSelect.addEventListener('change', setGuestQuantity);

  checkin.addEventListener('change', timeSynchronize);
  checkout.addEventListener('change', timeSynchronize);
})();
