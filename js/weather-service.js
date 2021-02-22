import API_KEY from "./openweathermap-api-key.js";
import requestService from "./request-service.js";

class WeatherService {
  constructor(requestService) {
    this.requestService = requestService;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async getCurrentWeather(cityName) {
    try {
      const result = await this.requestService.get(`${this.baseUrl}/weather?q=${cityName}&appid=${API_KEY}&units=metric`);

      return result;
    } catch (error) {
      if (error.message === '404') {
        throw Error('City not found');
      }
    }
  }

  async getForecast(cityName) {
    try {
      const result = this.requestService.get(`${this.baseUrl}/forecast/daily?q=${cityName}&appid=${API_KEY}&units=metric&cnt=7`);

      return result;
    } catch (error) {
      if (erro.message === '404') {
        throw Error('City not found');
      }
    }
  }
}

const weatherService = new WeatherService(requestService);

export default weatherService;