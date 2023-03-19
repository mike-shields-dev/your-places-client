import { useCallback, useReducer } from 'react';

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
        case 'SET_FORM_STATE':
            return {
                ...state,
                inputs: action.inputs,
                isValid: action.isFormValid,
            }

        default: {
            return state;
        }
    }
};


const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    });

    const handleInput = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value,
            isValid,
            inputId: id
        });
    }, []);

    const setFormState = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_FORM_STATE',
            inputs: inputData,
            isFormValid: formValidity,
        });
    }, []);

    return [formState, handleInput, setFormState];
}

export default useForm;
