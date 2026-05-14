import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating/Rating';
import Button from '../components/Button/Button';

export default function ProductPage({ products, loading }) {
  const { id } = useParams();
  
  const product = products.find((item) => item.id === Number(id));

  if (loading) {
    return <h2 className="loading-text">Lādējas...</h2>;
  }

  if (!product) {
    return <h2 className="not-found-text">Produkts nav atrasts!</h2>;
  }

  const imageUrl = `http://127.0.0.1:8000${product.image}`;

  return (
    <div className="product-page">
      <Link to="/" className="back-link">
       Atpakaļ uz sarakstu
      </Link>
      
      <div className="product-detail">
        <div className="product-detail-image-wrapper">
          <img 
            src={imageUrl} 
            alt={product.title} 
            className="product-detail-image" 
          />
        </div>

        <div className="product-detail-content">
          <p className="product-category" style={{ textTransform: 'uppercase', color: '#888' }}>
            {product.category}
          </p>
          <h2>{product.title}</h2>
          
          <h3 className="product-detail-price">
            {Number(product.price).toFixed(2)} EUR
          </h3>

          {product.rating && <Rating rate={product.rating.rate} />}
          
          <p className="product-description">{product.description}</p>

          <div className="product-page-actions" style={{ marginTop: '20px' }}>
             <Button 
               text="Pievienot grozam" 
               onClick={() => alert(`${product.title} pievienots grozam!`)} 
             />
          </div>
        </div>
      </div>
    </div>
  );
}