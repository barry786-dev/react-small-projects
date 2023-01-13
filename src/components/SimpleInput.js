import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const {
    enteredValue: enteredName,
    ValueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    ValueIsValid: enteredNameIsValid,
    hasError: nameInputIsInvalid,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    enteredValue: enteredEmail,
    ValueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    ValueIsValid: enteredEmailIsValid,
    hasError: EmailInputIsInvalid,
    reset: resetEmailInput,
  } = useInput((value) => value.includes('@'));

  const formIsValid = enteredNameIsValid && enteredEmailIsValid;

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }
    console.log(enteredName);
    console.log(enteredEmail);

    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';
  const EmailInputClasses = EmailInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          // ref={nameInput}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className='error-text'>Name must not be empty.</p>
        )}
      </div>
      <div className={EmailInputClasses}>
        <label htmlFor='email'>Your E-mail</label>
        <input
          type='email'
          id='email'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          // ref={nameInput}
          value={enteredEmail}
        />
        {EmailInputIsInvalid && (
          <p className='error-text'>Enter valid Email please.</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
