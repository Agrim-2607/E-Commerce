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
    return <Icon size={48} style={{ marginBottom: '16px', color: 'var(--accent-primary)' }} />;
  };

  return (
    <div className="container section animate-fade-in">
      <div className="text-center" style={{ marginBottom: '48px' }}>
        <h1 className="title-large">What do you love?</h1>
        <p className="text-muted">Select your hobbies to discover tailored products.</p>
      </div>

      <div className="grid-4" style={{ gap: '24px' }}>
        {hobbies.map(hobby => {
          const isSelected = selectedHobbies.includes(hobby.id);
          return (
            <div 
              key={hobby.id} 
              className="card glass text-center" 
              onClick={() => toggleHobby(hobby.id)}
              style={{ 
                cursor: 'pointer',
                border: isSelected ? '2px solid var(--accent-primary)' : '1px solid transparent',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)'
              }}
            >
              <IconComponent name={hobby.icon} />
              <h3 className="title-card">{hobby.hobby_name}</h3>
            </div>
          );
        })}
      </div>

      <div className="text-center" style={{ marginTop: '48px' }}>
        <button 
          className="btn btn-primary" 
          onClick={handleSave}
          disabled={selectedHobbies.length === 0}
          style={{ padding: '16px 48px', fontSize: '1.125rem' }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default HobbySelectionPage;
