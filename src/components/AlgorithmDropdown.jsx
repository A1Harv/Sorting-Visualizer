import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const algorithms = [
  { label: "Bubble Sort", value: "bubble" },
  { label: "Merge Sort", value: "merge" },
  { label: "Quick Sort", value: "quick" },
];

export default function AlgorithmDropdown({ selected, onChange }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (algo) => {
    onChange(algo.value);
    setOpen(false);
  };

  const selectedLabel =
    algorithms.find((algo) => algo.value === selected)?.label || "Select Algorithm";

  return (
    <div className="relative text-sm w-44">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        {selectedLabel}
        <FaChevronDown className="ml-2 text-xs" />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-md">
          {algorithms.map((algo) => (
            <button
              key={algo.value}
              onClick={() => handleSelect(algo)}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white"
            >
              {algo.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
