'use strict';
// фильтрация отрисовываемых маркеров

(function () {

  // создание словаря с диапазонами цен жилья

  var HousingPriceRange = {
    low: {
      minPrice: 0,
      maxPrice: 10000
    },

    middle: {
      minPrice: 10000,
      maxPrice: 50000
    },

    high: {
      minPrice: 50000,
      maxPrice: Infinity
    }
  };

  // базовое значение value у select в форме фильтрации

  var BASE_VALUE = 'any';

  // поиск формы с фильтрами и её элементов для фильтрации

  var mapFilters = document.querySelector('.map__filters');
  var housingTypeSelect = mapFilters.querySelector('#housing-type');
  var housingPriceSelect = mapFilters.querySelector('#housing-price');
  var housingRoomsSelect = mapFilters.querySelector('#housing-rooms');
  var housingGuestsSelect = mapFilters.querySelector('#housing-guests');
  var featuresCheckboxList = mapFilters.querySelectorAll('.map__checkbox');

  // функция фильтрации объявлений по типу жилья

  var housingTypeChange = function (realtor) {
    if (housingTypeSelect.value === BASE_VALUE) {
      return true;
    }

    return realtor.offer.type === housingTypeSelect.value;
  };

  // функция фильтрации объявлений по диапазону цен

  var housingPriceChange = function (realtor) {
    switch (housingPriceSelect.value) {

      case 'low':
        return realtor.offer.price <= HousingPriceRange.low.maxPrice;

      case 'middle':
        return realtor.offer.price >= HousingPriceRange.middle.minPrice && realtor.offer.price <= HousingPriceRange.middle.maxPrice;

      case 'high':
        return realtor.offer.price >= HousingPriceRange.high.minPrice;

      default:
        return true;
    }
  };

  // функция фильтрации объявлений по количеству комнат

  var housingRoomsChange = function (realtor) {
    if (housingRoomsSelect.value === BASE_VALUE) {
      return true;
    }

    return realtor.offer.rooms === +housingRoomsSelect.value;
  };

  var housingGuestsChange = function (realtor) {
    if (housingGuestsSelect.value === BASE_VALUE) {
      return true;
    }

    return realtor.offer.guests === +housingGuestsSelect.value;
  };

  // функция фильтрации объявлений по удобствам

  var housingFeaturesChange = function (realtor) {
    for (var i = 0; i < featuresCheckboxList.length; i++) {
      if (featuresCheckboxList[i].checked && realtor.offer.features.indexOf(featuresCheckboxList[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var insertFilteredPins = function (filteredPins) {
    var fragment = document.createDocumentFragment();

    Array.from(filteredPins).forEach(function (pin, i) {
      if (i < window.constants.CARDS_QUANTITY) {
        fragment.appendChild(window.pins.getPinTemplate(pin));
      }
    });

    window.pins.pinsList.appendChild(fragment);
  };

  // функция добавления отфильтрованных объявлений

  var filterAds = function () {
    var adsListCopy = window.pinsOnMap.adsList.slice();

    window.pins.deletePins();
    window.utilities.deleteCard();
    var filteredAds = adsListCopy.filter(function (realtor) {
      return housingTypeChange(realtor) && housingPriceChange(realtor) && housingRoomsChange(realtor) && housingGuestsChange(realtor) && housingFeaturesChange(realtor);
    });

    if (filteredAds.length > 0) {
      insertFilteredPins(filteredAds);
    }
  };

  mapFilters.addEventListener('change', function () {
    window.debounce(filterAds);
  });

})();
