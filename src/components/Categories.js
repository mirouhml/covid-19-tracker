import PropTypes from 'prop-types';
import {
  Route,
  Routes,
  NavLink,
} from 'react-router-dom';
import Category from './Category';

const Categories = (props) => {
  const { categories } = props;
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {
          categories.map((category) => <li key={category}><NavLink to={`/categories/${category}`} className="link">{category}</NavLink></li>)
        }
      </ul>
      <Routes>
        {
          categories.map((category) => <Route key={category} path={`/categories/${category}`} element={<Category category={category} />} />)
        }
      </Routes>
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Categories;
