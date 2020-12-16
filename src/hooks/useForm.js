import { useState } from 'react';

const useForm = (onSubmit, initialState = {}, validate) => {
  const [inputs, setInputs] = useState(initialState);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    if ((typeof validate === 'function' && validate(inputs)) || !validate) {
      onSubmit(inputs);
    }
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return {
    handleInputChange,
    handleSubmit,
    inputs,
    setInputs,
  };
};

export default useForm;
