import { useState, useCallback } from 'react';

function useCustomForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (validate) {
      const error = validate(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }
  }, [validate]);

  const handleSubmit = useCallback((callback) => (event) => {
    event.preventDefault();
    const validationErrors = Object.keys(values).reduce((acc, key) => {
      const error = validate(key, values[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    callback(values);
  }, [values, validate]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}

export default useCustomForm;
