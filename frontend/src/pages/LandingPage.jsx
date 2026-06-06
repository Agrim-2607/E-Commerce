import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page animate-fade-in">
      <section className="hero section text-center container">
        <h1 className="title-large">Discover Products Built Around Your Passions</h1>
        <p className="title-card text-muted" style={{ maxWidth: '600px', margin: '0 auto 32px' }}>
          Choose your hobbies and explore products curated for your interests. Experience a premium, content-first shopping journey.
        </p>
        <Link to="/hobbies" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '16px 32px' }}>
          Get Started
        </Link>
      </section>
      <section className="container section">
        <div className="grid-4">
          <div className="card text-center">
            <h3>Premium Design</h3>
            <p className="text-muted" style={{marginTop: '8px'}}>A clean, minimal, and modern shopping experience.</p>
          </div>
          <div className="card text-center">
            <h3>Curated Selection</h3>
            <p className="text-muted" style={{marginTop: '8px'}}>Products hand-picked for your specific hobbies.</p>
          </div>
          <div className="card text-center">
            <h3>Smooth Experience</h3>
            <p className="text-muted" style={{marginTop: '8px'}}>Fast, responsive, and distraction-free.</p>
          </div>
          <div className="card text-center">
            <h3>Secure Checkout</h3>
            <p className="text-muted" style={{marginTop: '8px'}}>Safe and reliable transactions.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
