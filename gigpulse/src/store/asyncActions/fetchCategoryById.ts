import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';

// Create an asynchronous Redux Thunk action using createAsyncThunk.
const actionFetchCategoryById = createAsyncThunk(
  'FETCH_CATEGORY_BY_ID', // Action type string for Redux Toolkit
  async (args: { categoryId: number }, thunkAPI) => {
    try {
      // Destructure categoryId from the args object.
      const { categoryId } = args;

      // Send a GET request to fetch a category by its ID.
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/categories/${categoryId}`);

      // Access the 'category' property from the response if it exists.
      const categoryData = response.data.category;

      // Return the category data to be stored in the state.
      return categoryData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors.
        const axiosError = error as AxiosError<ErrorResponse>;

        if (axiosError.response) {
          // If the response has data, extract the error message; otherwise, provide a default error message.
          return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la récupération de la catégorie.' });
        }
      }

      // For other types of errors or unknown errors, provide a generic error message.
      return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la récupération de la catégorie.' });
    }
  }
);

export default actionFetchCategoryById;
