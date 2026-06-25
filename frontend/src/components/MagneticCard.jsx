import React, { useRef, useState } from 'react';

const MagneticCard = ({ children, className = '', ...props }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('translate3d(0px, 0px, 0px)');
  const [shadow, setShadow] = useState('');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Magnetic pull: subtle translation (restrained: max ~8px translation)
    const pullX = x * 0.05;
    const pullY = y * 0.05;
    
    // Soft lift: translate upward slightly on top of the magnetic pull
    setTransform(`translate3d(${pullX}px, ${pullY - 4}px, 0px)`);
    // Dynamic shadow shift opposite to cursor to enhance the 3D lift illusion
    setShadow(`${-pullX * 1.5}px ${-pullY * 1.5 + 16}px 32px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 31, 77, 0.08)`);
  };

  const handleMouseLeave = () => {
    setTransform('translate3d(0px, 0px, 0px)');
    setShadow('');
  };

  return (
    <div
      ref={cardRef}
      className={`card glass ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transform,
        boxShadow: shadow,
        transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        ...props.style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default MagneticCard;
