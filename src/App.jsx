import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import AdminPanel from './pages/AdminPanel';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products');
        const data = await response.json();
        
        setProducts(data);

        const uniqueCategories = ['Visas preces', ...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);
        
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
        <Route 
          path="/admin" 
          element={<AdminPanel products={products} setProducts={setProducts} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;