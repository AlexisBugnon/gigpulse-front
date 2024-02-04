import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';
import { Gig } from '../../@types/gig';

// Create an asynchronous Redux Thunk action using createAsyncThunk.
const actionFetchGigsByUser = createAsyncThunk(
  'FETCH_GIGS_BY_USER', // Action type string for Redux Toolkit
  async (payload: { userId: number }, thunkAPI) => {
    const { userId } = payload;

    try {
      // Send a GET request to fetch gigs by user using the provided userId.
      const response = await axios.get<{ data: Gig[] }>(
        `${import.meta.env.VITE_REACT_APP_API_URL}/gigs/user/${userId}`
      );

      // Return the response data directly, which is an array of 'Gig' objects.
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors.
        const axiosError = error as AxiosError<ErrorResponse>;

        if (axiosError.response) {
          // Extract the error message from the response or provide a default error message.
          return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la récupération des gigs de l\'utilisateur.' });
        }
      }

      // Provide a generic error message for other types of errors or unknown errors.
      return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la récupération des gigs de l\'utilisateur.' });
    }
  }
);

export default actionFetchGigsByUser;
