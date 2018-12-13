'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var CARDS_QUANTITY = 8;

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 65;

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var PIN_END_HEIGHT = 22;

  var MAIN_PIN_START_X = 570;
  var MAIN_PIN_START_Y = 375;

  var Y_COORDINATES = {
    min: 130 - PIN_HEIGHT - PIN_END_HEIGHT,
    max: 630 - PIN_HEIGHT - PIN_END_HEIGHT
  };

  var X_COORDINATES = {
    min: 0,
    max: 1150
  };

  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;

  var ROOMS_MIN = 1;
  var ROOMS_MAX = 5;

  var GUEST_MIN = 1;
  var GUEST_MAX = 3;

  window.utilites = {
    ESC_KEYCODE: ESC_KEYCODE,

    CARDS_QUANTITY: CARDS_QUANTITY,

    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,

    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    PIN_END_HEIGHT: PIN_END_HEIGHT,

    MAIN_PIN_START_X: MAIN_PIN_START_X,
    MAIN_PIN_START_Y: MAIN_PIN_START_Y,

    Y_COORDINATES: Y_COORDINATES,
    X_COORDINATES: X_COORDINATES,

    PRICE_MIN: PRICE_MIN,
    PRICE_MAX: PRICE_MAX,

    ROOMS_MIN: ROOMS_MIN,
    ROOMS_MAX: ROOMS_MAX,

    GUEST_MIN: GUEST_MIN,
    GUEST_MAX: GUEST_MAX
  };
})();
