import citiesService from './cities-service.js';
import weatherService from './weather-service.js';

const form = document.getElementById('search');
const container = document.querySelector('.container');
const searchInput = document.querySelector('#search input');
const listContainer = form.querySelector('#list-container');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const cityName = formData.get('city-name');

  const data = await weatherService.getForecast(cityName);

  const currentWeather = await weatherService.getCurrentWeather(cityName);

  const div = document.createElement('div');

  div.innerHTML = `
    <span>Current temp is ${currentWeather.main.temp}</span>
  `

  const ul = document.createElement('ul');

  const listItems = data.list.map(day => {
    const date = new Date(day.dt * 1000);
    return `<li>Day: ${date.toLocaleDateString()} Temp: ${day.temp.day}</li>`
  });

  ul.innerHTML = listItems.join('');
  container.appendChild(ul);
  container.appendChild(div);

  removeListContainer();
});


function removeListContainer() {
  listContainer.style.display = 'none';
}

listContainer.addEventListener('click', (event) => {
  console.log(event.target);
});

function renderCityList(cities) {
  listContainer.style.display = 'block';

  if (!cities.length) {
    listContainer.innerHTML = `<div>No match</div>`;
    return
  }

  const listItems = cities.map(city => {
    return `<div class='list-item'><strong>${city.name}</strong> ${city.country}</div>`
  });

  listContainer.innerHTML = listItems.join('');
}

/* searchInput.addEventListener('blur', (event) => { 
  removeListContainer();
}); */

searchInput.addEventListener('focus', () => {
  listContainer.style.display = 'block';
});

searchInput.addEventListener('input', async (event) => {
  const {
    value
  } = event.target;

  const cities = await citiesService.getCities();

  const match = cities.filter((city) => {
    if (city.name.toUpperCase().includes(value.toUpperCase())) {
      return true;
    }
    return false;
  });

  renderCityList(match.slice(0, 5));
});

//! поробовать сделать чтобы в инпут добавлялось имя города пр клике на выпадающий список