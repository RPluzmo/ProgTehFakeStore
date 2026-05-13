import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating/Rating';
import Button from '../components/Button/Button'; // Importējam pogu

export default function ProductPage({ products, loading }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  if (loading) {
    return <h2 className="loading-text">Lādējas...</h2>;
  }

  if (!product) {
    return <h2 className="not-found-text">Produkts nav atrasts!</h2>;
  }

  return (
    <div className="product-page">
      <Link Lancaster to="/" className="back-link">
        Atpakaļ uz sarakstu
      </Link>
      <div className="product-detail">
        <img src={product.image} alt={product.title} className="product-detail-image" />
        <div className="product-detail-content">
          <h2>{product.title}</h2>
          <p className="product-category">{product.category}</p>
          <h3 className="product-detail-price">{product.price.toFixed(2)} EUR</h3>
          <Rating rate={product.rating.rate} />
          <p className="product-description">{product.description}</p>
          {/* Pievienota poga */}
          <div className="product-page-actions" style={{marginTop: '20px'}}>
             <Button text="Pievienot grozam" onClick={() => alert('Pievienots!')} />
          </div>
        </div>
      </div>
    </div>
  );
}