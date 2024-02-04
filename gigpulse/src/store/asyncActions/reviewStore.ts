import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';

interface ReviewData {
    rating: number;
    comment: string;
    gig_id: number;
    user_id: number;
}


// Create an asynchronous Redux Thunk action with createAsyncThunk
const actionReviewStore = createAsyncThunk(
    'REVIEW_CREATE', // Action type for Redux Toolkit
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const reviewData: ReviewData = {
            rating: state.reviews.inputValueStore.rating,
            comment: state.reviews.inputValueStore.description,
            gig_id: state.gig.gig.id,
            user_id: state.user.currentUser.id
        };

        try {
            // Send a POST request to create a new review with the provided review data
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}/reviews`, // API endpoint for creating reviews
                reviewData, // Review data
                {
                    headers: {
                        'Authorization': `Bearer ${state.user.token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
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
                    return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la création de l\'avis.' });
                }
            }
            // Provide a generic error message for other types of errors or unknown errors
            return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la création de l\'avis.' });
        }
    }
);

export default actionReviewStore;
