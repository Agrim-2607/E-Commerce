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

  const IconComponent = ({ name }) => {
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
              <IconComponent name={hobby.icon} />
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
