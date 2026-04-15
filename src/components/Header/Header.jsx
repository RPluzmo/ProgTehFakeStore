import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <div className="logo-icon">
          <img src="/favicon.svg" alt="FakeStore" width="40" />
        </div>
        <div className="logo-text">
          <h1>FakeStore</h1>
          <p>Iepirkšanās Tev</p>
        </div>
      </Link>
    </header>
  );
}
