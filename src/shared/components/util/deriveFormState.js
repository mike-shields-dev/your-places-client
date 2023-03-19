const deriveFormState = (formInputs) =>
    formInputs.reduce((initFormState, formInput) => {
        return {
            ...initFormState,
            [formInput.id]: {
                value: formInput.value,
                isValid: formInput.isValid,
            }
        }
    }, {});

export default deriveFormState;
