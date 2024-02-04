import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "..";
import { UserAuth } from "../../@types/user";
import { ErrorResponse } from "../../@types/errorResponse";

// Create an asynchronous Redux Thunk action with createAsyncThunk
export const fetchUsers = createAsyncThunk(
    'user/fetch', // Action type for Redux Toolkit
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as RootState; // Get the global state

        try {
            // Send a GET request to fetch users
            const response = await axios.get<{ data: UserAuth[] }>(
                `${import.meta.env.VITE_REACT_APP_API_URL}/users`, // API URL
                {
                    headers: {
                        'Authorization': `Bearer ${state.user.token}`, // Add an authorization header with the user token
                        'Content-Type': 'application/json', // Specify JSON content type
                    },
                }
            );

            return response.data.data; // Return user data to store it in the state
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;

                if (axiosError.response) {
                    // Extract the error message from the response or provide a default error message
                    return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la récupération des utilisateurs.' });
                }
            }

            // Provide a generic error message for other types of errors or unknown errors
            return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la récupération des utilisateurs.' });
        }
    }
);

export default fetchUsers;
