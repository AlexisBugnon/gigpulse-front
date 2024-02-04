import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';

// Create an asynchronous Redux Thunk action using createAsyncThunk.
const actionCategoryDestroy = createAsyncThunk(
    'CATEGORY_DESTROY',
    async (payload: { categoryId: number }, thunkAPI) => {
        // Access the current Redux state using thunkAPI.getState().
        const state = thunkAPI.getState() as RootState;
        const { categoryId } = payload;

        try {
            // Send a DELETE request to the API to delete a category by categoryId.
            const response = await axios.delete(
                `${import.meta.env.VITE_REACT_APP_API_URL}/categories/${categoryId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${state.user.token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                }
            );

            // If the API responds with a status code of 200, return the categoryId.
            if (response.status === 200) {
                return categoryId;
            } else {
                // Handle unexpected server response.
                return thunkAPI.rejectWithValue({ message: 'Réponse non gérée du serveur.' });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors.
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    // If the response has data, extract the error message.
                    const errorMessage = axiosError.response.data.message || 'Erreur de l\'API.';
                    return thunkAPI.rejectWithValue({ message: errorMessage });
                } else if (axiosError.request) {
                    // Handle cases where no response was received from the server.
                    return thunkAPI.rejectWithValue({ message: 'Pas de réponse du serveur.' });
                }
            }
            // Handle non-Axios errors.
            return thunkAPI.rejectWithValue({ message: 'Erreur inconnue.' });
        }
    }
);

export default actionCategoryDestroy;
