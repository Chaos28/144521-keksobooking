'use strict';

// main-pin.js
// главный маркер
// функция получения координат основной метки (неактивная страница)
(function () {
  var pinMain = document.querySelector('.map__pin--main');

  var getNonActivePinMainCoordinate = function () {
    var pinMainCoordinate = [];
    pinMainCoordinate[0] = parseInt(pinMain.style.left, 10) + Math.floor(window.utilites.MAIN_PIN_WIDTH / 2);
    pinMainCoordinate[1] = parseInt(pinMain.style.top, 10) + Math.floor((window.utilites.MAIN_PIN_HEIGHT / 2));

    return pinMainCoordinate;
  };

  // функция получения координат основной метки (активная страница)

  var getActivePinMainCoordinate = function () {
    var pinMainActiveCoordinate = [];
    pinMainActiveCoordinate[0] = parseInt(pinMain.style.left, 10) + Math.floor(window.utilites.MAIN_PIN_WIDTH / 2);
    pinMainActiveCoordinate[1] = parseInt(pinMain.style.top, 10) + window.utilites.MAIN_PIN_HEIGHT + window.utilites.PIN_END_HEIGHT;

    return pinMainActiveCoordinate;
  };

  // поиск поля "Адрес" в форме

  var formAddressValue = document.querySelector('#address');

  // добавление первоначальных координат главного маркера в поле

  formAddressValue.setAttribute('value', getNonActivePinMainCoordinate()[0] + ', ' + getNonActivePinMainCoordinate()[1]);

  // добавление обработчика событий для перетаскивания метки.
  // Переводит страницу в активное состояние.
  // Отрисовывает маркеры, убирает атрибут disabled и класс у недоступных элементов формы

  var disabledForm = document.querySelectorAll('.ad-form--disabled');
  var disabledElements = document.querySelectorAll('[disabled]');

  var mapPin = document.querySelector('.map__pin--main');

  // функция ограничения перемещения маркера

  var getMainPinMovement = function (coordinates, coordinatesObj) {
    if (coordinates < coordinatesObj.min) {
      return coordinatesObj.min;
    }
    if (coordinates > coordinatesObj.max) {
      return coordinatesObj.max;
    }
    return coordinates;
  };

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();


    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPin.style.left = getMainPinMovement(mapPin.offsetLeft - shift.x, window.utilites.X_COORDINATES) + 'px';
      mapPin.style.top = getMainPinMovement(mapPin.offsetTop - shift.y, window.utilites.Y_COORDINATES) + 'px';
      formAddressValue.setAttribute('value', getActivePinMainCoordinate()[0] + ', ' + getActivePinMainCoordinate()[1]);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (window.map.classList.contains('map--faded')) {
        window.insertPin();
      }

      window.map.classList.remove('map--faded');


      for (var i = 0; i < disabledElements.length; i++) {
        disabledElements[i].disabled = false;
      }

      for (var j = 0; j < disabledForm.length; j++) {
        disabledForm[j].classList.remove('ad-form--disabled');
      }


      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // сброс формы при нажатии Очистить. Возвращает главный маркер на стартовую позицию

  var resetButton = document.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', function () {
    window.map.classList.add('map--faded');
    window.deleteCard();
    mapPin.style.left = window.utilites.MAIN_PIN_START_X + 'px';
    mapPin.style.top = window.utilites.MAIN_PIN_START_Y + 'px';
    formAddressValue.setAttribute('value', getNonActivePinMainCoordinate()[0] + ', ' + getNonActivePinMainCoordinate()[1]);
    var pinsList = document.querySelector('.map__pins');
    var mapPinsList = pinsList.querySelectorAll('.map__pin');


    for (var k = window.adsNearbyList.length; k > 0; k--) {
      var deletedPin = mapPinsList[k];
      pinsList.removeChild(deletedPin);
    }

    for (var i = 0; i < disabledElements.length; i++) {
      disabledElements[i].disabled = true;
    }

    for (var j = 0; j < disabledForm.length; j++) {
      disabledForm[j].classList.add('ad-form--disabled');
    }
  });
})();
