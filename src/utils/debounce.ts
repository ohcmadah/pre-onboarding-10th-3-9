const debounce = (fn: () => void, wait: number) => {
  let timerId: NodeJS.Timeout | null = null;

  const clear = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = null;
  };

  const debounced = () => {
    clear();
    timerId = setTimeout(fn, wait);
  };

  debounced.clear = clear;

  return debounced;
};

export default debounce;
