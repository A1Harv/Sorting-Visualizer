const algorithmInfo = {
  bubble: {
    name: "Bubble Sort",
    time: "O(n²)",
    space: "O(1)",
    stable: "Yes",
    description:
      "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
  },
  merge: {
    name: "Merge Sort",
    time: "O(n log n)",
    space: "O(n)",
    stable: "Yes",
    description:
      "Merge Sort is a divide-and-conquer algorithm that divides the array into halves, sorts them and merges them back.",
  },
  quick: {
    name: "Quick Sort",
    time: "O(n log n)",
    space: "O(log n)",
    stable: "No",
    description:
      "Quick Sort is a fast sorting algorithm using divide-and-conquer. It picks a pivot and partitions the array around it.",
  },
};

export default algorithmInfo;
