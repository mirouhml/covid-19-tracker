import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import Categories from './Categories';
import Details from './Details';

const Navigation = () => {
  const categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="main">
      <nav className="header">
        <h1 className="title">Covid-19 Data</h1>
      </nav>
      <Routes>
        <Route path="*" element={<Categories categories={categories} />} />
        <Route path="/categories/:id" element={<Details />} />
      </Routes>
    </div>
  );
};

export default Navigation;
