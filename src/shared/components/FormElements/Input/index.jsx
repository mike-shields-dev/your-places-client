import React, { useReducer } from 'react'

import { validate } from '../../util/validators';

import './styles.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators),
                isTouched: false,
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true,
            };
        default:
            return state;
    }
};

const Input = props => {
    const [inputState, dispatch] = useReducer(
        inputReducer, { value: '', isValid: false }
    );

    const handleChange = event => {
        dispatch({
            type: 'CHANGE',
            value: event.target.value,
            validators: props.validators,
        });
    };

    const handleTouch = () => {
        dispatch({
            type: 'TOUCH',
        });
    };

    const formElement = props.element
        ? <input
            id={props.id}
            placeholder={props.placeholder}
            onChange={handleChange}
            onBlur={handleTouch}
            value={inputState.value}
        />
        : <textarea
            id={props.id}
            rows={props.rows || 3}
            onChange={handleChange}
            onBlur={handleTouch}
            value={inputState.value}
        />;
    
    const isInvalidOnBlur =
        !inputState.isValid && inputState.isTouched;

    return (
        <div className={
            `form-control ${isInvalidOnBlur &&'form-control--invalid'}`
        } >
            <label htmlFor={props.id}>
                {props.label}
            </label>
            {formElement}
            {isInvalidOnBlur && <p>{props.errorText}</p>}
        </div>
    );
}

export default Input;
