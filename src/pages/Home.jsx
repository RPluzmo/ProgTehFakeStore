import { useState } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import SearchBar from '../components/SearchBar/SearchBar';

export default function Home({ products, loading }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {loading ? (
        <h2 className="loading-text">Lādējas...</h2>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
