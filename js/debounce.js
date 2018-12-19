'use strict';

(function () {
  // модуль debounce для устранения дребезга при использовании фильтра
  var DEBOUNCE_TIME = 500;

  var lastTimeout;
  window.debounce = function (act) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(act, DEBOUNCE_TIME);
  };
})();
