import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import Button from '../Button/Button';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="image-container">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="card-content">
          <h3>{product.title}</h3>
          <p className="price">{product.price.toFixed(2)} EUR</p>
          <Rating rate={product.rating.rate} />
        </div>
      </Link>
      <Button text="Pievienot grozam" onClick={() => alert('Pievienots!')} />
    </article>
  );
}