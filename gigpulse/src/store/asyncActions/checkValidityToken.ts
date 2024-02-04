import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';

// Create an asynchronous Redux Thunk action using createAsyncThunk.
const actionCheckValidityToken = createAsyncThunk(
    'CHECK_VALIDITY_TOKEN',
    async (token: string, thunkAPI) => {
        try {
            // Send a POST request to check the validity of the provided token.
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}/check-validity-token`,
                null, // No request body is needed for token validation.
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Return the data from the API response.
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors.
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    // If the response has data, extract the error message.
                    return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la vérification du token.' });
                }
            }
            // For other types of errors, provide a generic error message.
            return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la vérification du token.' });
        }
    }
);

export default actionCheckValidityToken;
