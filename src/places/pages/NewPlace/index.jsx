import React from 'react';

import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';

import useForm from '../../../shared/hooks/useForm';
import deriveFormState from '../../../shared/components/util/deriveFormState';

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../shared/components/util/validators';

import '../styles.css';

const formInputs = [
    {
        id: 'title',
        label: 'Title',
        value: '',
        isValid: false,
        element: 'input',
        errorText: 'Please enter a valid title.',
        validators: [VALIDATOR_REQUIRE()]
    },
    {
        id: 'description',
        label: 'Description',
        value: '',
        isValid: false,
        element: 'textarea',
        errorText: 'Please enter a valid description (5 characters minimum).',
        validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]
    },
    {
        id: 'address',
        label: 'Address',
        value: '',
        isValid: false,
        element: 'input',
        errorText: 'Please enter a valid address.',
        validators: [[VALIDATOR_REQUIRE()]]
    }
]

const initFormState = deriveFormState(formInputs);

const NewPlace = () => {
    const [formState, handleInput] = useForm(initFormState, true);

    const handleFormSubmit = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (
        <form
            className='place-form'
            onSubmit={handleFormSubmit}
        >
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
            <Button disabled={!formState.isValid}>Add Place</Button>
        </form>
    );
}

export default NewPlace;
