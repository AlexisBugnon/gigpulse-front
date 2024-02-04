import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Category } from '../../@types/category';
import { ErrorResponse } from '../../@types/errorResponse';

// Create an asynchronous Redux Thunk action using createAsyncThunk.
const actionFetchCategories = createAsyncThunk(
  'FETCH_CATEGORIES',
  async (_, thunkAPI) => {
    try {
      // Send a GET request to fetch categories from the API.
      const response = await axios.get<{ data: Category[] }>(
        `${import.meta.env.VITE_REACT_APP_API_URL}/categories`,
      );

      // Return the 'data' property of the API response.
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors.
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
          // If the response has data, extract the error message; otherwise, provide a default error message.
          return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la récupération des catégories.' });
        }
      }
      // For other types of errors, provide a generic error message.
      return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la récupération des catégories.' });
    }
  }
);

export default actionFetchCategories;
