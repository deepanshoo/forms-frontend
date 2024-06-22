import { useState, useCallback } from 'react';

const useValidation = (validationRules) => {
  const [errors, setErrors] = useState({});

  const validate = useCallback((name, value) => {
    if (validationRules[name]) {
      const error = validationRules[name](value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
      return error;
    }
    return null;
  }, [validationRules]);

  const validateAll = (values) => {
    const newErrors = {};
    Object.keys(values).forEach((name) => {
      if (validationRules[name]) {
        const error = validationRules[name](values[name]);
        if (error) {
          newErrors[name] = error;
        }
      }
    });
    setErrors(newErrors);
    return newErrors;
  };

  return { validate, validateAll, errors };
};

export default useValidation;
