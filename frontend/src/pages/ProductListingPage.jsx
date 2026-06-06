import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const location = useLocation();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let userHobbyIds = [];
        if (location.state?.selectedHobbies) {
          userHobbyIds = location.state.selectedHobbies;
        } else if (user) {
          const { data } = await api.get(`/hobbies/user/${user.id}`);
          userHobbyIds = data.map(h => h.id);
        }

        const { data: allProducts } = await api.get('/products');
        
        if (userHobbyIds.length > 0) {
          const filtered = allProducts.filter(p => userHobbyIds.includes(p.hobby_id));
          setProducts(filtered.length > 0 ? filtered : allProducts);
        } else {
          setProducts(allProducts);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user, location.state]);

  if (loading) return <div className="container section text-center">Loading products...</div>;

  return (
    <div className="container section animate-fade-in">
      <h1 className="title-large" style={{ marginBottom: '40px' }}>Curated For You</h1>
      
      <div className="grid-4">
        {products.map(product => (
          <div key={product.id} className="card glass" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
            <Link to={`/product/${product.id}`}>
              <div style={{ width: '100%', height: '240px', backgroundColor: '#2C2C2E' }}>
                <img 
                  src={product.image_url} 
                  alt={product.product_name} 
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'; }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
            </Link>
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Link to={`/product/${product.id}`} style={{ flex: 1 }}>
                <h3 className="title-card">{product.product_name}</h3>
                <p className="text-muted" style={{ marginBottom: '16px', fontSize: '0.875rem' }}>{product.hobbies?.hobby_name}</p>
                <p style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px' }}>₹{Number(product.price).toLocaleString('en-IN')}</p>
              </Link>
              <button 
                className="btn btn-secondary" 
                style={{ width: '100%' }}
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product.id, 1);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;
