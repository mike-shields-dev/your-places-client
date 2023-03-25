import React, { useContext, useState } from 'react';
import AuthContext from '../../../shared/context/auth-context';

import Card from '../../../shared/components/UIElements/Card';
import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';


import {
  VALIDATOR_EMAIL,
  VALIDATOR_PASSWORD,
  VALIDATOR_REQUIRE
} from '../../../shared/util/validators';

import useForm from '../../../shared/hooks/useForm';
import { useHttpClient } from '../../../shared/hooks/useHttpClient';

import './styles.css';

const Auth = () => {
  const { login } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  const {isLoading, error, sendRequest, clearError } = useHttpClient();
  const [uncaughtError, setUncaughtError] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }

    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

      if(isLoginMode) {
        
        try {
          const data = await sendRequest(
            'http://localhost:5000/api/users/login',
            'POST', 
            JSON.stringify({
              email: formState.inputs.email.value,
              password: formState.inputs.password.value
            }),
            { 'Content-Type': 'application/json' },
          );
          
          if(!data.user) {
            return setUncaughtError(data.message)
          }

          login(data.user.id);

        } catch (error) {
          setUncaughtError(error.message);
        }

      } else {
        
        try {
          const data = await sendRequest(
            'http://localhost:5000/api/users/signup', 
            'POST',
            JSON.stringify({
              name: formState.inputs.name.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
            { 'Content-Type': 'application/json' },
          );
          
          if(!data.user) {
            return setUncaughtError(data.message)
          }

          login(data.user.id);

        } catch (error) {
          setUncaughtError(error.message);
        }
      }
  };

  const clearErrorHandler = () => {
    clearError(null);
    setUncaughtError(null); 
  }

  return (
    <>
      <ErrorModal error={error || uncaughtError} onClear={clearErrorHandler} />
      <Card className="authentication">
      {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginMode ? 'Log In' : 'Sign Up'}</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_PASSWORD()]}
            errorText={`
              Please enter a valid password:
              min 8 characters, 
              min 1 upper case character, 
              min 1 lower case character, 
              min 1 number,
              min 1 special character`}
            onInput={inputHandler}
          />
          <Button
            type="submit"
            disabled={!formState.isValid}
          >
            {isLoginMode ? 'Log In' : 'Sign Up'}
          </Button>
          </form>
            <p>{`${isLoginMode ? 'Not' : 'Already'} registered?`}</p>
            <p>{`Please ${isLoginMode ? 'sign up' : 'log in'}.`}</p>  

        <Button inverse onClick={switchModeHandler}>
          Go to {isLoginMode ? 'Sign Up' : 'Log In'}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
