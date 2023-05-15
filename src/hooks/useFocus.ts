import { useRef } from 'react';

const useFocus = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const setFocus = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return { ref, setFocus };
};

export default useFocus;
