import React, { useState, useEffect } from 'react';
import axios from 'axios';
import History from './History';  // Assuming you created the History component

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await axios.get('http://localhost:4000/protected-data', {
        headers: {
          Authorization: `Bearer ${token}`, // Send token with the request
        },
      });
      setData(response.data);

      // Update the history after the request is successful
      updateHistory('/protected-data');
    } catch (err) {
      setError('Failed to fetch data. Please check your authentication.');
    }
  };

  // Function to update history in localStorage
  const updateHistory = (endpoint) => {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.push({ endpoint, time: new Date().toLocaleString() });
    localStorage.setItem('history', JSON.stringify(history));
  };

  useEffect(() => {
    // You could automatically fetch data when the dashboard loads, or call it manually
    fetchProtectedData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the user dashboard!</p>

      <div>
        <button onClick={fetchProtectedData}>Fetch Protected Data</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div>
          <h2>Protected Data</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      <History />
    </div>
  );
};

export default Dashboard;
