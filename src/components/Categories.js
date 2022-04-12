import PropTypes from 'prop-types';
import Category from './Category';
import '../styles/Categories.css';

const Categories = ({ categories }) => (
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

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    confirmed: PropTypes.number.isRequired,
  })).isRequired,
};

export default Categories;
