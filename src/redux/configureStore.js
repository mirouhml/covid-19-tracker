import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import dataReducer from './covid_data/covidData';
import historyReducer from './covid_data/covidHistory';

const rootReducer = combineReducers({
  covidData: dataReducer,
  covidHistory: historyReducer,
});
const initialState = {};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
