import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';

// Define an interface for the category data.
interface CategoryData {
    name: string;
    picture: string;
    description: string;
    react_icon: string;
}

// Create an asynchronous Redux Thunk action using createAsyncThunk.
const actionCategoryStore = createAsyncThunk(
    'CATEGORY_CREATE',
    async (_, thunkAPI) => {
        // Access the current Redux state using thunkAPI.getState().
        const state = thunkAPI.getState() as RootState;

        // Construct the category data object from the Redux state.
        const categoryData: CategoryData = {
            name: state.categories.inputValueStore.name,
            picture: state.categories.inputValueStore.picture,
            description: state.categories.inputValueStore.description,
            react_icon: state.categories.inputValueStore.react_icon
        };

        try {
            // Send a POST request to create a new category using categoryData.
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}/categories`,
                categoryData,
                {
                    headers: {
                        'Authorization': `Bearer ${state.user.token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                }
            );

            // Return the data from the API response.
            return response.data;
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
            return thunkAPI.rejectWithValue({ message: 'Erreur lors de la création de la catégorie.' });
        }
    }
);

export default actionCategoryStore;
