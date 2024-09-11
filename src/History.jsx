import React, { useState, useEffect } from 'react';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('history')) || [];
    setHistory(savedHistory);
  }, []);

  return (
    <div>
      <h2>Request History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry.time}: {entry.endpoint}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
