import { useState } from 'react';
const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const ValueIsValid = validateValue(enteredValue);
  const hasError = !ValueIsValid && isTouched;

   const ValueChangeHandler = (event) => {
     setEnteredValue(event.target.value);
   };
  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    enteredValue,
    ValueChangeHandler,
    inputBlurHandler,
    ValueIsValid,
    hasError,
    reset,
  };
};
export default useInput;
