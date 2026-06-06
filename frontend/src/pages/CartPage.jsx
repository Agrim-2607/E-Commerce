import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Minus, Plus } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container section text-center animate-fade-in">
        <h2 className="title-medium">Your Cart</h2>
        <p className="text-muted" style={{ marginBottom: '24px' }}>Please sign in to view your cart.</p>
        <Link to="/login" className="btn btn-primary">Sign In</Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container section text-center animate-fade-in">
        <h2 className="title-medium">Your Cart is Empty</h2>
        <p className="text-muted" style={{ marginBottom: '24px' }}>Discover products that match your hobbies.</p>
        <Link to="/products" className="btn btn-primary">Explore Products</Link>
      </div>
    );
  }

  const total = cartItems.reduce((acc, item) => acc + (item.products?.price * item.quantity), 0);

  return (
    <div className="container section animate-fade-in">
      <h1 className="title-large" style={{ marginBottom: '40px' }}>Shopping Cart</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
        <div style={{ flex: '1 1 600px' }}>
          {cartItems.map(item => (
            <div key={item.id} className="card glass" style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px', padding: '16px' }}>
              <img 
                src={item.products?.image_url} 
                alt={item.products?.product_name} 
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'; }}
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', backgroundColor: '#2C2C2E' }} 
              />
              <div style={{ flex: 1 }}>
                <h3 className="title-card">{item.products?.product_name}</h3>
                <p style={{ fontWeight: 600 }}>₹{Number(item.products?.price).toLocaleString('en-IN')}</p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button 
                  className="nav-icon-btn" 
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                >
                  <Minus size={16} />
                </button>
                <span style={{ width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                <button 
                  className="nav-icon-btn" 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button 
                className="nav-icon-btn" 
                style={{ color: 'var(--accent-primary)', marginLeft: '16px' }}
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div style={{ flex: '0 0 350px' }}>
          <div className="card glass" style={{ position: 'sticky', top: '100px' }}>
            <h2 className="title-medium" style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Order Summary</h2>
            
            <div className="flex justify-between" style={{ marginBottom: '16px' }}>
              <span className="text-muted">Subtotal</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between" style={{ marginBottom: '16px' }}>
              <span className="text-muted">Shipping</span>
              <span>Free</span>
            </div>
            
            <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '16px 0' }}></div>
            
            <div className="flex justify-between" style={{ marginBottom: '32px' }}>
              <span style={{ fontWeight: 600 }}>Total</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <button className="btn btn-primary" style={{ width: '100%' }}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
