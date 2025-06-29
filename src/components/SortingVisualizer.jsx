import React, { useState, useEffect } from 'react';
import { getBubbleSortAnimations } from '../algorithms/bubblesort';
import { getMergeSortAnimations } from '../algorithms/mergesort';
import { getQuickSortAnimations } from '../algorithms/quicksort';
import AlgorithmDropdown from './AlgorithmDropdown';
import algorithmInfo from '../data/algorithmInfo';

const NUMBER_OF_BARS = 50;
const PRIMARY_COLOR = '#3b82f6'; // Tailwind blue-500
const SECONDARY_COLOR = '#ef4444'; // Tailwind red-500
const completionSound = new Audio('/success-chime.mp3');


const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(100); // Default speed in ms
  const [isSorting,setisSorting] = useState(false);

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
    setisSorting(true);
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
    setTimeout(() => {
      setisSorting(false);
      completionSound.currentTime = 0;
completionSound.play();
    },animations.length * speed+100);
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
    setTimeout(() => {
      setisSorting(false);
      completionSound.currentTime = 0;
      completionSound.play();
    },animations.length * speed+100);
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
   setTimeout(() => {
      setisSorting(false);
      completionSound.currentTime = 0;
      completionSound.play();
    },animations.length * speed+100);
};

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Sorting Visualizer</h1>

      <div className="flex flex-wrap gap-4 mb-6 justify-center items-center">
        <button
          onClick={generateNewArray} disabled={isSorting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Generate New Array
        </button>
        <AlgorithmDropdown selected={algorithm} onChange={setAlgorithm} />

        <button
          onClick={startSort} disabled={isSorting}
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
<div className="w-full max-w-2xl mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded shadow text-sm">
  <h2 className="text-lg font-semibold mb-2">{algorithmInfo[algorithm].name}</h2>
  <p><strong>Time Complexity:</strong> {algorithmInfo[algorithm].time}</p>
  <p><strong>Space Complexity:</strong> {algorithmInfo[algorithm].space}</p>
  <p><strong>Stable:</strong> {algorithmInfo[algorithm].stable}</p>
  <p className="mt-2 text-justify">{algorithmInfo[algorithm].description}</p>
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
