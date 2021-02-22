export default function debounce(func, ms) {
  let isReady = true;

  return function (...rest) {
    if (!isReady) {
      return
    }

    isReady = false;

    func(...rest);

    setTimeout(() => isReady = true, ms);
  }
}