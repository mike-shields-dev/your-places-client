import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../../shared/context/auth-context';

import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';

import useForm from '../../../shared/hooks/useForm';
import useHttpClient from '../../../shared/hooks/useHttpClient';
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
    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    const { userId } = useContext(AuthContext);
    const history = useHistory();

    const handleFormSubmit = async event => {
        event.preventDefault();
        
        try {
            await sendRequest(
                'http://localhost:5000/api/places',
                'POST',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    address: formState.inputs.address.value,
                    creator: userId, 
                }),
                { 'Content-Type': 'application/json' }
            )
            history.push('/')
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <form
                className='place-form'
                onSubmit={handleFormSubmit}
            >
            {isLoading && <LoadingSpinner  asOverlay />}
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
        </>
    );
}

export default NewPlace;
