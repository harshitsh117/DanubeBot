const axios = require('axios');

const apiKey = 'c0c7107764fb351c7f542d32806b9d17';
const cityName = 'Jaipur';

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

axios.get(apiUrl)
  .then(response => {
    console.log(response.data.main.temp);
  })
  .catch(error => {
    console.error(error);
  });
  console.log(response.data.main.temp) 
