import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';

// Create an asynchronous Redux Thunk action with createAsyncThunk
const actionGigDestroy = createAsyncThunk(
    'GIG_DESTROY', // Action type for Redux Toolkit
    async (payload: { gigId: number }, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const { gigId } = payload;

        try {
            // Send a DELETE request to remove a gig by its ID
            const response = await axios.delete(
                `${import.meta.env.VITE_REACT_APP_API_URL}/gigs/${gigId}`, // API URL with the gig ID
                {
                    headers: {
                        'Authorization': `Bearer ${state.user.token}`, // Add an authorization header with the user token
                        'Content-Type': 'application/json', // Specify JSON content type
                        'Accept': 'application/json' // Specify JSON response type
                    },
                }
            );

            if (response.status === 200) {
                // If the response status is 200 (OK), return the gigId as a successful result
                return gigId;
            } else {
                // If the response status is not 200, reject with an error message
                return thunkAPI.rejectWithValue({ message: 'Réponse non gérée du serveur.' });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;

                if (axiosError.response) {
                    // Extract the error message from the response or provide a default error message
                    return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la suppression du gig.' });
                }
            }

            // Provide a generic error message for other types of errors or unknown errors
            return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la suppression du gig.' });
        }
    }
);

export default actionGigDestroy;
