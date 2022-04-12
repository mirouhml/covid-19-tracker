import axios from 'axios';

const api = axios.create({
  baseURL: 'https://covid-api.mmediagroup.fr/v1',
  headers: {
    'Content-type': 'application/json',
  },
});

const getCovidData = () => api.get('/cases');

export default getCovidData;
