import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

import Button from '../../../shared/components/FormElements/Button';
import Card from '../../../shared/components/UIElements/Card';
import Input from '../../../shared/components/FormElements/Input';

import useForm from '../../../shared/components/hooks/useForm';

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../shared/components/util/validators';

import '../styles.css';

const PLACES = [
    {
        id: 'place0',
        title: 'Empire State Building',
        description: 'One of the most famous buildings in the world.',
        imageUrl: 'https://marvel-b1-cdn.bc0a.com/f00000000179470/www.esbnyc.com/sites/default/files/styles/small_feature/public/2019-10/home_banner-min.jpg?itok=uZt-03Vw',
        address: '20 W 34th St., New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9878531,
        },
        creator: 'user1',
    },
    {
        id: 'place1',
        title: 'Machu Picchu',
        description: 'Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley. Built in the 15th century and later abandoned, it’s renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar, intriguing buildings that play on astronomical alignments and panoramic views. Its exact former use remains a mystery.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Before_Machu_Picchu.jpg/1200px-Before_Machu_Picchu.jpg',
        address: 'Peru',
        location: {
            lat: -13.2263308,
            lng: -72.4995102,
        },
        creator: 'user1',
    },
];

const formInputs = [
    {
        id: 'title',
        label: 'Title',
        value: '',
        isValid: false,
        element: 'input',
        errorText: 'Please enter a valid title.',
        minLength: 5,
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
];

const initFormState = formInputs.reduce((initFormState, formInput) => {
    return {
        ...initFormState,
        [formInput.id]: {
            value: formInput.value,
            isValid: formInput.isValid,
        }
    }
}, {});

const UpdatePlace = () => {
    const [formState, handleInput, setFormState] = useForm(initFormState, false);

    const placeId = useParams().placeId;

    const foundPlace = PLACES.find(place => place.id === placeId);

    useEffect(() => {
        if (foundPlace) {

            const { title, description } = foundPlace;

            setFormState({
                title: {
                    value: title,
                    isValid: true,
                },
                description: {
                    value: description,
                    isValid: true,
                }
            }, true);
        }

    }, [foundPlace, setFormState]);

    if (!foundPlace) {
        return (
            <div className='center'>
                <Card>
                    <h2>No place found. </h2>
                </Card>
            </div>
        );
    }

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
                validators,
                isValid,
            }) =>
                <Input
                    key={`new-place-form$-${id}`}
                    onInput={handleInput}
                    value={foundPlace[id]}
                    valid={isValid}
                    id={id}
                    type={element}
                    label={label}
                    validators={validators}
                    errorText={errorText}
                />
            )}
            <Button
                type='submit'
                disabled={!formState.isValid}
            >
                Update Place
            </Button>
        </form>
    )
}

export default UpdatePlace;
