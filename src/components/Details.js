import { useLocation } from 'react-router-dom';

const Details = () => {
  const location = useLocation();
  const { category } = location.state;
  return (
    <div>
      <h2>{category}</h2>
    </div>
  );
};

export default Details;
