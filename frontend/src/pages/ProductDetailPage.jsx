import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="container section text-center">Loading...</div>;
  if (!product) return <div className="container section text-center">Product not found.</div>;

  return (
    <div className="container section animate-fade-in">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px' }}>
        <div style={{ flex: '1 1 400px' }}>
          <img 
            src={product.image_url} 
            alt={product.product_name}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'; }} 
            style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', backgroundColor: '#2C2C2E' }} 
          />
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 className="title-large" style={{ marginBottom: '8px' }}>{product.product_name}</h1>
          <p className="text-muted" style={{ fontSize: '1.125rem', marginBottom: '24px' }}>{product.hobbies?.hobby_name}</p>
          <p style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '32px' }}>₹{Number(product.price).toLocaleString('en-IN')}</p>
          
          <p style={{ fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '40px', color: 'var(--text-secondary)' }}>
            {product.description}
          </p>

          <button 
            className="btn btn-primary" 
            style={{ padding: '16px 32px', fontSize: '1.125rem' }}
            onClick={() => addToCart(product.id, 1)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
