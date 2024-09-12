import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import History from './History';  // Assuming History component exists

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchProtectedData = async () => {
    try {
      const response = await axiosInstance.get('/protected-data');
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch data.');
    }
  };

  useEffect(() => {
    fetchProtectedData();  // Fetch data when the component mounts
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear the token from localStorage
    window.location.href = '/login';  // Redirect to login
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <div>
          <h2>Protected Data</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      <History />  {/* Display request history */}
    </div>
  );
};

export default Dashboard;

