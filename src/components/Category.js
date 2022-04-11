/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import {
  NavLink,
} from 'react-router-dom';

const Category = (props) => {
  const { category } = props;
  return (
    <div>
      <NavLink
        to={{
          pathname: `/categories/${category}`,
        }}
        state={{ category }}
        className="link"
      >
        <h3>{category}</h3>
      </NavLink>
    </div>
  );
};

export default Category;
