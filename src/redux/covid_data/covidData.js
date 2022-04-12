import { v4 as uuidv4 } from 'uuid';
import FetchCovidData from '../../services/FetchCovidData';

const GET_COVID_DATA = 'GET_COVID_DATA';

const getCovidData = () => async (dispatch) => {
  try {
    const res = await FetchCovidData();
    const dataArray = Object.entries(res.data);
    const covidData = [];
    dataArray.forEach((data) => {
      if (data[1].All.country && data[1].All.continent && data[1].All.abbreviation) {
        covidData.push({
          id: uuidv4(),
          confirmed: data[1].All.confirmed,
          recovered: data[1].All.recovered,
          deaths: data[1].All.deaths,
          country: data[1].All.country,
          continent: data[1].All.continent,
          abbreviation: data[1].All.abbreviation,
          updated: data[1].All.updated,
        });
      }
    });
    dispatch({
      type: GET_COVID_DATA,
      covidData,
    });
    return Promise.resolve(covidData);
  } catch (err) {
    return Promise.reject(err);
  }
};

const reducer = (covidData = [], action) => {
  switch (action.type) {
    case GET_COVID_DATA:
      return action.covidData;
    default:
      return covidData;
  }
};

export { getCovidData };
export default reducer;
