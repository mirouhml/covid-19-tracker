import { v4 as uuidv4 } from 'uuid';
import Maps from '@svg-maps/world';
import { FetchCovidData } from '../../services/FetchCovidData';

const FETCHING_COVID_DATA = 'FETCHING_COVID_DATA';
const FETCHING_COVID_SUCCESS = 'FETCHING_COVID_SUCCESS';
const FETCHING_COVID_ERROR = 'FETCHING_COVID_ERROR';

const initialState = {
  fetched: false,
  data: {},
  error: '',
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
      throw new Error(
        'The API is down.',
      );
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
