import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';

// Define the payload interface for updating an admin gig.
interface AdminGigUpdatePayload {
    gigId: number;
    isActive: boolean;
}

// Create an asynchronous Redux Thunk action using createAsyncThunk.
const actionAdminGigUpdate = createAsyncThunk(
    'GIG_ADMIN_UPDATE',
    async (payload: AdminGigUpdatePayload, thunkAPI) => {
        // Access the current Redux state using thunkAPI.getState().
        const state = thunkAPI.getState() as RootState;
        
        try {
            // Send a PUT request to update a gig's status by gigId.
            const response = await axios.put(
                `${import.meta.env.VITE_REACT_APP_API_URL}/gigs/${payload.gigId}`,
                { is_active: payload.isActive },
                {
                    headers: {
                        'Authorization': `Bearer ${state.user.token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                }
            );

            // Return the status from the API response.
            return {
                status: response.data,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors.
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    // If the response has data, extract the error message.
                    return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur de l\'API.' });
                }
            }
            // For other types of errors, provide a generic error message.
            return thunkAPI.rejectWithValue({ message: 'Erreur lors de la mise à jour du Gig.' });
        }
    }
);

export default actionAdminGigUpdate;