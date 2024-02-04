import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';
import { Gig } from '../../@types/gig';

// Define the structure of the API response for paginated data.
interface PaginatedResponse {
  data: Gig[];
  meta: {
    last_page: number;
  }
}

// Create an asynchronous Redux Thunk action using createAsyncThunk.
const actionFetchSearchGigs = createAsyncThunk(
  'FETCH_GIGS', // Action type string for Redux Toolkit
  async (currentPage: number, thunkAPI) => {
    try {
      // Send a GET request to fetch gigs for the specified page.
      const response = await axios.get<PaginatedResponse>(
        `${import.meta.env.VITE_REACT_APP_API_URL}/gigs?page=${currentPage}`
      );

      // Return the 'data' property of the API response (list of Gigs).
      return {gigs: response.data.data, lastPage: response.data.meta.last_page};
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors.
        const axiosError = error as AxiosError<ErrorResponse>;

        if (axiosError.response) {
          // Extract the error message from the response or provide a default error message.
          return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la récupération des gigs.' });
        }
      }

      // Provide a generic error message for other types of errors or unknown errors.
      return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la récupération des gigs.' });
    }
  }
);

export default actionFetchSearchGigs;
