import axios from 'axios';

const api = axios.create({
  baseURL: 'https://covid-api.mmediagroup.fr/v1',
  headers: {
    'Content-type': 'application/json',
  },
});

const FetchCovidData = () => api.get('/cases');
const FetchCovidDataHistory = () => api.get('/history?status=confirmed');
const FetchCovidDataHistoryDeaths = () => api.get('/history?status=deaths');
const FetchHistoryConfirmedCases = (country) => api.get(`/history?country=${country}&status=confirmed`);
const FetchHistoryDeathCases = (country) => api.get(`/history?country=${country}&status=deaths`);
export {
  FetchCovidData,
  FetchHistoryConfirmedCases,
  FetchHistoryDeathCases,
  FetchCovidDataHistory,
  FetchCovidDataHistoryDeaths,
};
