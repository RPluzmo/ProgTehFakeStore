import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories')
        ]);
        
        const prodData = await prodRes.json();
        const catData = await catRes.json();
        
        setProducts(prodData);
        setCategories(catData);
      } catch (error) {
        console.error('Kļūda iegūstot datus:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={<Home products={products} categories={categories} loading={loading} />} 
        />
        <Route
          path="/product/:id"
          element={<ProductPage products={products} loading={loading} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;