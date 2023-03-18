import React from 'react';

import Input from '../../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../../shared/components/util/validators';

import './styles.css';

const NewPlace = () => {
    return (
        <form className='place-form'>
            <Input
                element='input'
                label='Title'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a valid title.'             
            />
        </form>
    );
}

export default NewPlace;
