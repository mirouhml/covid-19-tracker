import { useLocation, useNavigate } from 'react-router-dom';

const Details = () => {
  const location = useLocation();
  const { category } = location.state;
  const navigate = useNavigate();
  return (
    <div>
      <h2>{category.country}</h2>
      <h3>{category.confirmed}</h3>
      <button
        type="button"
        onClick={() => {
          navigate(-1);
          document.querySelector('.header').style.display = 'block';
        }}
      >
        Back
      </button>
    </div>
  );
};

export default Details;
