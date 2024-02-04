import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';

// Define the structure of the payload for gig creation
interface GigCreateData {
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
const actionGigStore = createAsyncThunk(
    'GIG_CREATE',  // Action type for Redux Toolkit
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        // Create a gigData object with data from the state
        const gigData: GigCreateData = {
            category_id: state.gigStore.inputValueStore.category,
            title: state.gigStore.inputValueStore.title,
            picture: state.gigStore.inputValueStore.picture,
            description: state.gigStore.inputValueStore.description,
            price: state.gigStore.inputValueStore.price,
            tags: state.gigStore.inputValueStore.tags,
            user_id: state.user.currentUser.id,
            is_active: true
        };

        try {
            // Send a POST request to create a new gig using gigData
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}/gigs`, // API URL for gig creation
                gigData, // Gig data in the request body
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
                    return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la création du gig.' });
                }
            }
            // Provide a generic error message for other types of errors or unknown errors
            return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la création du gig.' });
        }
    }
);

export default actionGigStore;
