export function getBubbleSortAnimations(array) {
  const animations = [];
  const arr = array.slice();

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      animations.push(['compare', j, j + 1]);
      if (arr[j] > arr[j + 1]) {
        animations.push(['swap', j, j + 1]);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return animations;
}
