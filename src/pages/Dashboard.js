import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  let navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => navigate('/Profile')}>Profile</button>
      <button onClick={() => navigate('/Settings')}>Settings</button>
      {/* Other dashboard content */}
    </div>
  );
};

export default Dashboard;
