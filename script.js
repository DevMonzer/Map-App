'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const year = document.getElementById('year');

year.innerHTML = new Date().getFullYear();

let map;

// Getting the user's current location
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    // If we successfully got the current position of the user we then display the location on the map using Leaflet library
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      const coords = [latitude, longitude];

      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Adding a marker on the page based on a click event han

      map.on('click', function (mapEvent) {
        const { lat, lng } = mapEvent.latlng;
        // console.log(lat, lng);

        // To show a form on user click
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    // If we didn't successfully get the current position of the user we then display an error message
    function () {
      alert('Please allow this app to use your current location');
    }
  );

form.addEventListener('submit', function () {
  // Display Marker
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: `running-popup`,
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});
