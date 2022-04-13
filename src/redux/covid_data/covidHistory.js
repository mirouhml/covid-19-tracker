import { FetchHistoryConfirmedCases, FetchHistoryDeathCases } from '../../services/FetchCovidData';

const FETCHING_DATA = 'FETCHING_DATA';
const FETCHING_SUCCESS = 'FETCHING_SUCCESS';
const FETCHING_ERROR = 'FETCHING_ERROR';

const initialState = {
  fetched: false,
  history: {
    confirmedHistory: {},
    deathHistory: {},
  },
  error: '',
};

const getHistoryData = (country) => async (dispatch) => {
  try {
    dispatch({
      type: FETCHING_DATA,
    });
    const res = await FetchHistoryConfirmedCases(country);
    const res2 = await FetchHistoryDeathCases(country);
    if (res.status !== 200 || res2.status !== 200) {
      throw new Error(
        'Can not fetch Covid-19 data from the API.',
      );
    }
    const historyData = {};
    historyData.confirmedHistory = res.data.All.dates;
    historyData.deathHistory = res2.data.All.dates;
    dispatch({
      type: FETCHING_SUCCESS,
      historyData,
    });
    return Promise.resolve(historyData);
  } catch (err) {
    dispatch({
      type: FETCHING_ERROR,
      error: err.message,
    });
    return Promise.reject(err);
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA:
      return { ...state, fetched: false };
    case FETCHING_SUCCESS:
      return {
        fetched: true,
        history: action.historyData,
        error: '',
      };
    case FETCHING_ERROR:
      return {
        fetched: false,
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export { getHistoryData };
export default reducer;
