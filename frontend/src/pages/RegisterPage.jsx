import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../api/supabase';
import api from '../api/client';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await api.post('/auth/register', { email, password, name });
      setMessage(res.data.message);
      if (res.data.data?.user) {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
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
        <h2 className="title-medium text-center">Create Account</h2>
        {error && <div style={{ color: 'var(--accent-primary)', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
        {message && <div style={{ color: '#4CAF50', marginBottom: '16px', textAlign: 'center' }}>{message}</div>}
        
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Name</label>
            <input 
              type="text" 
              className="input" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
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
            Sign Up
          </button>
        </form>

        <div style={{ margin: '24px 0', display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
          <span style={{ margin: '0 16px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
        </div>

        <button onClick={handleGoogleLogin} className="btn btn-secondary" style={{ width: '100%', marginBottom: '12px' }}>
          Sign Up with Google
        </button>

        <p className="text-center text-muted" style={{ fontSize: '0.875rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--text-primary)' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
