import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password: password,
      });

      localStorage.setItem('token', response.data.jwt);
      localStorage.setItem('userId', response.data.user.id);

      const userResponse = await axios.get(`http://localhost:1337/api/users/${response.data.user.id}?populate=role`, {
        headers: {
          Authorization: `Bearer ${response.data.jwt}`,
        },
      });

      const userRole = userResponse.data.role.name;

      if (userRole === 'manager') {
        navigate('/manager-dashboard');
      } else if (userRole === 'employee') {
        navigate('/employee-mood');
      } else {
        setError('Rôle non reconnu');
      }
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '1rem',
    },
    error: {
      color: 'red',
      fontSize: '0.9rem',
      marginBottom: '1rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '100%', // S'assurer que le formulaire s'étende à 100%
      maxWidth: '400px', // Limiter la largeur max pour une meilleure adaptation
    },
    inputGroup: {
      width: '100%',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '20px',
      fontSize: '1rem',
    },
    button: {
      padding: '10px',
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '1rem',
      textTransform: 'uppercase',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Se connecter</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
          />
        </div>
        <button type="submit" style={styles.button}>
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
