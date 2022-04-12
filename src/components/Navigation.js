import React, { useState, useEffect } from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCovidData } from '../redux/covid_data/covidData';
import Categories from './Categories';
import Details from './Details';

const Navigation = () => {
  const dispatch = useDispatch();
  const defaultStats = useSelector((state) => state.covidData);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getCovidData());
  }, []);

  useEffect(() => {
    setCategories(defaultStats);
  }, [defaultStats]);

  const filter = (e) => {
    switch (e.target.id) {
      case 'northam':
        setCategories([...defaultStats.filter((c) => c.continent === 'North America')]);
        break;
      case 'southam':
        setCategories([...defaultStats.filter((c) => c.continent === 'South America')]);
        break;
      case 'europe':
        setCategories([...defaultStats.filter((c) => c.continent === 'Europe')]);
        break;
      case 'africa':
        setCategories([...defaultStats.filter((c) => c.continent === 'Africa')]);
        break;
      case 'oceania':
        setCategories([...defaultStats.filter((c) => c.continent === 'Oceania')]);
        break;
      case 'asia':
        setCategories([...defaultStats.filter((c) => c.continent === 'Asia')]);
        break;
      case 'antarctica':
        setCategories([...defaultStats.filter((c) => c.continent === 'Antarctica')]);
        break;
      default:
        setCategories(defaultStats);
    }
  };
  return (
    <div className="main">
      <div className="header">
        <h2>Welcome to my Covid-19 Cases tracker</h2>
        <h3>Filters:</h3>
        <div className="filters">
          <button type="button" className="filter-button" id="all" onClick={filter}>All countries</button>
          <button type="button" className="filter-button" id="northam" onClick={filter}>North America</button>
          <button type="button" className="filter-button" id="southam" onClick={filter}>South America</button>
          <button type="button" className="filter-button" id="africa" onClick={filter}>Africa</button>
          <button type="button" className="filter-button" id="europe" onClick={filter}>Europe</button>
          <button type="button" className="filter-button" id="oceania" onClick={filter}>Oceania</button>
          <button type="button" className="filter-button" id="asia" onClick={filter}>Asia</button>
          <button type="button" className="filter-button" id="antarctica" onClick={filter}>Antarctica</button>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Categories categories={categories} setCategories={setCategories} />} />
        <Route path="/categories/:id" element={<Details />} />
      </Routes>
    </div>
  );
};

export default Navigation;
