'use strict';

// data.js

(function () {


  // создание пустого массива для последующего сохранения в него загруженных данных

  var adsList = [];

  // поиск большого маркера

  var mapPin = document.querySelector('.map__pin--main');

  // поиск элементов, скрытых при неактивной странице

  var disabledForm = document.querySelector('.ad-form');
  var disabledFormElements = document.querySelector('.ad-form').querySelectorAll('[disabled]');

  // поиск поля "Адрес" в форме

  var formAddressValue = document.querySelector('#address');

  // добавление первоначальных координат главного маркера в поле

  formAddressValue.setAttribute('value', window.mainPinCoordinates.getNonActivePinMainCoordinate()[0] + ', ' + window.mainPinCoordinates.getNonActivePinMainCoordinate()[1]);

  // добавление обработчика на нажатие курсором на большом маркере
  // Переводит страницу в активное состояние.
  // Отрисовывает маркеры, убирает атрибут disabled и класс у недоступных элементов формы

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    // функция пересчёта координат перемещения большого маркера

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

      mapPin.style.left = window.mainPinCoordinates.getMainPinMovement(mapPin.offsetLeft - shift.x, window.constants.X_COORDINATES) + 'px';
      mapPin.style.top = window.mainPinCoordinates.getMainPinMovement(mapPin.offsetTop - shift.y, window.constants.Y_COORDINATES) + 'px';
      formAddressValue.setAttribute('value', window.mainPinCoordinates.getActivePinMainCoordinate()[0] + ', ' + window.mainPinCoordinates.getActivePinMainCoordinate()[1]);
    };

    // функция отпускания мыши на большом маркере

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();


      // отрисовка маркеров

      if (window.utilities.map.classList.contains('map--faded')) {
        window.backend.load(window.pins.insertStartPins, window.errorHandler);
      }

      window.utilities.map.classList.remove('map--faded');

      Array.from(disabledFormElements).forEach(function (element) {
        element.disabled = false;
      });

      disabledForm.classList.remove('ad-form--disabled');

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // функция очистки страницы  Возвращает главный маркер на стартовую позицию

  var resetMain = function () {
    window.utilities.map.classList.add('map--faded');

    window.utilities.deleteCard();

    mapPin.style.left = window.constants.MAIN_PIN_START_X + 'px';
    mapPin.style.top = window.constants.MAIN_PIN_START_Y + 'px';
    formAddressValue.setAttribute('value', window.mainPinCoordinates.getNonActivePinMainCoordinate()[0] + ', ' + window.mainPinCoordinates.getNonActivePinMainCoordinate()[1]);

    window.pins.deletePins();

    Array.from(disabledFormElements).forEach(function (element) {
      element.disabled = true;
    });

    Array.from(window.pins.disabledFilterElements).forEach(function (element) {
      element.disabled = true;
    });

    disabledForm.classList.add('ad-form--disabled');
  };

  // поиск кнопки сброса формы Очистить.

  var resetButtonClickHandler = document.querySelector('.ad-form__reset');
  var form = document.querySelector('.ad-form');
  var formFilter = document.querySelector('.map__filters');

  // обработчик на кнопку сброса формы

  resetButtonClickHandler.addEventListener('click', function () {
    form.reset();
    formFilter.reset();
    window.pinsOnMap.resetMain();
  });

  window.pinsOnMap = {
    adsList: adsList,
    resetMain: resetMain
  };
})();
