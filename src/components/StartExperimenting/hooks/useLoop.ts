import { useCallback, useRef, useState } from 'react';

type LoopValue<T> = {
  value: T;
  duration: number;
};

const useLoop = <T>(values: LoopValue<T>[], defaultValue: LoopValue<T>) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [value, setValue] = useState(defaultValue.value);

  const stop = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const start = useCallback(() => {
    let i = 0;

    const loop = () => {
      setValue(values[i].value);
      timeoutRef.current = setTimeout(() => {
        i = (i + 1) % values.length;
        loop();
      }, values[i].duration);
    };
    loop();
  }, [values]);

  return {
    value,
    start,
    stop,
  };
};

export default useLoop;
