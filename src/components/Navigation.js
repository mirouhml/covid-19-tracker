import React from 'react';
import {
  Route,
  Routes,
  NavLink,
} from 'react-router-dom';
import Categories from './Categories';

const Navigation = () => {
  const categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="main">
      <nav className="header">
        <h1 className="title">Covid-19 Data</h1>
        <ul className="menu-items">
          <li id="rockets">
            <NavLink to="*" className="link">Categories</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="*" element={<Categories categories={categories} />} />
      </Routes>
    </div>
  );
};

export default Navigation;
