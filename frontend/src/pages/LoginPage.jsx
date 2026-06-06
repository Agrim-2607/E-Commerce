import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../api/supabase';
import api from '../api/client';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      if (data.user) {
        navigate('/hobbies');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <div className="container section flex" style={{ justifyContent: 'center' }}>
      <div className="card glass animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="title-medium text-center">Sign In</h2>
        {error && <div style={{ color: 'var(--accent-primary)', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              className="input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              className="input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
            Sign In
          </button>
        </form>

        <div style={{ margin: '24px 0', display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
          <span style={{ margin: '0 16px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
        </div>

        <button onClick={handleGoogleLogin} className="btn btn-secondary" style={{ width: '100%', marginBottom: '12px' }}>
          Sign In with Google
        </button>
        <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '12px', opacity: 0.5, cursor: 'not-allowed' }}>
          Sign In with GitHub (Coming Soon)
        </button>
        <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '12px', opacity: 0.5, cursor: 'not-allowed' }}>
          Sign In with Apple Music (Coming Soon)
        </button>
        <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '24px', opacity: 0.5, cursor: 'not-allowed' }}>
          Sign In with Spotify (Coming Soon)
        </button>

        <p className="text-center text-muted" style={{ fontSize: '0.875rem' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--text-primary)' }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
