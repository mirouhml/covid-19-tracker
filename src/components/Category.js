import React, { useEffect } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Category.css';

const Category = (props) => {
  const { category, index } = props;
  const hide = () => {
    document.querySelector('.header').style.display = 'none';
  };

  useEffect(() => {
    const BB = document.querySelectorAll('.mapG')[index].getBBox();
    document.querySelectorAll('.map')[index].setAttributeNS(null, 'viewBox', `${BB.x} ${BB.y} ${BB.width} ${BB.height}`);
  }, []);

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
          <svg className="map" height="7.5rem" width="8rem">
            <g className="mapG">
              <path fill="#2D4573" d={category.map} />
            </g>
          </svg>
          <h3>{category.country}</h3>
          <h3>{category.confirmed}</h3>
        </div>
      </NavLink>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    confirmed: PropTypes.number.isRequired,
    map: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Category;
