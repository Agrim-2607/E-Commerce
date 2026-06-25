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
    <nav className="navbar">
      <div className="navbar-aurora"></div>
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          <svg className="navbar-logo-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 14C6 9.58 9.58 6 14 6C18.42 6 22 9.58 22 14C22 18.42 18.42 22 14 22C9.58 22 6 18.42 6 14Z" stroke="url(#logo-grad-1)" strokeWidth="1.5" strokeDasharray="3 3"/>
            <path d="M14 2C7.37 2 2 7.37 2 14C2 20.63 7.37 26 14 26C20.63 26 26 20.63 26 14C26 7.37 20.63 2 14 2ZM14 24C8.48 24 4 19.52 4 14C4 8.48 8.48 4 14 4C19.52 4 24 8.48 24 14C24 19.52 19.52 24 14 24Z" fill="url(#logo-grad-2)" opacity="0.4"/>
            <path d="M14 9L18 14H10L14 9Z" fill="#FF1F4D"/>
            <path d="M14 19L10 14H18L14 19Z" fill="#8B001A"/>
            <circle cx="14" cy="14" r="1.5" fill="#FFFFFF"/>
            <defs>
              <linearGradient id="logo-grad-1" x1="6" y1="6" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF1F4D"/>
                <stop offset="1" stopColor="#8B001A"/>
              </linearGradient>
              <linearGradient id="logo-grad-2" x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8B001A"/>
                <stop offset="1" stopColor="#050505"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="navbar-logo-text">HobbyMart</span>
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
