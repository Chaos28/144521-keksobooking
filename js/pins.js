'use strict';

// pins.js

// создание и отрисовка маркеров


(function () {
  // поиск блока в DOM дереве, куда будут вставляться маркеры

  var pinsList = document.querySelector('.map__pins');

  // поиск шаблона маркера
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // поиск места в DOM дереве для добавления карточки товара

  var mapFilterContainer = document.querySelector('.map__filters-container');

  // поиск заблокированных элементов фильтра

  var disabledFilterElements = document.querySelector('.map__filters').querySelectorAll('[disabled]');

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
      if (window.utilities.map.querySelector('.map__card') !== null) {
        window.utilities.deleteCard();
      }

      // удаление выделения маркера при выборе другого маркера

      var addedPinsList = pinsList.querySelectorAll('.map__pin');

      Array.from(addedPinsList).forEach(function (pin) {
        pin.classList.remove('map__pin--active');
      });

      // выделение выбранного маркера

      pinElement.classList.add('map__pin--active');

      // отрисовка карточки

      window.utilities.map.insertBefore(window.createCard(dataList), mapFilterContainer);
    });

    return pinElement;
  };

  var insertStartPins = function (dataInfo) {
    window.pinsOnMap.adsList = dataInfo;
    var fragment = document.createDocumentFragment();

    Array.from(window.pinsOnMap.adsList).forEach(function (element, i) {
      if (i < window.constants.CARDS_QUANTITY) {
        fragment.appendChild(getPinTemplate(element));
      }
    });

    pinsList.appendChild(fragment);


    document.querySelector('.map__filters').classList.remove('ad-form--disabled');

    disabledFilterElements.forEach(function (element) {
      element.disabled = false;
    });
  };

  // функция удаления отрисованных маркеров

  var deletePins = function () {
    var mapPinsList = pinsList.querySelectorAll('.map__pin:not(.map__pin--main)');

    Array.from(mapPinsList).forEach(function (pin) {
      pinsList.removeChild(pin);
    });
  };

  window.pins = {
    insertStartPins: insertStartPins,
    deletePins: deletePins,
    getPinTemplate: getPinTemplate,
    pinsList: pinsList,
    disabledFilterElements: disabledFilterElements
  };

})();
