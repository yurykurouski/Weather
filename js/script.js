import cities from '../json/cities.json';

async function getData(cityName) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&cnt=7&appid=33178d46dea4c98a92d98aa6ea4ebc24&units=metric`, {
    method: 'GET',
  });

  return await response.json();
}

const form = document.querySelector('#search');
const container = document.querySelector('.container');
const searchInput = form.querySelector('input');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const cityName = formData.get('city-name');

  getData(cityName).then((data) => {
    const ul = document.createElement('ul');

    const listItems = data.list.map(day => {
      const date = new Date(day.dt * 1000);
      return `<li>Day: ${date.toLocaleDateString()} Temp: ${day.temp.day}</li>`
    });

    ul.innerHTML = listItems.join('');
    container.appendChild(ul);
  });
});

searchInput.addEventListener('change', (event) => {
  const { value } = event.target;

  const match = cities.reduce((result, city) => {
    if (city.name.toUpperCase().includes(value).toUpperCase()) {
      return [...result, city];
    }

    return result;
  }, []);
  
  console.log(match);
});