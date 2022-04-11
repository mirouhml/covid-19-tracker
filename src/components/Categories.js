import Category from './Category';

const Categories = () => {
  const categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {
          categories.map((category) => (
            <li key={category}>
              <Category category={category} />
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Categories;
