import PropTypes from 'prop-types';

const Category = (props) => {
  const { category } = props;
  return (
    <div>
      <h3>{category}</h3>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.number.isRequired,
};

export default Category;
