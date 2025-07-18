// check if proteccion de datos is active

(function () {
  'use strict';
  const checkBox = document.querySelector('[data-checkbox]');
  const acceptButton = document.querySelector('[data-send]');
  const validate = () => {
    if (checkBox && checkBox.checked) {
      acceptButton.disabled = false;
      acceptButton.setAttribute('aria-disabled', 'false');
    } else {
      acceptButton.disabled = true;
      acceptButton.setAttribute('aria-disabled', 'true');
    }
  };
  if (checkBox) {
    checkBox.addEventListener('click', validate);
  }
})();
