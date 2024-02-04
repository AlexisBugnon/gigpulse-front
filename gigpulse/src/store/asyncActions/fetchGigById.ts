import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Gig } from '../../@types/gig';
import { ErrorResponse } from '../../@types/errorResponse';

// Create an asynchronous Redux Thunk action using createAsyncThunk.
const actionFetchGigById = createAsyncThunk(
  'FETCH_GIG_BY_ID', // Action type string for Redux Toolkit
  async (args: { gigId: number }, thunkAPI) => {
    const { gigId } = args;

    try {
      // Send a GET request to fetch a gig by its ID.
      const response = await axios.get<{ gig: Gig }>(
        `${import.meta.env.VITE_REACT_APP_API_URL}/gigs/${gigId}`
      );

      // Access the 'gig' property from the response if it exists.
      const gigData = response.data.gig;

      // Return the gig data to be stored in the state.
      return gigData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors.
        const axiosError = error as AxiosError<ErrorResponse>;

        if (axiosError.response) {
          // Extract the error message from the response or provide a default error message.
          return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la récupération du gig.' });
        }
      }

      // Provide a generic error message for other types of errors or unknown errors.
      return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la récupération du gig.' });
    }
  }
);

export default actionFetchGigById;
