import React, { useState, useEffect  } from 'react';
import './SortingVisualizer.css';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Selection Sort'); 
  const [sortedIndices, setSortedIndices] = useState([]);
  const [redIndices, setRedIndices] = useState([]);
  const [purpleIndices, setPurpleIndices] = useState([]);
  const [speed, setSpeed] = useState(5);
  const delay = 500;
  const numberOfBars = 10;

  const bubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    var sorted_indxs = [];
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setRedIndices([j, j + 1]);
        await new Promise(resolve => setTimeout(resolve, delay/speed));
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
        sorted_indxs = [...sorted_indxs, n-i]
        setSortedIndices(sorted_indxs); 
        setArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, delay/speed));
        setRedIndices([]);
      }
    }
    sorted_indxs = [...sorted_indxs, 0,1]
    setSortedIndices(sorted_indxs); 
  };

  const selectionSort = async (arr) => {
    const n = arr.length;
    var sorted_indxs = [];

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      setPurpleIndices([minIndex]);

      for (let j = i + 1; j < n; j++) {
        setRedIndices([j]);
        await new Promise(resolve => setTimeout(resolve, delay/speed));
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
          setPurpleIndices([minIndex]);
        }
        setRedIndices([]);
        setArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, delay/speed));
      }

      [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
      sorted_indxs = [...sorted_indxs, i]
      setSortedIndices(sorted_indxs); 
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, delay/speed));
      sorted_indxs = [...sorted_indxs, i]
      setSortedIndices(sorted_indxs);
    }
    
    setPurpleIndices([]);
    sorted_indxs = [...sorted_indxs, n-1,n-2]
    setSortedIndices(sorted_indxs); 
  };


  const handleSort = () => {
    if (isSorting) {
      return;
    }
    setIsSorting(true);
    const copyArray = [...array];
    if (selectedSort === 'Bubble Sort') {
      bubbleSort(copyArray);
    } else if (selectedSort === 'Merge Sort') {
      // Implement merge sort here
      //mergeSort(copyArray, 0, copyArray.length - 1);
    } else if (selectedSort === 'Insertion Sort') {
      // Implement insertion sort here
      //insertionSort(copyArray);
    } else if (selectedSort === 'Selection Sort') {
      // Implement selection sort here
      selectionSort(copyArray);
    } else {
      console.error('Invalid sorting algorithm selected');
    }
    
    setIsSorting(false);
  };

  const generateRandomArray = () => {
    const arr = [];
    for (let i = 0; i < numberOfBars; i++) {
      arr.push(Math.floor(Math.random() * 200) + 1);
    }
    setArray(arr);
    setSortedIndices([]); 
  };

  

  useEffect(() => {
    generateRandomArray();
  }, [isSorting]);

  return (
    <div className="sorting-container">
      <select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
        <option value="Merge Sort">Merge Sort</option>
        <option value="Insertion Sort">Insertion Sort</option>
        <option value="Bubble Sort">Bubble Sort</option>
        <option value="Selection Sort">Selection Sort</option>
      </select>
      <div className="speed-control">
        <label htmlFor="speed-slider">Speed:</label>
        <input type="range" min="1" max="10" value={speed} id="speed-slider" onChange={(e) => setSpeed(parseInt(e.target.value))} />
        <span className="speed-value">{speed}</span>
      </div>
      <button onClick={handleSort}>Sort</button>
      <button onClick={generateRandomArray}>Regenerate</button>
      <div className="bar-container">
      {array.map((value, index) => (
          <div key={index} className="bar-container">
            <div
              className={`bar ${redIndices.includes(index) ? 'compared' : ''} ${sortedIndices.includes(index) ? 'sorted' : ''} ${purpleIndices.includes(index) ? 'purple' : ''}`}
              style={{ height: `${value}px` }}
            ></div>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;