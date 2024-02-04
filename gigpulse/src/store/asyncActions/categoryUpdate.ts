import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';
import { Category } from '../../@types/category';


// Create an asynchronous Redux Thunk action using createAsyncThunk.
const actionCategoryUpdate = createAsyncThunk(
    'CATEGORY_UPDATE',
    async (payload: { categoryId: number }, thunkAPI) => {
        // Access the current Redux state using thunkAPI.getState().
        const state = thunkAPI.getState() as RootState;

        // Construct the category update data object from the Redux state.
        const categoryUpdateData: Category = {
            id: payload.categoryId,
            name: state.categories.categoriesById.name,
            picture: state.categories.categoriesById.picture,
            description: state.categories.categoriesById.description,
            react_icon: state.categories.categoriesById.react_icon,
            createdAt: state.categories.categoriesById.createdAt,
            updatedAt: state.categories.categoriesById.updatedAt
        };

        try {
            // Send a PUT request to update an existing category using categoryUpdateData.
            const response = await axios.put(
                `${import.meta.env.VITE_REACT_APP_API_URL}/categories/${categoryUpdateData.id}`,
                categoryUpdateData,
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
            return thunkAPI.rejectWithValue({ message: 'Erreur lors de la mise à jour de la catégorie.' });
        }
    }
);

export default actionCategoryUpdate;
