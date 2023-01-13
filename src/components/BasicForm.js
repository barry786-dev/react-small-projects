import { useState, useRef } from 'react';

const BasicForm = (props) => {
  const initValue = {
    value: '',
    isValid: false,
    inputClasses: 'form-control',
  };

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const btnRef = useRef();

  const [firstName, setFirstName] = useState(initValue);
  const [lastName, setLastName] = useState(initValue);
  const [email, setEmail] = useState(initValue);
  const [isAutoFilled, setIsAutoFilled] = useState(false);

  let timer;

  const nameChangeHandler = (event) => {
    if (event.target.value.trim() !== '') {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log('Checking name validity from change handler!');
        setFirstName({
          value: event.target.value.trim(),
          inputClasses: 'form-control',
          isValid: true,
        });
      }, 500);
    } else {
      setFirstName({
        value: event.target.value.trim(),
        inputClasses: 'form-control invalid',
        isValid: false,
      });
    }
  };
  const lastNameChangeHandler = (event) => {
    if (event.target.value.trim() !== '') {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log('Checking lastName validity from changeHandler!');
        setLastName({
          value: event.target.value.trim(),
          inputClasses: 'form-control',
          isValid: true,
        });
      }, 500);
    } else {
      setLastName({
        value: event.target.value.trim(),
        inputClasses: 'form-control invalid',
        isValid: false,
      });
    }
  };
  const emailChangeHandler = (event) => {
    if (event.target.value.trim() !== '' && event.target.value.includes('@')) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log('Checking email validity from change Handler!');
        setEmail({
          value: event.target.value.trim(),
          inputClasses: 'form-control',
          isValid: true,
        });
      }, 500);
    } else {
      setEmail({
        value: event.target.value.trim(),
        inputClasses: 'form-control invalid',
        isValid: false,
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      getComputedStyle(lastNameInputRef.current).border ===
      '3px solid rgb(0, 0, 255)'
    ) {
      if (lastNameInputRef.current.value.trim() !== '') {
        console.log('Checking lastName validity because of autofill!');
        setLastName({
          value: lastNameInputRef.current.value.trim(),
          inputClasses: 'form-control',
          isValid: true,
        });
      } else {
        setLastName({
          value: lastNameInputRef.current.value.trim(),
          inputClasses: 'form-control invalid',
          isValid: false,
        });
      }
    }

    if (
      getComputedStyle(firstNameInputRef.current).border ===
      '3px solid rgb(0, 0, 255)'
    ) {
      if (firstNameInputRef.current.value.trim() !== '') {
        console.log('Checking first name validity because of autofill!');
        setFirstName({
          value: firstNameInputRef.current.value.trim(),
          inputClasses: 'form-control',
          isValid: true,
        });
      } else {
        setFirstName({
          value: firstNameInputRef.current.value.trim(),
          inputClasses: 'form-control invalid',
          isValid: false,
        });
      }
    }

    if (
      getComputedStyle(emailInputRef.current).border ===
      '3px solid rgb(0, 0, 255)'
    ) {
      if (emailInputRef.current.value.trim() !== '') {
        console.log('Checking email validity because of autofill!');
        setEmail({
          value: emailInputRef.current.value.trim(),
          inputClasses: 'form-control',
          isValid: true,
        });
      } else {
        setEmail({
          value: emailInputRef.current.value.trim(),
          inputClasses: 'form-control invalid',
          isValid: false,
        });
      }
    }
    if (
      getComputedStyle(emailInputRef.current).border ===
        '3px solid rgb(0, 0, 255)' ||
      getComputedStyle(firstNameInputRef.current).border ===
        '3px solid rgb(0, 0, 255)' ||
      getComputedStyle(lastNameInputRef.current).border ===
        '3px solid rgb(0, 0, 255)'
    ) {
      setIsAutoFilled(true);
      firstNameInputRef.current.value = '';
      lastNameInputRef.current.value = '';
      emailInputRef.current.value = '';
      return;
    }

    if (!firstName.isValid || !lastName.isValid || !email.isValid) {
      if (!email.isValid) {
        setEmail({
          ...email,
          inputClasses: 'form-control invalid',
        });
        emailInputRef.current.focus();
      }
      if (!lastName.isValid) {
        setLastName({
          ...lastName,
          inputClasses: 'form-control invalid',
        });
        lastNameInputRef.current.focus();
      }
      if (!firstName.isValid) {
        setFirstName({
          ...firstName,
          inputClasses: 'form-control invalid',
        });
        firstNameInputRef.current.focus();
      }
      return;
    }
    console.log(firstName, lastName, email);
    firstNameInputRef.current.value = '';
    lastNameInputRef.current.value = '';
    emailInputRef.current.value = '';
    setFirstName(initValue);
    setLastName(initValue);
    setEmail(initValue);
  };

  if (isAutoFilled) {
    /* btnRef.current.dispatchEvent(
      new Event('submit', { bubbles: true })
    ); */
    // btnRef.current.click();

    async function simulateMouseClick(el) {
      let opts = { view: window, bubbles: true, cancelable: true, buttons: 1 };
      el.dispatchEvent(new MouseEvent('mousedown', opts));
      await new Promise((r) => setTimeout(r, 50));
      el.dispatchEvent(new MouseEvent('mouseup', opts));
      el.dispatchEvent(new MouseEvent('click', opts));
    }
    simulateMouseClick(btnRef.current);

    setIsAutoFilled(false);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className={firstName.inputClasses}>
          <label htmlFor='f-Name'>First Name</label>
          <input
            ref={firstNameInputRef}
            type='text'
            id='f-name'
            onChange={nameChangeHandler}
          />
        </div>
        <div className={lastName.inputClasses}>
          <label htmlFor='lName'>Last Name</label>
          <input
            ref={lastNameInputRef}
            type='text'
            id='lName'
            onChange={lastNameChangeHandler}
          />
        </div>
      </div>
      <div className={email.inputClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
          ref={emailInputRef}
          type='text'
          id='email'
          onChange={emailChangeHandler}
        />
      </div>
      <div className='form-actions'>
        <button type='submit' ref={btnRef}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
