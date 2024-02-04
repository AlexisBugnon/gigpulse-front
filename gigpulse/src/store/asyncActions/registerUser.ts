import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';

interface RegisterData {
    name: string;
    email: string;
    password: string;
}


// Create an asynchronous Redux Thunk action with createAsyncThunk
const actionRegisterUser = createAsyncThunk(
    'REGISTER_USER', // Action type for Redux Toolkit
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const registerData: RegisterData = {
            name: state.register.register.name,
            email: state.register.register.email,
            password: state.register.register.password,
        };

        try {
            // Send a POST request to the register endpoint with user registration data
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}/register`, // Registration API URL
                registerData // User registration data
            );

            // Return the response data
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    // Extract the error message from the response or provide a default error message
                    return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de l\'inscription.' });
                }
            }
            // Provide a generic error message for other types of errors or unknown errors
            return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de l\'inscription.' });
        }
    }
);

export default actionRegisterUser;
