import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const barWidth = 10;

  const generateRandomArray = () => {
    const arr = [];
    for (let i = 0; i < 50; i++) {
      arr.push(Math.floor(Math.random() * 100) + 1);
    }
    setArray(arr);
  };

  useEffect(() => {
    generateRandomArray();
  }, []);

  return (
    <div className="sorting-container">
      <button onClick={generateRandomArray}>Regenerate</button>
      <div className="bar-container">
        {array.map((value, index) => (
          <div key={index} className="bar" style={{ height: `${value}px`, width: `${barWidth}px` }}></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;