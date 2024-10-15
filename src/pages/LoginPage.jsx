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
    <div>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;
