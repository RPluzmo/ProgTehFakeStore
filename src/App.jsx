import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Kļūda iegūstot datus:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home products={products} loading={loading} />} />
        <Route
          path="/product/:id"
          element={<ProductPage products={products} loading={loading} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
