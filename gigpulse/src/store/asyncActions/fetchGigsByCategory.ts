import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "..";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../../@types/errorResponse";

// Define the payload interface for fetching gigs by category.
interface FetchGigsByCategoryPayload {
  page: number;
  categoryId: number;
  sort?: 'average_rating' | 'created_at' | 'price';
  order?: 'desc' | 'asc';
}

// Create an asynchronous Redux Thunk action using createAsyncThunk.
const actionFetchGigsByCategory = createAsyncThunk(
  "FETCH_GIGS_BY_CATEGORY", // Action type string for Redux Toolkit
  async (payload: FetchGigsByCategoryPayload, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    // Determine the sorting and ordering criteria, with fallback to defaults.
    const sort = payload.sort || state.categoryGigs.sort || 'created_at';
    const order = payload.order || state.categoryGigs.order || 'desc';

    try {
      // Send a POST request to fetch gigs by category and page.
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/gigs/category/${payload.categoryId}?page=${payload.page}`,
        {
          filter: state.categoryGigs.selectedTags,
          sort: sort,
          order: order
        }
      );

      // Return an object with gigs data, sort criteria, order, and category ID.
      return {gigs: response.data.data, lastpage: response.data.meta.last_page, sort: sort, order: order, categoryId: payload.categoryId};
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

export default actionFetchGigsByCategory;
