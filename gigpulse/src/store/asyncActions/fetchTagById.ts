import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Tag } from '../../@types/tag';
import { ErrorResponse } from '../../@types/errorResponse';

// Create an asynchronous Redux Thunk action using createAsyncThunk.
const actionFetchTagById = createAsyncThunk(
  'FETCH_TAG_BY_ID', // Action type string for Redux Toolkit
  async (args: { tagId: number }, thunkAPI) => {
    const { tagId } = args;

    try {
      // Send a GET request to fetch a tag by its ID.
      const response = await axios.get<{ tag: Tag }>(
        `${import.meta.env.VITE_REACT_APP_API_URL}/tags/${tagId}`
      );

      // Access the 'tag' property from the response if it exists.
      const tagData = response.data.tag;

      // Return the tag data to be stored in the state.
      return tagData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors.
        const axiosError = error as AxiosError<ErrorResponse>;

        if (axiosError.response) {
          // Extract the error message from the response or provide a default error message.
          return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la récupération du tag.' });
        }
      }

      // Provide a generic error message for other types of errors or unknown errors.
      return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la récupération du tag.' });
    }
  }
);

export default actionFetchTagById;
