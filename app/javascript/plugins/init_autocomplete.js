import places from 'places.js';

const initAutocomplete = () => {
  const addressinput = document.getElementById("flat_address");
  if (addressinput) {
    places({container: addressinput});
  }
}

export { initAutocomplete };
