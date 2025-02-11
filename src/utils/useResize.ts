import { useCallback, useEffect, useState } from 'react';
import useDebounce from './useDebounce';

const useResize = (callback?: () => void, onStart?: () => void) => {
  const [isResizing, setResizing] = useState(false);

  const debouncedCallback = useDebounce(() => {
    setResizing(false);
    callback?.();
  });

  const resizeHandler = useCallback(() => {
    if (!isResizing) {
      setResizing(true);
      onStart?.();
    }
    debouncedCallback();
  }, [debouncedCallback, isResizing, onStart]);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [resizeHandler]);

  return { isResizing };
};

export default useResize;
