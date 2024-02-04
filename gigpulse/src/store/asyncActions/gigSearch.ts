import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Gig } from "../../@types/gig";
import { ErrorResponse } from "../../@types/errorResponse";

// Define the structure of the payload for gig search
interface SearchPayload {
  query: string; // Search query
  page: number; // Page number for paginated results
};

interface ResponseData {
  data: Gig[];
  meta: {
    last_page: number;
  };
};

// Create an asynchronous Redux Thunk action with createAsyncThunk
const actionGigSearch = createAsyncThunk(
  "RESEARCH", // Action type for Redux Toolkit
  async (payload: SearchPayload, thunkAPI) => {
    try {
      // Send a POST request to search for gigs with the provided query and page number
      const response = await axios.post<ResponseData>(
        `${import.meta.env.VITE_REACT_APP_API_URL}/gigs/searched-gigs?page=${payload.page}`, // API URL with query and page
        {
          search: payload.query, // Include search query in the request body
        }
      );

      // Return the response data, which contains an array of 'Gig' objects
      return { gigs: response.data.data,
      lastPage: response.data.meta.last_page};
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
          // Extract the error message from the response or provide a default error message
          return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la recherche des gigs.' });
        }
      }
      // Provide a generic error message for other types of errors or unknown errors
      return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la recherche des gigs.' });
    }
  }
);

export default actionGigSearch;
