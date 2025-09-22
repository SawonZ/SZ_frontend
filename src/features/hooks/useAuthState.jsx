import React, { useReducer } from 'react';

const initialValue = {
    name: '',
    phone: '',
    email: '',
    emailCheck: '',
    password: '',
    passwordCheck: ''
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_FIELD':
            return {...state, [action.field]: action.payload};
        case 'SET_RESET':
            return {...state, [action.field]: initialValue[action.field]};
        default:
            return state;
    };
};

const useAuthState = () => {
    const [state, dispatch] = useReducer(reducer, initialValue);

    console.log(state);

    const authInputChanged = (e, field) => {
        dispatch({ type: 'SET_FIELD', field, payload: e.target.value });
    };
    
    const authInputReset = (field) => {
        dispatch({ type: 'SET_RESET', field });
    };

    return {state, authInputChanged, authInputReset};
};

export default useAuthState;