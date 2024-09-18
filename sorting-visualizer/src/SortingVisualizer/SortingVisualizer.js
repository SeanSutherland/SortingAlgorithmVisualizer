import React, { useState, useEffect  } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './SortingVisualizer.css';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Quick Sort'); 
  const [sortedIndices, setSortedIndices] = useState([]);
  const [redIndices, setRedIndices] = useState([]);
  const [purpleIndices, setPurpleIndices] = useState([]);
  const [yellowIndices, setYellowIndices] = useState([]);
  const [speed, setSpeed] = useState(5);
  const delay = 500;
  const numberOfBars = 20;

  const resetIndices = () => {
    setSortedIndices([]); 
    setRedIndices([]); 
    setPurpleIndices([]); 
    setYellowIndices([]); 
  }

  const setAllSorted = () => {
    setSortedIndices([...Array(numberOfBars).keys()]); 
  }

  const bubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    var sorted_indxs = [];
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setRedIndices([j, j + 1]);
        await new Promise(resolve => setTimeout(resolve, (delay/(speed*speed))));
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
        sorted_indxs = [...sorted_indxs, n-i]
        setSortedIndices(sorted_indxs); 
        setArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, (delay/(speed*speed))));
        setRedIndices([]);
      }
    }
    
  };

  const insertionSort = async (arr) => {
    const n = arr.length;
    
    var sorted_indxs = [0];
    setYellowIndices(sorted_indxs); 
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      sorted_indxs = [...sorted_indxs, i]
      setYellowIndices(sorted_indxs); 
      setPurpleIndices([i]);
      let j = i - 1;
  
      while (j >= 0 && arr[j] > key) {
        //setRedIndices([j - 1]);
        await new Promise(resolve => setTimeout(resolve, delay / (speed*speed)));
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        setPurpleIndices([j]);
        setRedIndices([j - 1]);
        j = j - 1;
        setArray([...arr]);
      }
  
      setRedIndices([]);
      arr[j + 1] = key;
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, delay / speed));
      //setSortedIndices([...sortedIndices, i]);
    }
    
    setPurpleIndices([]);
    setRedIndices([]);
    setYellowIndices([]);
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
        await new Promise(resolve => setTimeout(resolve, (delay/(speed*speed))));
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
          setPurpleIndices([minIndex]);
        }
        setRedIndices([]);
        setArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, (delay/(speed*speed))));
      }

      [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
      sorted_indxs = [...sorted_indxs, i]
      setSortedIndices(sorted_indxs); 
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, (delay/(speed*speed))));
      sorted_indxs = [...sorted_indxs, i]
      setSortedIndices(sorted_indxs);
    }
    
    setPurpleIndices([]);
    sorted_indxs = [...sorted_indxs, n-1,n-2]
    setSortedIndices(sorted_indxs); 
  };

  const mergeSort = async (arr, left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
  
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid   
   + 1, right);
      await merge(arr, left, mid, right);   
  
    }
  };
  
  const merge = async (arr, left, mid, right) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;
  
    const L = new Array(n1);
    const R = new Array(n2);
  
    for (let i = 0; i < n1; i++) {
      L[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
      R[j] = arr[mid + 1 + j];
    }
  
    let i = 0, j = 0, k = left;
  
    while (i < n1   
   && j < n2) {
      setRedIndices([left + i, mid + 1 + j]);
      await new Promise(resolve => setTimeout(resolve, delay / (speed*speed)));
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
      setArray([...arr]);
    }
  
    while (i < n1) {
      setRedIndices([left + i]);
      await new Promise(resolve => setTimeout(resolve, delay / (speed*speed)));
      arr[k] = L[i];
      i++;
      k++;
      setArray([...arr]);
    }
  
    while (j < n2) {
      setRedIndices([mid + 1 + j]);
      await new Promise(resolve => setTimeout(resolve, delay / (speed*speed)));
      arr[k] = R[j];
      j++;
      k++;
      setArray([...arr]);
    }
  };

  const quickSort = async (arr, low, high) => {
    
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };
  
  const   
   partition = async (arr, low, high) => {
    const pivot = arr[high];
    setPurpleIndices([high]);
    let i = low - 1;
  
    for (let j = low; j <= high - 1; j++) {
      setRedIndices([j, high]);
      await new Promise(resolve => setTimeout(resolve, delay / (speed*speed)));
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setArray([...arr]);
    }
  
    setRedIndices([]);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await new Promise(resolve => setTimeout(resolve, delay / (speed*speed)));
    setSortedIndices(prevSortedIndices => [...prevSortedIndices, i + 1]);
    return i + 1;
  };


  const handleSort = async () => {
    if (isSorting) {
      return;
    }
    resetIndices();

    const copyArray = [...array];
    if (selectedSort === 'Bubble Sort') {
      await bubbleSort(copyArray);
    } else if (selectedSort === 'Merge Sort') {
      // Implement merge sort here
      await mergeSort(copyArray, 0, copyArray.length - 1);
    } else if (selectedSort === 'Insertion Sort') {
      // Implement insertion sort here
      await insertionSort(copyArray);
    } else if (selectedSort === 'Selection Sort') {
      // Implement selection sort here
      await selectionSort(copyArray);
    } else if (selectedSort === 'Quick Sort') {
      await quickSort(copyArray, 0, copyArray.length - 1);
    } else {
      console.error('Invalid sorting algorithm selected');
    }
    setAllSorted();
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
      <select className="form-select" style={{width: "20%"}} value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
        <option value="Merge Sort">Merge Sort</option>
        <option value="Insertion Sort">Insertion Sort</option>
        <option value="Bubble Sort">Bubble Sort</option>
        <option value="Selection Sort">Selection Sort</option>
      <option value="Quick Sort">Quick Sort</option>
      </select>
      <div className="speed-control">
        <label htmlFor="speed-slider">Speed:</label>
        <input className="form-range" type="range" min="1" max="10" value={speed} id="speed-slider" onChange={(e) => setSpeed(parseInt(e.target.value))} />
        <span className="speed-value">{speed}</span>
      </div>
      <button className="btn btn-outline-primary mt-1" onClick={handleSort}>Sort</button>
      <button className="btn btn-outline-primary mt-1" onClick={generateRandomArray}>Regenerate</button>
      <div className="bar-container">
      {array.map((value, index) => (
          <div key={index} className="bar-container">
            <div
              className={`bar ${redIndices.includes(index) ? 'compared' : ''} ${sortedIndices.includes(index) ? 'sorted' : ''} ${purpleIndices.includes(index) ? 'purple' : ''} ${yellowIndices.includes(index) ? 'yellow' : ''}`}
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