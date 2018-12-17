'use strict';

// data.js

(function () {

  // поиск большого маркера

  var mapPin = document.querySelector('.map__pin--main');

  // поиск элементов, скрытых при неактивной странице

  var disabledForm = document.querySelectorAll('.ad-form--disabled');
  var disabledElements = document.querySelectorAll('[disabled]');

  // поиск поля "Адрес" в форме

  var formAddressValue = document.querySelector('#address');

  // добавление первоначальных координат главного маркера в поле

  formAddressValue.setAttribute('value', window.mainPin.getNonActivePinMainCoordinate()[0] + ', ' + window.mainPin.getNonActivePinMainCoordinate()[1]);

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

      mapPin.style.left = window.mainPin.getMainPinMovement(mapPin.offsetLeft - shift.x, window.constants.X_COORDINATES) + 'px';
      mapPin.style.top = window.mainPin.getMainPinMovement(mapPin.offsetTop - shift.y, window.constants.Y_COORDINATES) + 'px';
      formAddressValue.setAttribute('value', window.mainPin.getActivePinMainCoordinate()[0] + ', ' + window.mainPin.getActivePinMainCoordinate()[1]);
    };

    // функция отпускания мыши на большом маркере

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();


      // отрисовка маркеров

      if (window.utilites.map.classList.contains('map--faded')) {
        window.backend.load(window.insertPin, window.errorHandler);
      }

      window.utilites.map.classList.remove('map--faded');

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

  // функция очистки страницы  Возвращает главный маркер на стартовую позицию

  window.resetMain = function () {
    window.utilites.map.classList.add('map--faded');

    if (window.utilites.map.querySelector('.map__card') !== null) {
      window.utilites.deleteCard();
    }

    mapPin.style.left = window.constants.MAIN_PIN_START_X + 'px';
    mapPin.style.top = window.constants.MAIN_PIN_START_Y + 'px';
    formAddressValue.setAttribute('value', window.mainPin.getNonActivePinMainCoordinate()[0] + ', ' + window.mainPin.getNonActivePinMainCoordinate()[1]);
    var pinsList = document.querySelector('.map__pins');
    var mapPinsList = pinsList.querySelectorAll('.map__pin');


    for (var k = window.constants.CARDS_QUANTITY; k > 0; k--) {
      var deletedPin = mapPinsList[k];
      pinsList.removeChild(deletedPin);
    }

    for (var i = 0; i < disabledElements.length; i++) {
      disabledElements[i].disabled = true;
    }

    for (var j = 0; j < disabledForm.length; j++) {
      disabledForm[j].classList.add('ad-form--disabled');
    }
  };

  // поиск кнопки сброса формы Очистить.

  var resetButtonClickHandler = document.querySelector('.ad-form__reset');
  var form = document.querySelector('.ad-form');

  // обработчик на кнопку сброса формы

  resetButtonClickHandler.addEventListener('click', function () {
    form.reset();
    window.resetMain();
  });
})();
