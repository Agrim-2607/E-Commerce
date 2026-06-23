import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Filter, X, ExternalLink, ShieldCheck } from 'lucide-react';

const ProductListingPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const location = useLocation();
  const { addToCart } = useCart();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

        const { data: fetchedProducts } = await api.get('/products');
        
        if (userHobbyIds.length > 0) {
          const filtered = fetchedProducts.filter(p => userHobbyIds.includes(p.hobby_id));
          setAllProducts(filtered.length > 0 ? filtered : fetchedProducts);
        } else {
          setAllProducts(fetchedProducts);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user, location.state]);

  const availableCategories = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
  const availableBrands = [...new Set(allProducts.map(p => p.brand).filter(Boolean))];

  const filteredProducts = allProducts.filter(p => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
    return categoryMatch && brandMatch;
  });

  const toggleFilter = (setState, value) => {
    setState(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  if (loading) return <div className="container section text-center">Loading products...</div>;

  return (
    <div className="container section animate-fade-in" style={{ position: 'relative' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '40px' }}>
        <h1 className="title-large" style={{ margin: 0 }}>Curated For You</h1>
        <button 
          className="btn btn-secondary mobile-only filter-toggle-btn" 
          onClick={() => setIsMobileFilterOpen(true)}
          style={{ display: 'none' }} /* Will be shown via CSS media query */
        >
          <Filter size={20} /> Filters
        </button>
      </div>

      <div className="listing-layout">
        {/* Sidebar Filters */}
        <aside className={`filter-sidebar glass ${isMobileFilterOpen ? 'open' : ''}`}>
          <div className="filter-header flex justify-between items-center">
            <h3 className="title-card" style={{ margin: 0 }}>Filters</h3>
            <button className="icon-btn close-filter-btn" onClick={() => setIsMobileFilterOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'none' }}>
              <X size={24} />
            </button>
          </div>

          {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
            <button className="clear-filters-btn text-muted" onClick={clearFilters} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.875rem', marginBottom: '20px', textDecoration: 'underline' }}>
              Clear All Filters
            </button>
          )}

          {availableCategories.length > 0 && (
            <div className="filter-section">
              <h4 style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>Categories</h4>
              <div className="filter-options">
                {availableCategories.map(cat => (
                  <label key={cat} className="filter-label">
                    <input 
                      type="checkbox" 
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleFilter(setSelectedCategories, cat)}
                    />
                    <span className="custom-checkbox"></span>
                    {cat}
                  </label>
                ))}
              </div>
            </div>
          )}

          {availableBrands.length > 0 && (
            <div className="filter-section" style={{ marginTop: '32px' }}>
              <h4 style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>Brands</h4>
              <div className="filter-options">
                {availableBrands.map(brand => (
                  <label key={brand} className="filter-label">
                    <input 
                      type="checkbox" 
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleFilter(setSelectedBrands, brand)}
                    />
                    <span className="custom-checkbox"></span>
                    {brand}
                  </label>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Product Grid */}
        <main className="product-grid-container">
          {filteredProducts.length === 0 ? (
            <div className="empty-state text-center" style={{ padding: '60px 0' }}>
              <h3 className="title-card">No products found</h3>
              <p className="text-muted">Try adjusting or clearing your filters.</p>
              <button className="btn btn-secondary" onClick={clearFilters} style={{ marginTop: '16px' }}>Clear Filters</button>
            </div>
          ) : (
            <div className="grid-3">
              {filteredProducts.map(product => (
                <div key={product.id} className="card glass product-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                  <Link to={`/product/${product.id}`} style={{ display: 'block', position: 'relative' }}>
                    <div style={{ width: '100%', height: '240px', backgroundColor: '#1A1A1C' }}>
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.product_name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                          No Image Available
                        </div>
                      )}
                    </div>
                    {product.source_type && (
                      <div className="product-badge" style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {product.source_type.includes('official') ? <ShieldCheck size={14} color="var(--accent-primary)" /> : null}
                        {product.source_type === 'official_product_page' ? 'Official Link' : product.source_type === 'distributor' ? 'Verified Distributor' : 'Curated'}
                      </div>
                    )}
                  </Link>
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1 }}>
                      {product.brand && <p style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{product.brand}</p>}
                      <h3 className="title-card" style={{ marginBottom: '8px', fontSize: '1.125rem' }}>{product.product_name}</h3>
                      <p style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px' }}>₹{Number(product.price).toLocaleString('en-IN')}</p>
                    </div>
                    
                    <div className="action-buttons flex gap-2" style={{ flexDirection: 'column' }}>
                      <button 
                        className="btn btn-primary" 
                        style={{ width: '100%' }}
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product.id, 1);
                        }}
                      >
                        Add to Cart
                      </button>
                      {product.official_url && (
                        <a 
                          href={product.official_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-secondary flex items-center justify-center gap-2"
                          style={{ width: '100%', fontSize: '0.875rem', padding: '10px' }}
                        >
                          View Original <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductListingPage;
