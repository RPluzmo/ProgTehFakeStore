import './Category.css';

export default function CategorySelector({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="category-selector">
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-dropdown"
      >
        <option value="all">Visas preces</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}