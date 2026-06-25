import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar glass">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(255,31,77,0.2), rgba(120,20,50,0.1))',
            border: '1px solid rgba(255,31,77,0.3)',
            boxShadow: '0 0 10px rgba(255,31,77,0.2)'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF1F4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          HobbyMart
        </Link>
        
        <div className="navbar-search">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search products..." className="search-input" />
        </div>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Discover</Link>
          <Link to="/hobbies" className="nav-link">Hobbies</Link>
          
          <div className="nav-actions">
            {user ? (
              <div className="user-menu">
                <button className="nav-icon-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="nav-link">Sign In</Link>
            )}
            
            <Link to="/cart" className="nav-icon-btn cart-btn">
              <ShoppingBag size={20} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
