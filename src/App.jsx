import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ManagerDashboard from './pages/ManagerDashboard'; // à créer
import EmployeeMood from './pages/EmployeeMood';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/employee-mood" element={<EmployeeMood />} />
      </Routes>
    </Router>
  );
};

export default App;
