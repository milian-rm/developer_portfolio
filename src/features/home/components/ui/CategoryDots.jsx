import '../style/CategoryDots.css';

const CategoryDots = ({ items = [], selectedIndex = 0, onChange }) => {
  const handleDotClick = (idx) => {
    if (idx !== selectedIndex && onChange) {
      onChange(idx, items[idx]);
    }
  };

  return (
    <div className="category-dots" role="tablist" aria-label="Categorías">
      <span className="category-dots__label" aria-hidden="true">
        {items[selectedIndex]}
      </span>

      <div className="category-dots__row">
        {items.map((item, idx) => {
          const isActive = idx === selectedIndex;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              className={`category-dots__dot ${isActive ? 'category-dots__dot--active' : ''}`}
              aria-selected={isActive}
              aria-label={item}
              onClick={() => handleDotClick(idx)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryDots;
