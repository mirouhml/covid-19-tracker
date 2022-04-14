import { v4 as uuidv4 } from 'uuid';
import Maps from '@svg-maps/world';
import { FetchCovidData, FetchCovidDataHistory, FetchCovidDataHistoryDeaths } from '../../services/FetchCovidData';

const FETCHING_COVID_DATA = 'FETCHING_COVID_DATA';
const FETCHING_COVID_SUCCESS = 'FETCHING_COVID_SUCCESS';
const FETCHING_COVID_ERROR = 'FETCHING_COVID_ERROR';

const initialState = {
  fetched: false,
  data: {},
  error: '',
  dataType: 'new',
};

const getMap = (id) => {
  const map = Maps.locations.filter((loc) => loc.id === id);
  if (map.length > 0) return map[0].path;
  return '';
};

const getCovidData = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCHING_COVID_DATA,
    });
    const res = await FetchCovidData();
    if (res.status !== 200) {
      throw new Error(
        'Can not fetch Covid-19 data from the API.',
      );
    }
    if (Object.keys(res.data)[0] === 'Global') {
      const res2 = await FetchCovidDataHistory();
      const res3 = await FetchCovidDataHistoryDeaths();
      if (res2.status !== 200 || res3.status !== 200) {
        throw new Error(
          'Can not fetch Covid-19 data from the API.',
        );
      }
      const data2 = Object.entries(res2.data);
      const data3 = Object.entries(res3.data);
      const covidData = [];
      data2.forEach((data, index) => {
        if (data[1].All.country && data[1].All.continent && data[1].All.abbreviation) {
          covidData.push({
            id: uuidv4(),
            confirmed: Object.entries(data[1].All.dates)[0][1],
            deaths: Object.entries(data3[index][1].All.dates)[0][1],
            country: data[1].All.country,
            continent: data[1].All.continent,
            abbreviation: data[1].All.abbreviation,
            map: getMap(data[1].All.abbreviation.toLowerCase()),
          });
        }
      });
      dispatch({
        type: FETCHING_COVID_SUCCESS,
        covidData,
        dataType: 'old',
      });
      return Promise.resolve(covidData);
    }
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
          map: getMap(data[1].All.abbreviation.toLowerCase()),
        });
      }
    });
    dispatch({
      type: FETCHING_COVID_SUCCESS,
      covidData,
      dataType: 'new',
    });
    return Promise.resolve(covidData);
  } catch (err) {
    dispatch({
      type: FETCHING_COVID_ERROR,
      error: err.message,
    });
    return Promise.reject(err);
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_COVID_DATA:
      return { ...state, fetched: false };
    case FETCHING_COVID_SUCCESS:
      return {
        fetched: true,
        data: action.covidData,
        error: '',
        dataType: action.dataType,
      };
    case FETCHING_COVID_ERROR:
      return {
        fetched: false,
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export { getCovidData };
export default reducer;
