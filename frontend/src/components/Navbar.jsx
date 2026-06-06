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
        <Link to="/" className="navbar-logo">
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
