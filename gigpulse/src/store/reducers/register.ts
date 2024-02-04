import { createAction, createReducer } from '@reduxjs/toolkit';
import actionRegisterUser from '../asyncActions/registerUser';
import { ErrorResponse } from '../../@types/errorResponse';

export interface RegisterState {
    register: {
        name: string;
        email: string;
        password: string;
        confirmedPassword: string;
    };
    message: {
        type: 'error' | 'success';
        content: string;
    }
}

interface ActionInputsRegisterForm {
    type: 'name' | 'email' | 'password' | 'confirmedPassword';
    value: string;
}

export const initialState: RegisterState = {
    register: {
        name: '',
        email: '',
        password: '',
        confirmedPassword: '',
    },
    message: {
        type: 'error',
        content: ''
    }
};

// Create actions to update form inputs and handle registration errors
export const actionUpdateInputsRegisterForm = createAction<ActionInputsRegisterForm>('UPDATE_INPUT_REGISTER_FORM');
export const actionResetMessageRegister = createAction('RESET_MESSAGE_REGISTER');

// Create the registerReducer to handle registration-related actions
const registerReducer = createReducer(initialState, (builder) => {
    builder
        // Handle successful registration
        .addCase(actionRegisterUser.fulfilled, (state) => {
            // Reset the registration form fields to their initial state
            // state.register = initialState.register;
            state.register = initialState.register;
            state.message = {type: 'success', content: 'Compte créé avec succès !'}
        })
        // Handle registration failure and set error message
        .addCase(actionRegisterUser.rejected, (state, action) => {
            // Set the error message to the provided error message or a default message
            const { message } = action.payload as ErrorResponse;
            state.message = {type: 'error', content: message};
        })
        // Handle action to update form inputs
        .addCase(actionUpdateInputsRegisterForm, (state, action) => {
            // Update the form field specified by the payload type with the provided value
            state.register[action.payload.type] = action.payload.value;
        })
        .addCase(actionResetMessageRegister, (state) => {
            state.message = initialState.message;
        });
});

export default registerReducer;