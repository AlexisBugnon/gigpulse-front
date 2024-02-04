import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';

// Define the structure of gig update data
interface GigUpdateData {
    category_id: number;
    title: string;
    picture: string;
    description: string;
    price: number;
    tags: number[];
    user_id: number;
    is_active: boolean;
}

// Create an asynchronous Redux Thunk action with createAsyncThunk
const actionGigUpdate = createAsyncThunk(
    'GIG_UPDATE', // Action type for Redux Toolkit
    async (payload: { gigId: number }, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const { gigId } = payload;

        if (state.gig.gigUpdate) {
            try {
                // Prepare gig update data based on the state
                const gigData: GigUpdateData = {
                    category_id: state.gig.gigUpdate.categoryId,
                    title: state.gig.gigUpdate.title,
                    picture: state.gig.gigUpdate.picture,
                    description: state.gig.gigUpdate.description,
                    price: state.gig.gigUpdate.price,
                    tags: state.gig.gigUpdate.tags.ids,
                    user_id: state.user.currentUser.id,
                    is_active: state.gig.gigUpdate.isActive
                };

                // Send a PUT request to update the gig with the provided gigId
                const response = await axios.put(
                    `${import.meta.env.VITE_REACT_APP_API_URL}/gigs/${gigId}`, // API URL with gigId
                    gigData, // Data to be updated
                    {
                        headers: {
                            'Authorization': `Bearer ${state.user.token}`, // Include user token in headers
                            'Content-Type': 'application/json', // Specify JSON content type
                            'Accept': 'application/json' // Specify JSON response type
                        },
                    }
                );

                // Return the response data after updating the gig
                return response.data;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<ErrorResponse>;
                    if (axiosError.response) {
                        // Extract the error message from the response or provide a default error message
                        return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la mise à jour du gig.' });
                    }
                }
                // Provide a generic error message for other types of errors or unknown errors
                return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la mise à jour du gig.' });
            }
        }
    }
);

export default actionGigUpdate;