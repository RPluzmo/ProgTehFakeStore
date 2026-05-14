import { useState } from 'react';

export default function AdminPanel({ products, setProducts }) {
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 }
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      setProducts([...products, data.product]);
      alert('Produkts veiksmīgi pievienots! 🎉');
      e.target.reset(); // Notīra formu
    } catch (error) {
      console.error('Kļūda izveidojot:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Vai tiešām vēlaties dzēst šo produktu?')) return;
    try {
      await fetch(`http://127.0.0.1:8000/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Kļūda dzēšot:', error);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Admin Panelis</h1>
        <p>Pārvaldiet veikala krājumus un pievienojiet jaunas preces</p>
      </header>

      <div style={styles.contentGrid}>
        {/* FORMA */}
        <section style={styles.card}>
          <h3 style={styles.cardTitle}>Pievienot jaunu preci</h3>
          <form onSubmit={handleCreate} style={styles.form}>
            <div style={styles.inputGroup}>
              <label>Nosaukums</label>
              <input type="text" style={styles.input} onChange={e => setNewProduct({...newProduct, title: e.target.value})} required />
            </div>
            
            <div style={styles.inputGroup}>
              <label>Cena (EUR)</label>
              <input type="number" step="0.01" style={styles.input} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
            </div>

            <div style={styles.inputGroup}>
              <label>Kategorija</label>
              <input type="text" style={styles.input} onChange={e => setNewProduct({...newProduct, category: e.target.value})} required />
            </div>

            <div style={styles.inputGroup}>
              <label>Attēla ceļš</label>
              <input type="text" placeholder="/storage/images/..." style={styles.input} onChange={e => setNewProduct({...newProduct, image: e.target.value})} required />
            </div>

            <div style={styles.inputGroup}>
              <label>Apraksts</label>
              <textarea style={{...styles.input, minHeight: '80px'}} onChange={e => setNewProduct({...newProduct, description: e.target.value})} required />
            </div>

            <button type="submit" style={styles.submitButton}>Pievienot Produktu</button>
          </form>
        </section>

        {/* TABULA */}
        <section style={styles.card}>
          <h3 style={styles.cardTitle}>Esošie produkti ({products.length})</h3>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Prece</th>
                  <th style={styles.th}>Cena</th>
                  <th style={styles.th}>Darbības</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} style={styles.tr}>
                    <td style={styles.td}>{product.id}</td>
                    <td style={styles.td}><strong>{product.title}</strong></td>
                    <td style={styles.td}>{Number(product.price).toFixed(2)} €</td>
                    <td style={styles.td}>
                      <button onClick={() => handleDelete(product.id)} style={styles.deleteButton}>Dzēst</button>
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

// Inline stili labākam UI
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f9f9f9',
    minHeight: '100vh'
  },
  header: {
    marginBottom: '30px',
    borderBottom: '2px solid #eee',
    paddingBottom: '10px'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    alignItems: 'start'
  },
  card: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #eee'
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: '20px',
    fontSize: '1.2rem',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px'
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '10px',
    transition: 'background 0.3s'
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  th: {
    padding: '12px',
    borderBottom: '2px solid #eee',
    color: '#666',
    fontSize: '14px'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #eee',
    fontSize: '14px'
  },
  tr: {
    transition: 'background 0.2s',
    '&:hover': { backgroundColor: '#fdfdfd' }
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  }
};