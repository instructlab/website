import { useCallback, useRef } from 'react';

const useDebounce = (callback: () => void, timeout = 100) => {
  const debounceRef = useRef<NodeJS.Timeout>(undefined);

  const debouncedCallback = useCallback(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(callback, timeout);
  }, [callback, timeout]);

  return debouncedCallback;
};

export default useDebounce;
