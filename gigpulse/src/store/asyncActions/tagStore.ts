import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';

interface TagData {
    name: string;
}


// Create an asynchronous Redux Thunk action with createAsyncThunk
const actionTagStore = createAsyncThunk(
    'TAG_CREATE', // Action type for Redux Toolkit
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const tagData: TagData = {
            name: state.tags.inputValueStore.name, // Get the name of the tag from the Redux state
        };

        try {
            // Send a POST request to create a new tag
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}/tags`, // API endpoint for tag creation
                tagData,
                {
                    headers: {
                        'Authorization': `Bearer ${state.user.token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                }
            );

            // Return the response data from the API
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    // Extract the error message from the response or provide a default error message
                    return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la création du tag.' });
                }
            }
            // Provide a generic error message for other types of errors or unknown errors
            return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la création du tag.' });
        }
    }
);

export default actionTagStore;
