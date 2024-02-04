import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '..';
import axios from 'axios';

// Create an asynchronous thunk action to fetch the user's favorite gigs
const actionFetchFavoritesGigs = createAsyncThunk(
    'FETCH_FAVORITES_GIGS', // Action name
    async (_, thunkAPI) => {
        // Get the current state from the Redux store
        const state = thunkAPI.getState() as RootState;

        // Send a GET request to the API to fetch the user's favorite gigs
        const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_API_URL}/users/${state.user.currentUser.id}/favorites`,
            {
                headers: {
                    'Authorization': `Bearer ${state.user.token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Return the user's favorite gigs data from the response
        return response.data.user.gigsFavorites;
    }
);

export default actionFetchFavoritesGigs; // Export the asynchronous thunk action
