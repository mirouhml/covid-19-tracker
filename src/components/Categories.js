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
    const list = document.querySelector('.categories').children;
    if (list.length > 0) {
      let i = 0;
      let bool = true;
      list[i].firstChild.firstChild.firstChild.classList.add('light-blue');
      i += 1;
      while (i < list.length) {
        if (bool) {
          bool = false;
          list[i].firstChild.firstChild.firstChild.classList.add('dark-blue');
          if (i + 1 < list.length) list[i + 1].firstChild.firstChild.firstChild.classList.add('dark-blue');
        } else {
          bool = true;
          list[i].firstChild.firstChild.firstChild.classList.add('light-blue');
          if (i + 1 < list.length) list[i + 1].firstChild.firstChild.firstChild.classList.add('light-blue');
        }
        i += 2;
      }
    }
  }, [categories]);
  return (
    <div>
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
