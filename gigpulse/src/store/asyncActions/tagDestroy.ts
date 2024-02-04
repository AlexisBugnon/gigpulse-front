import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';


// Create an asynchronous Redux Thunk action with createAsyncThunk
const actionTagDestroy = createAsyncThunk(
    'TAG_DESTROY', // Action type for Redux Toolkit
    async (args: { tagId: number }, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const { tagId } = args;

        try {
            // Send a DELETE request to remove a tag by its ID
            const response = await axios.delete(
                `${import.meta.env.VITE_REACT_APP_API_URL}/tags/${tagId}`, // API endpoint for tag deletion
                {
                    headers: {
                        'Authorization': `Bearer ${state.user.token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                }
            );

            if (response.status === 200) {
                // Return the tag ID if the deletion is successful
                return tagId;
            } else {
                // Return a rejection with a message for an unhandled server response
                return thunkAPI.rejectWithValue({ message: 'Réponse non gérée du serveur.' });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    // Extract the error message from the response or provide a default error message
                    return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la suppression du tag.' });
                }
            }
            // Provide a generic error message for other types of errors or unknown errors
            return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la suppression du tag.' });
        }
    }
);

export default actionTagDestroy;
