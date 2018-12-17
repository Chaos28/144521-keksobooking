'use strict';

// main-pin.js

(function () {
  // главный маркер

  var pinMain = document.querySelector('.map__pin--main');

  // функция получения координат основной метки (неактивная страница)

  var getNonActivePinMainCoordinate = function () {
    var pinMainCoordinate = [];
    pinMainCoordinate[0] = parseInt(pinMain.style.left, 10) + Math.floor(window.constants.MAIN_PIN_WIDTH / 2);
    pinMainCoordinate[1] = parseInt(pinMain.style.top, 10) + Math.floor((window.constants.MAIN_PIN_HEIGHT / 2));

    return pinMainCoordinate;
  };

  // функция получения координат основной метки (активная страница)

  var getActivePinMainCoordinate = function () {
    var pinMainActiveCoordinate = [];
    pinMainActiveCoordinate[0] = parseInt(pinMain.style.left, 10) + Math.floor(window.constants.MAIN_PIN_WIDTH / 2);
    pinMainActiveCoordinate[1] = parseInt(pinMain.style.top, 10) + window.constants.MAIN_PIN_HEIGHT + window.constants.PIN_END_HEIGHT;

    return pinMainActiveCoordinate;
  };

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

  window.mainPin = {
    getNonActivePinMainCoordinate: getNonActivePinMainCoordinate,
    getActivePinMainCoordinate: getActivePinMainCoordinate,
    getMainPinMovement: getMainPinMovement
  };
})();
