import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <div className="logo-icon">
            <img src="/favicon.svg" alt="FakeStore" width="40" />
          </div>
          <div className="logo-text">
            <h1>RealStore</h1>
            <p>Click here to download more ram. 100% real 9/10 dentists recommend 🙂</p>
          </div>
        </Link>
        
        <nav className="header-nav">
          <Link to="/admin" className="admin-nav-btn">
            Admin Panelis
          </Link>
        </nav>
      </div>
    </header>
  );
}