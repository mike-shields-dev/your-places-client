import React, { useCallback, useReducer } from 'react';

import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../shared/components/util/validators';

import './styles.css';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;

            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid =
                        formIsValid && action.isValid;
                } else {
                    formIsValid =
                        formIsValid && state.inputs[inputId].isValid;
                }
            }

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                },
                isValid: formIsValid,
            }
        
        default: {
            return state;
        }
    }
};

const NewPlace = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            }
        }, 
        isValid: false,
    });

    const handleInput = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value,
            isValid,
            inputId: id
        });
    }, []);

    const handleFormSubmit = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (
        <form className='place-form' onSubmit={handleFormSubmit}>
            <Input
                id='title'
                element='input'
                label='Title'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a valid title.'
                onInput={handleInput}
            />
            <Input
                id='description'
                element='textarea'
                label='Description'
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                errorText='Please enter a valid description (5 characters minimum).'
                onInput={handleInput}
            />
            <Input
                id='address'
                element='input'
                label='Address'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a valid address.'
                onInput={handleInput}
            />
            <Button disabled={!formState.isValid}>Add Place</Button>
        </form>
    );
}

export default NewPlace;
