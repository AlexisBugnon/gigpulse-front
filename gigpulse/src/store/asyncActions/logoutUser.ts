import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios, { AxiosError } from 'axios';

interface ErrorResponse {
    message: string;
}

// Create an asynchronous Redux Thunk action with createAsyncThunk
const actionLogoutUser = createAsyncThunk(
    'LOGOUT_USER', // Action type for Redux Toolkit
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;

        try {
            // Send a POST request to the logout endpoint with authorization headers
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}/logout`, // Logout API URL
                null, // No request body needed
                {
                    headers: {
                        'Authorization': `Bearer ${state.user.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Return the response data
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    // Extract the error message from the response or provide a default error message
                    return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la déconnexion.' });
                }
            }
            // Provide a generic error message for other types of errors or unknown errors
            return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la déconnexion.' });
        }
    }
);

export default actionLogoutUser;
