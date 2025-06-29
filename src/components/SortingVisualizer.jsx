import React, { useState, useEffect } from 'react';
import { getBubbleSortAnimations } from '../algorithms/bubblesort';
import { getMergeSortAnimations } from '../algorithms/mergesort';
import { getQuickSortAnimations } from '../algorithms/quicksort';

const NUMBER_OF_BARS = 50;
const PRIMARY_COLOR = '#3b82f6'; // Tailwind blue-500
const SECONDARY_COLOR = '#ef4444'; // Tailwind red-500

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(100); // Default speed in ms

  useEffect(() => {
    generateNewArray();
  }, []);

  const generateNewArray = () => {
    const newArr = Array.from({ length: NUMBER_OF_BARS }, () =>
      Math.floor(Math.random() * 500) + 10
    );
    setArray(newArr);
  };

  const startSort = () => {
    if (algorithm === 'bubble') bubbleSort();
    else if (algorithm === 'merge') mergeSort();
    else if (algorithm === 'quick') quickSort();
  };

  const bubbleSort = () => {
    const animations = getBubbleSortAnimations(array);
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
      const [action, barOneIdx, barTwoIdx] = animations[i];
      const barOne = arrayBars[barOneIdx];
      const barTwo = arrayBars[barTwoIdx];

      if (action === 'compare') {
        setTimeout(() => {
          barOne.style.backgroundColor = SECONDARY_COLOR;
          barTwo.style.backgroundColor = SECONDARY_COLOR;
        }, i * speed);
      } else if (action === 'swap') {
        setTimeout(() => {
          const tempHeight = barOne.style.height;
          barOne.style.height = barTwo.style.height;
          barTwo.style.height = tempHeight;
        }, i * speed);
      }

      setTimeout(() => {
        barOne.style.backgroundColor = PRIMARY_COLOR;
        barTwo.style.backgroundColor = PRIMARY_COLOR;
      }, (i + 1) * speed);
    }
  };

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
      const [action, index1, valueOrIndex2] = animations[i];

      if (action === 'compare') {
        const barOne = arrayBars[index1];
        const barTwo = arrayBars[valueOrIndex2];
        setTimeout(() => {
          barOne.style.backgroundColor = SECONDARY_COLOR;
          barTwo.style.backgroundColor = SECONDARY_COLOR;
        }, i * speed);
        setTimeout(() => {
          barOne.style.backgroundColor = PRIMARY_COLOR;
          barTwo.style.backgroundColor = PRIMARY_COLOR;
        }, (i + 1) * speed);
      } else if (action === 'overwrite') {
        const bar = arrayBars[index1];
        setTimeout(() => {
          bar.style.height = `${valueOrIndex2}px`;
        }, i * speed);
      }
    }
  };

const quickSort = () => {
  const animations = getQuickSortAnimations(array);
  const arrayBars = document.getElementsByClassName('array-bar');

  for (let i = 0; i < animations.length; i++) {
    const [action, index1, index2] = animations[i];
    const barOne = arrayBars[index1];
    const barTwo = arrayBars[index2];

    if (action === 'compare') {
      setTimeout(() => {
        barOne.style.backgroundColor = SECONDARY_COLOR;
        barTwo.style.backgroundColor = SECONDARY_COLOR;
      }, i * speed);

      setTimeout(() => {
        barOne.style.backgroundColor = PRIMARY_COLOR;
        barTwo.style.backgroundColor = PRIMARY_COLOR;
      }, (i + 1) * speed);
    } else if (action === 'swap') {
      setTimeout(() => {
        const tempHeight = barOne.style.height;
        barOne.style.height = barTwo.style.height;
        barTwo.style.height = tempHeight;
      }, i * speed);
    }
  }
};

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Sorting Visualizer</h1>

      <div className="flex flex-wrap gap-4 mb-6 justify-center items-center">
        <button
          onClick={generateNewArray}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Generate New Array
        </button>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="px-4 py-2 rounded border text-sm"
        >
          <option value="bubble">Bubble Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>
        </select>
        <button
          onClick={startSort}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Start Sorting
        </button>

        <div className="flex flex-col text-sm items-center">
          <label htmlFor="speed-slider" className="mb-1">
            Speed: {speed}ms
          </label>
          <input
            id="speed-slider"
            type="range"
            min="10"
            max="1000"
            step="10"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-40"
          />
        </div>
      </div>

      <div className="flex items-end h-96 w-full max-w-6xl border p-2 bg-white shadow rounded overflow-hidden">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="array-bar mx-0.5 bg-blue-500 transition-all duration-75"
            style={{
              height: `${value}px`,
              width: `${100 / NUMBER_OF_BARS}%`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
