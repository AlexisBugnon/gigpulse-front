import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';
import { Gig } from '../../@types/gig';

// Create an asynchronous Redux Thunk action using createAsyncThunk.
const actionFetchFeatured = createAsyncThunk(
  'FETCH_FEATURED', // Action type string for Redux Toolkit
  async (_, thunkAPI) => {
    try {
      // Send a GET request to fetch featured gigs.
      const response = await axios.get<{ data: Gig[] }>(
        `${import.meta.env.VITE_REACT_APP_API_URL}/gigs/featured-gigs`,
      );

      // Access the 'data' property of the API response.
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors.
        const axiosError = error as AxiosError<ErrorResponse>;

        if (axiosError.response) {
          // Extract the error message from the response or provide a default error message.
          return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la récupération des gigs en vedette.' });
        }
      }

      // Provide a generic error message for other types of errors or unknown errors.
      return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la récupération des gigs en vedette.' });
    }
  }
);

export default actionFetchFeatured;
