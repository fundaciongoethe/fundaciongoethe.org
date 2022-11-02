import validator from 'validator';

// check if proteccion de datos is active

(function () {
  'use strict';

  const checkBox = document.getElementById('mce-group[14393]-14393-0');
  const acceptButton = document.getElementById('mcsend');
  const validate = () => {
    if (checkBox.checked) {
      acceptButton.disabled = false;
      acceptButton.setAttribute('aria-disabled', 'false');
    } else {
      acceptButton.disabled = true;
      acceptButton.setAttribute('aria-disabled', 'true');
    }
  };
  checkBox.addEventListener('click', validate);
})();

// validator.js

window.onload = function (event) {
  // form validation

  function inputValidator(id, value) {
    // check email validity
    if (id === 'email') {
      return validator.isEmail(value);
    }
    // check US postal code validity
    if (id === 'postal') {
      return validator.isPostalCode(value, 'US');
    }
    return false;
  }
  const inputs = document.querySelectorAll('#example input');
  inputs.forEach((input) => {
    // fire an event each time an input value changes
    input.addEventListener('input', () => {
      // pass the input value to the validation function
      const valid = inputValidator(input.id, input.value);
      // if not valid set the aria-invalid attribute to true
      if (!valid && input.value.length > 0) {
        this.setAttribute('aria-invalid', 'true');
      }
    });
  });
};
