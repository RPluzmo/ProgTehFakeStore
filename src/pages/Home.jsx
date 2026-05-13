import { useState } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import SearchBar from '../components/SearchBar/SearchBar';
import CategorySelector from '../components/Category/Category';

export default function Home({ products, categories, loading }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filtrēšanas loģika: gan pēc meklēšanas, gan pēc kategorijas
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main>
      <div className="filters-container">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategorySelector 
          categories={categories} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
      </div>

      {loading ? (
        <h2 className="loading-text">Lādējas...</h2>
      ) : (
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="no-results">Nekas netika atrasts.</p>
          )}
        </div>
      )}
    </main>
  );
}