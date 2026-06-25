import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import * as Icons from 'lucide-react';

const HobbySelectionPage = () => {
  const [hobbies, setHobbies] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const { data } = await api.get('/hobbies');
        setHobbies(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHobbies();
  }, []);

  useEffect(() => {
    if (user) {
      api.get(`/hobbies/user/${user.id}`).then(({ data }) => {
        setSelectedHobbies(data.map(h => h.id));
      });
    }
  }, [user]);

  const toggleHobby = (id) => {
    setSelectedHobbies(prev => 
      prev.includes(id) ? prev.filter(hId => hId !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    if (user) {
      try {
        await api.post('/hobbies/user', { userId: user.id, hobbyIds: selectedHobbies });
        navigate('/products');
      } catch (err) {
        console.error(err);
      }
    } else {
      navigate('/products', { state: { selectedHobbies } });
    }
  };

  const IconComponent = ({ name, hobbyName }) => {
    // Special override: Football → Premium Custom Soccer Ball SVG
    if (hobbyName === 'Football') {
      return (
        <svg 
          className="hobby-icon" 
          width={40} 
          height={40} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          style={{ objectFit: 'contain' }}
        >
          <circle cx="12" cy="12" r="10" />
          {/* Center hexagon */}
          <polygon points="12,7.5 16,10 16,14 12,16.5 8,14 8,10" />
          {/* Outward lines from center hexagon */}
          <path d="M12,7.5 L12,4 M16,10 L19.5,8 M16,14 L19.5,16 M12,16.5 L12,20 M8,14 L4.5,16 M8,10 L4.5,8" />
          {/* Surrounding pentagons (filled) */}
          <polygon points="12,4 9.5,2.8 14.5,2.8" fill="currentColor" />
          <polygon points="12,20 9.5,21.2 14.5,21.2" fill="currentColor" />
          <polygon points="19.5,8 21.3,5.8 21.2,11.2" fill="currentColor" />
          <polygon points="19.5,16 21.2,12.8 21.3,18.2" fill="currentColor" />
          <polygon points="4.5,8 2.8,11.2 2.7,5.8" fill="currentColor" />
          <polygon points="4.5,16 2.7,18.2 2.8,12.8" fill="currentColor" />
        </svg>
      );
    }
    const iconName = name?.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('') || 'Heart';
    const Icon = Icons[iconName] || Icons.Heart;
    return <Icon size={40} className="hobby-icon" />;
  };

  return (
    <div className="container section">
      <div className="text-center animate-fade-up stagger-1" style={{ marginBottom: '64px' }}>
        <h1 className="title-hero" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>What drives you?</h1>
        <p className="text-muted" style={{ maxWidth: '500px', margin: '0 auto' }}>Select your passions to personalize your experience with curated gear and professional tools.</p>
      </div>

      <div className="grid-4 animate-fade-up stagger-2">
        {hobbies.map(hobby => {
          const isSelected = selectedHobbies.includes(hobby.id);
          return (
            <div 
              key={hobby.id} 
              className={`card glass hobby-card ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleHobby(hobby.id)}
            >
              <IconComponent name={hobby.icon} hobbyName={hobby.hobby_name} />
              <h3 className="title-card" style={{ color: '#fff', letterSpacing: '0.02em', margin: 0 }}>{hobby.hobby_name}</h3>
            </div>
          );
        })}
      </div>

      <div className="text-center animate-fade-up stagger-3" style={{ marginTop: '64px' }}>
        <button 
          className="btn btn-primary" 
          onClick={handleSave}
          disabled={selectedHobbies.length === 0}
          style={{ 
            padding: '16px 56px', 
            fontSize: '1.125rem',
            borderRadius: '16px',
            opacity: selectedHobbies.length === 0 ? 0.5 : 1,
            pointerEvents: selectedHobbies.length === 0 ? 'none' : 'auto'
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default HobbySelectionPage;
