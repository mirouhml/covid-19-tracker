import '@testing-library/jest-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { screen, render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import {
  HashRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import covidData from '../redux/covid_data/covidData';
import covidHistory from '../redux/covid_data/covidHistory';
import App from '../App';
import Category from '../components/Category';
import Details from '../components/Details';

const rootReducer = combineReducers({
  covidData,
  covidHistory,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

const initialState = {
  covidData: {
    data: {},
    dataType: 'new',
    error: '',
    fetched: false,
  },
  covidHistory: {
    error: '',
    fetched: false,
    history: {
      confirmedHistory: {},
      deathHistory: {},
    },
  },
};

const mockCovidData = [
  {
    id: '1',
    abbreviation: 'AF',
    confirmed: 178295,
    continent: 'Asia',
    country: 'Afghanistan',
    deaths: 7676,
    map: 'map1',
    recovered: 0,
    updated: '2022-04-13 23:21:06',
  },
  {
    id: '2',
    abbreviation: 'AL',
    confirmed: 274320,
    continent: 'Europe',
    country: 'Albania',
    deaths: 3494,
    map: 'map2',
    recovered: 0,
    updated: '2022-04-13 23:21:06',
  },
  {
    id: '3',
    abbreviation: 'DZ',
    confirmed: 265731,
    continent: 'Africa',
    country: 'Algeria',
    deaths: 6874,
    map: 'map3',
    recovered: 0,
    updated: '2022-04-13 23:21:06',
  },
];

const mockCovidHistoryData = {
  confirmedHistory: {
    '2020-04-13': 467,
    '2020-04-14': 475,
    '2020-04-15': 494,
    '2020-04-16': 518,
    '2020-04-17': 539,
    '2020-04-18': 548,
  },
  deathHistory: {
    '2020-04-13': 367,
    '2020-04-14': 375,
    '2020-04-15': 394,
    '2020-04-16': 418,
    '2020-04-17': 439,
    '2020-04-18': 448,
  },
};

const mockGetCovidData = () => ({
  type: 'FETCHING_COVID_SUCCESS',
  covidData: mockCovidData,
  dataType: 'new',
});

const mockGetHistoryData = () => ({
  type: 'FETCHING_SUCCESS',
  historyData: mockCovidHistoryData,
});

describe('React component tests:', () => {
  it('Homepage renders correctly', () => {
    const page = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>,
    ).toJSON();
    expect(page).toMatchSnapshot();
  });

  it('Category card created correctly', () => {
    const page = renderer.create(
      <Provider store={store}>
        <Router>
          <Category category={mockCovidData[0]} index={1} />
        </Router>
      </Provider>,
    ).toJSON();
    expect(page).toMatchSnapshot();
  });

  it('Click on a category card and get to the details page successfully', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Category category={mockCovidData[0]} index={1} />
          <Routes>
            <Route path="/" element={<div>Mock</div>} />
            <Route path="/categories/:id" element={<Details />} />
          </Routes>
        </Router>
      </Provider>,
    );
    fireEvent.click(screen.getByText('Afghanistan').closest('a'));
    const page = container.querySelector('.details-header');
    expect(page).toBeInTheDocument();
  });
});

describe('Redux reducers tests:', () => {
  it('Reducer returns initial state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  it('Reducer covidData action dispatched correctly', () => {
    act(() => {
      store.dispatch(mockGetCovidData());
    });
    expect(store.getState().covidData.data.length).toEqual(3);
  });

  it('Reducer covidHistory action dispatched correctly', () => {
    act(() => {
      store.dispatch(mockGetHistoryData());
    });
    expect(store.getState().covidHistory.history).toEqual(mockCovidHistoryData);
  });
});
