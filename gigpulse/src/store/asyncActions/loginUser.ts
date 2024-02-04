import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios, { AxiosError } from 'axios';

interface LoginPayload {
    email: string;
    password: string;
}

interface ErrorResponse {
    message: string;
}

// Create an asynchronous Redux Thunk action with createAsyncThunk
const actionLoginUser = createAsyncThunk(
    'LOGIN_USER', // Action type for Redux Toolkit
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const loginData: LoginPayload = {
            email: state.user.login.email,
            password: state.user.login.password,
        };

        try {
            // Send a POST request to the login endpoint with loginData
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}/login`, // API URL for login
                loginData
            );

            // Return the response data
            return response.data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    // Extract the error message from the response or provide a default error message
                    
                    return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la connexion.' });
                }
            }
            // Provide a generic error message for other types of errors or unknown errors
            return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la connexion.' });
        }
    }
);

export default actionLoginUser;
