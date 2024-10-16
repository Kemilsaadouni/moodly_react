import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ManagerDashboard from './pages/ManagerDashboard'; // à créer
import EmployeeMood from './pages/EmployeeMood'; // à créer
import Header from './components/Header'
import ThankYou from './components/ThankYou';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/employee-mood" element={<EmployeeMood />} />
        <Route path="/header" element={<Header />} />
        <Route path="/thankyou" element={<ThankYou/>} />
      </Routes>
    </Router>
  );
};

export default App;
