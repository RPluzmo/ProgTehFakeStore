import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import Button from '../Button/Button';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const imageUrl = `http://127.0.0.1:8000${product.image}`;

  return (
    <article className="product-card">
      <Link hide-link="true" to={`/product/${product.id}`} className="product-link">
        <div className="image-container">
          <img src={imageUrl} alt={product.title} style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="card-content">
          <h3>{product.title}</h3>
          <p className="price">{Number(product.price).toFixed(2)} EUR</p>
          {product.rating && <Rating rate={product.rating.rate} />}
        </div>
      </Link>
      <Button text="Pievienot grozam" onClick={() => alert(`${product.title} pievienots!`)} />
    </article>
  );
}