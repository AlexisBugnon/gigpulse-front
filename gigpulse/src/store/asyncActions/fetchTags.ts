import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Tag } from '../../@types/tag'; // Make sure this path is correct
import { ErrorResponse } from '../../@types/errorResponse';

// Create an asynchronous Redux Thunk action using createAsyncThunk
const actionFetchTags = createAsyncThunk(
  'FETCH_TAGS',
  async (_, thunkAPI) => {
    try {
      // Send a GET request to fetch tags
      const response = await axios.get<{ data: Tag[] }>(
        `${import.meta.env.VITE_REACT_APP_API_URL}/tags`
      );

      // Access the 'data' property of the response, which contains tag data
      const tagData = response.data.data;

      // Return tag data to store in the state
      return tagData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        const axiosError = error as AxiosError<ErrorResponse>;

        if (axiosError.response) {
          // Extract the error message from the response or provide a default error message
          return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la récupération des tags.' });
        }
      }

      // Provide a generic error message for other types of errors or unknown errors
      return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la récupération des tags.' });
    }
  }
);

export default actionFetchTags;
