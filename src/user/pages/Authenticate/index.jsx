import React from 'react';

import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';
import Card from '../../../shared/components/UIElements/Card';

import useForm from '../../../shared/components/hooks/useForm';
import deriveFormState from '../../../shared/components/util/deriveFormState';

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../shared/components/util/validators';

import './styles.css'

const formInputs = [
    {
        id: 'email',
        label: 'Email',
        value: '',
        isValid: false,
        element: 'input',
        errorText: 'Please enter a valid email address.',
        validators: [VALIDATOR_EMAIL()]
    },
    {
        id: 'password',
        label: 'Password',
        value: '',
        isValid: false,
        element: 'input',
        errorText: 'Please enter a valid password.',
        validators: [VALIDATOR_MINLENGTH(12)],
    }
]

const initFormState = deriveFormState(formInputs);

const Authenticate = () => {
    const [formState, handleInput] = useForm(initFormState, false);

    const handleFormSubmit = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };
    return (
        <Card className="authentication">
            <h2>Login Required</h2>
            <form onSubmit={handleFormSubmit}>
                {formInputs.map(({
                    id,
                    element,
                    errorText,
                    label,
                    validators
                }) =>
                    <Input
                        key={`new-place-form$-${id}`}
                        onInput={handleInput}
                        {...{ id, element, label, validators, errorText }}
                    />
                )}
                <Button disabled={!formState.isValid}>Login</Button>
            </form>
        </Card>
    )
}

export default Authenticate;
