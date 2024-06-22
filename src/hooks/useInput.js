import { useState, useCallback } from 'react';

function useInput(initialValue, validate) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  const handleChange = useCallback((event) => {
    const { value } = event.target;
    setValue(value);
    if (validate) {
      const error = validate(value);
      setError(error);
    }
  }, [validate]);

  return {
    value,
    error,
    handleChange,
  };
}

export default useInput;
