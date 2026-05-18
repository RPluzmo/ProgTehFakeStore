import { useState } from 'react';
import './AdminPanel.css';

export default function AdminPanel({ products, setProducts }) {
  const [file, setFile] = useState(null);
  const [isNewCategory, setIsNewCategory] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
  });

  const uniqueCategories = [...new Set(products.map(p => p.category))].filter(Boolean);

  const handleCreate = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', newProduct.title);
    formData.append('price', newProduct.price);
    formData.append('description', newProduct.description);
    formData.append('category', newProduct.category);
    if (file) formData.append('image', file);
    formData.append('rating', JSON.stringify({ rate: 0, count: 0 }));

    try {
      const response = await fetch('http://127.0.0.1:8000/api/products', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setProducts([...products, data.product]);
        alert('Produkts  pievienots');
        
        setNewProduct({ title: '', price: '', description: '', category: '' });
        setFile(null);
        setIsNewCategory(false);
        e.target.reset();
      } else {
        console.error('bruh kļūda:', data);
        alert('Neizdevās saglabāt');
      }
    } catch (error) {
      console.error('Kļūda izveidojot bruh', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('tiešām?')) return;
    try {
      await fetch(`http://127.0.0.1:8000/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Kļūda bruh dzēšot:', error);
    }
  };

  return (
    <div className="admin-container">

      <div className="admin-content-grid">
        <section className="admin-card">
          <h3 className="admin-card-title">Pievienot jaunu preci</h3>
          <form onSubmit={handleCreate} className="admin-form">
            <div className="admin-input-group">
              <label>Nosaukums</label>
              <input type="text" value={newProduct.title} className="admin-input" onChange={e => setNewProduct({...newProduct, title: e.target.value})} required />
            </div>
            
            <div className="admin-input-group">
              <label>Cena (EUR)</label>
              <input type="number" value={newProduct.price} step="0.01" className="admin-input" onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
            </div>

            <div className="admin-input-group">
              <label>Kategorija</label>
              {!isNewCategory ? (
                <select 
                  className="admin-input"
                  value={newProduct.category}
                  onChange={(e) => {
                    if (e.target.value === 'NEW_CATEGORY') {
                      setIsNewCategory(true);
                      setNewProduct({ ...newProduct, category: '' });
                    } else {
                      setNewProduct({ ...newProduct, category: e.target.value });
                    }
                  }}
                  required
                >
                  <option value="" disabled>Izvēlieties kategoriju</option>
                  {uniqueCategories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                  <option value="NEW_CATEGORY">Pievienot jaunu kategoriju</option>
                </select>
              ) : (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="Ievadiet jauno kategoriju" 
                    className="admin-input" 
                    style={{ flex: 1 }}
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})} 
                    required 
                    autoFocus
                  />
                  <button 
                    type="button" 
                    className="admin-delete-button"
                    style={{ padding: '0 15px' }}
                    onClick={() => {
                      setIsNewCategory(false);
                      setNewProduct({...newProduct, category: ''});
                    }}
                  >
                    Atcelt
                  </button>
                </div>
              )}
            </div>

            <div className="admin-input-group">
              <label>Izvēlēties attēlu</label>
              <input type="file" accept="image/*" className="admin-input" onChange={e => setFile(e.target.files[0])} required />
            </div>

            <div className="admin-input-group">
              <label>Apraksts</label>
              <textarea value={newProduct.description} className="admin-input admin-textarea" onChange={e => setNewProduct({...newProduct, description: e.target.value})} required />
            </div>

            <button type="submit" className="admin-submit-button">Pievienot Produktu</button>
          </form>
        </section>

        <section className="admin-card">
          <h3 className="admin-card-title">Esošie produkti ({products.length})</h3>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="admin-th">ID</th>
                  <th className="admin-th">Prece</th>
                  <th className="admin-th">Cena</th>
                  <th className="admin-th">Darbības</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="admin-tr">
                    <td className="admin-td">{product.id}</td>
                    <td className="admin-td"><strong>{product.title}</strong></td>
                    <td className="admin-td">{Number(product.price).toFixed(2)} €</td>
                    <td className="admin-td">
                      <button onClick={() => handleDelete(product.id)} className="admin-delete-button">Dzēst</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}