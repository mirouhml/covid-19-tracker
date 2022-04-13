import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Category from './Category';
import '../styles/Categories.css';

const Categories = ({ categories }) => {
  useEffect(() => {
    const light = document.querySelectorAll('.light-blue');
    const dark = document.querySelectorAll('.dark-blue');
    light.forEach((element) => {
      element.classList.remove('light-blue');
    });
    dark.forEach((element) => {
      element.classList.remove('dark-blue');
    });
  }, [categories]);
  return (
    <div className="categories-container">
      <ul className="categories">
        {
          categories.map((category) => (
            <li key={category.id}>
              <Category category={category} />
            </li>
          ))
        }
      </ul>
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    confirmed: PropTypes.number.isRequired,
  })).isRequired,
};

export default Categories;
