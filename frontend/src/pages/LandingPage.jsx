import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero section text-center container" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        <h1 className="title-hero animate-fade-up stagger-1">
          Curated For Your Passion
        </h1>
        <p className="text-muted animate-fade-up stagger-2" style={{ maxWidth: '640px', margin: '0 auto 40px', fontSize: '1.25rem' }}>
          Discover premium products expertly tailored to your creative and professional hobbies. Experience a curated shopping journey designed for enthusiasts.
        </p>
        <div className="animate-fade-up stagger-3">
          <Link to="/hobbies" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '16px 40px', borderRadius: '16px' }}>
            Start Exploring
          </Link>
        </div>
      </section>
      
      <section className="container section" style={{ paddingTop: '20px' }}>
        <div className="grid-4 animate-fade-up stagger-4">
          <div className="card glass text-center">
            <h3 className="title-card" style={{ color: '#fff' }}>Atmospheric Design</h3>
            <p className="text-muted" style={{marginTop: '12px', fontSize: '1rem'}}>A clean, minimal, and immersive dark-mode shopping experience.</p>
          </div>
          <div className="card glass text-center">
            <h3 className="title-card" style={{ color: '#fff' }}>Curated Selection</h3>
            <p className="text-muted" style={{marginTop: '12px', fontSize: '1rem'}}>Products hand-picked specifically for your selected hobbies.</p>
          </div>
          <div className="card glass text-center">
            <h3 className="title-card" style={{ color: '#fff' }}>Fluid Interactions</h3>
            <p className="text-muted" style={{marginTop: '12px', fontSize: '1rem'}}>Fast, responsive, and distraction-free micro-interactions.</p>
          </div>
          <div className="card glass text-center">
            <h3 className="title-card" style={{ color: '#fff' }}>Premium Focus</h3>
            <p className="text-muted" style={{marginTop: '12px', fontSize: '1rem'}}>Tailored entirely for creators, gamers, artists, and professionals.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
