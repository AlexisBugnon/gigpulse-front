import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';

interface TagUpdateData {
    name: string;
}

// Create an asynchronous Redux Thunk action with createAsyncThunk
const actionTagUpdate = createAsyncThunk(
    'TAG_UPDATE', // Action type for Redux Toolkit
    async (payload: { tagId: number }, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const { tagId } = payload;

        if (state.tags.tag) {
            try {
                // Prepare the data to update the tag
                const tagData: TagUpdateData = {
                    name: state.tags.tag.name, // Get the name of the tag from the Redux state
                };

                // Send a PUT request to update the tag by its ID
                const response = await axios.put(
                    `${import.meta.env.VITE_REACT_APP_API_URL}/tags/${tagId}`, // API endpoint for tag update
                    tagData,
                    {
                        headers: {
                            'Authorization': `Bearer ${state.user.token}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                    }
                );

                if (response.status === 200) {
                    // If the update was successful, return the updated tag ID
                    return tagId;
                } else {
                    // Handle cases where the server response status is not 200
                    return thunkAPI.rejectWithValue({ message: 'Réponse non gérée du serveur.' });
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<ErrorResponse>;
                    if (axiosError.response) {
                        // Extract the error message from the response or provide a default error message
                        return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la mise à jour du tag.' });
                    }
                }
                // Provide a generic error message for other types of errors or unknown errors
                return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la mise à jour du tag.' });
            }
        }
    }
);

export default actionTagUpdate;
