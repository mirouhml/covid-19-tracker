/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import {
  NavLink,
} from 'react-router-dom';
import '../styles/Category.css';

const Category = (props) => {
  const { category } = props;
  const hide = () => {
    document.querySelector('.header').style.display = 'none';
  };
  return (
    <div>
      <NavLink
        to={{
          pathname: `/categories/${category.id}`,
        }}
        state={{ category }}
        className="category-link"
        onClick={hide}
      >
        <div className="category">
          <h3>{category.country}</h3>
          <h3>{category.confirmed}</h3>
        </div>
      </NavLink>
    </div>
  );
};

export default Category;
