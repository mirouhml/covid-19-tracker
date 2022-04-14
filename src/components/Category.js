import React, { useEffect } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Category.css';

const Category = (props) => {
  const { category, index } = props;

  useEffect(() => {
    const BB = document.querySelectorAll('.mapG')[index]?.getBBox();
    document.querySelectorAll('.map')[index]?.setAttributeNS(null, 'viewBox', `${BB.x} ${BB.y} ${BB.width} ${BB.height}`);
  }, []);

  return (
    <div>
      <NavLink
        to={{
          pathname: `/categories/${category.id}`,
        }}
        state={{ category }}
        className="category-link"
      >
        <div className="category">
          <div className="map-container">
            <svg className="map">
              <g className="mapG">
                <path fill="#2D4573" d={category.map} />
              </g>
            </svg>
            <svg viewBox="0 0 24 24" height="1.3em" width="1.3em" fill="white" className="arrow-circle">
              <path d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 10V9c0-.55-.45-1-1-1s-1 .45-1 1v3H9.21c-.45 0-.67.54-.35.85l2.79 2.79c.2.2.51.2.71 0l2.79-2.79c.31-.31.09-.85-.35-.85H13z" />
            </svg>
          </div>
          <div className="category-info">
            <h3 className="category-title">{category.country}</h3>
            <h3 className="lato">{`Cases: ${category.confirmed}`}</h3>
          </div>
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
