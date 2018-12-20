'use strict';

(function () {

  // функция отображения сообщения при успешной отправке формы
  var main = document.querySelector('main');

  var getSuccessModal = function () {
    var successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

    main.insertBefore(successMessage, main.firstChild);

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        if (main.querySelector('.success') !== null) {
          main.removeChild(successMessage);
        }
      }
    });

    window.addEventListener('click', function () {
      if (main.querySelector('.success') !== null) {
        main.removeChild(successMessage);
      }
    });
  };

  var getErrorModal = function () {
    var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    var errorButton = document.querySelector('#error').content.querySelector('.error__button');
    main.insertBefore(errorMessage, main.firstChild);

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        if (main.querySelector('.error') !== null) {
          main.removeChild(errorMessage);
        }
      }
    });

    window.addEventListener('click', function () {
      if (main.querySelector('.error') !== null) {
        main.removeChild(errorMessage);
      }
    });

    errorButton.addEventListener('click', function () {
      main.removeChild(errorMessage);
    });
  };

  var form = document.querySelector('.ad-form');

  // обработчик события на отправку данных формы

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), getSuccessModal, getErrorModal);
    form.reset();
    window.pinsOnMap.resetMain();
    evt.preventDefault();
  });
})();
