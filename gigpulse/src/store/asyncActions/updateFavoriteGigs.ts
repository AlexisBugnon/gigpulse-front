import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';

// Create an asynchronous Redux Thunk action with createAsyncThunk
const actionUpdateFavoriteGigs = createAsyncThunk(
    'UPDATE_FAVORITE_GIGS', // Action type for Redux Toolkit
    async (gigId: number, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;

        try {
            // Send a POST request to update the user's favorite gigs by gigId
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}/user/${state.user.currentUser.id}/add-or-delete-favorites/${gigId}`,
                null,
                {
                    headers: {
                        'Authorization': `Bearer ${state.user.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    // Extract the error message from the response or provide a default error message
                    return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la mise à jour des gigs favoris.' });
                }
            }
            // Provide a generic error message for other types of errors or unknown errors
            return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la mise à jour des gigs favoris.' });
        }
    }
);

export default actionUpdateFavoriteGigs;
