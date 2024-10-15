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
      // Envoyer la requête POST à Strapi pour authentifier l'utilisateur
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password: password,
      });

      // Stocker le token JWT dans le localStorage
      localStorage.setItem('token', response.data.jwt);
      localStorage.setItem('userId', response.data.user.id)

      // Effectuer une requête supplémentaire pour récupérer les détails de l'utilisateur
      const userResponse = await axios.get(`http://localhost:1337/api/users/${response.data.user.id}?populate=role`, {
        headers: {
          Authorization: `Bearer ${response.data.jwt}`,
        },
      });

      // Récupérer le rôle de l'utilisateur
      const userRole = userResponse.data.role.name;
      console.log('User role:', userRole);

      // Rediriger l'utilisateur en fonction de son rôle
      if (userRole === 'manager') {
        navigate('/manager-dashboard');
      } else if (userRole === 'employee') {
        navigate('/employee-mood');
      } else {
        setError('Rôle non reconnu');
      }
    } catch (err) {
      setError('Email ou mot de passe incorrect');
      console.error('Erreur de connexion :', err);
    }
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
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            type="password"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={styles.button}>LOG IN</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#E4EBE4',
    fontFamily: "'Arial', sans-serif",
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  form: {
    width: '80%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputGroup: {
    marginBottom: '15px',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '25px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: "'Arial', sans-serif",
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '25px',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    textTransform: 'uppercase',
    fontFamily: "'Arial', sans-serif",
  },
};

export default LoginPage;
