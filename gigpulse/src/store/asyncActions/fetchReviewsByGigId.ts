import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ReviewInterface } from '../../@types/review';
import { ErrorResponse } from '../../@types/errorResponse';

// Create an asynchronous Redux Thunk action using createAsyncThunk.
const actionfetchReviewsByGigId = createAsyncThunk(
  'FETCH_REVIEWS_BY_GIG_ID', // Action type string for Redux Toolkit
  async (payload: { gigId: number }, thunkAPI) => {
    const { gigId } = payload;

    try {
      // Send a GET request to fetch reviews by gig ID.
      const response = await axios.get<{ data: ReviewInterface[] }>(
        `${import.meta.env.VITE_REACT_APP_API_URL}/gigs/${gigId}/reviews`
      );

      // Access the 'data' property from the response, which contains the review data.
      const reviewData = response.data.data;

      // Return the review data to be stored in the state.
      return reviewData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors.
        const axiosError = error as AxiosError<ErrorResponse>;

        if (axiosError.response) {
          // Extract the error message from the response or provide a default error message.
          return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la récupération des avis.' });
        }
      }

      // Provide a generic error message for other types of errors or unknown errors.
      return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la récupération des avis.' });
    }
  }
);

export default actionfetchReviewsByGigId;
