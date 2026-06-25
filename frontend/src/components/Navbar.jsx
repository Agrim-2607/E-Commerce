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
          <svg
            className="navbar-logo-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 220 44"
            height="36"
            width="auto"
            aria-label="HobbyMart"
          >
            <defs>
              <linearGradient id="nb-wine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#58111A" />
                <stop offset="55%"  stopColor="#80141D" />
                <stop offset="100%" stopColor="#A21C26" />
              </linearGradient>
              <linearGradient id="nb-dark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#F5F0F0" />
                <stop offset="100%" stopColor="#D4CBCC" />
              </linearGradient>
            </defs>

            {/* ── Icon mark: vertical spine + stacked shelves ── */}
            <g transform="translate(0, 2)">
              {/* Left spine */}
              <rect x="2" y="4" width="5" height="32" rx="2.5" fill="url(#nb-wine)" />
              {/* Crossbar */}
              <rect x="6" y="16" width="9" height="5" rx="1.5" fill="url(#nb-wine)" />
              {/* Top shelf */}
              <rect x="13" y="4"  width="7" height="7"  rx="2"   fill="url(#nb-wine)" />
              {/* Mid shelf */}
              <rect x="13" y="14" width="6" height="7"  rx="1.5" fill="url(#nb-wine)" opacity="0.88" />
              {/* Bottom shelf */}
              <rect x="13" y="24" width="5" height="10" rx="1.5" fill="url(#nb-wine)" opacity="0.7"  />
              {/* Handle arc */}
              <path
                d="M 13,7 C 13,-1 22,-1 22,7"
                fill="none"
                stroke="url(#nb-wine)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Accent dots */}
              <circle cx="26" cy="9"  r="1.3" fill="url(#nb-wine)" opacity="0.5" />
              <circle cx="25" cy="18" r="1"   fill="url(#nb-wine)" opacity="0.65"/>
              <circle cx="24" cy="27" r="0.8" fill="url(#nb-wine)" opacity="0.45"/>
            </g>

            {/* ── Wordmark ── */}
            {/* "Hobby" — light/white bold */}
            <text
              x="36" y="31"
              fontFamily="'Plus Jakarta Sans','Inter',sans-serif"
              fontWeight="800"
              fontSize="22"
              fill="url(#nb-dark)"
              letterSpacing="-0.5"
            >Hobby</text>

            {/* "Mart" — cherry-wine gradient */}
            <text
              x="122" y="31"
              fontFamily="'Plus Jakarta Sans','Inter',sans-serif"
              fontWeight="400"
              fontSize="22"
              fill="url(#nb-wine)"
              letterSpacing="-0.3"
            >Mart</text>
          </svg>
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
