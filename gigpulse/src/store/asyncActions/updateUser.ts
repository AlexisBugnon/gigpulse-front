import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/errorResponse';

// Create an asynchronous Redux Thunk action with createAsyncThunk
export const updateUser = createAsyncThunk(
    'user/update', // Action type for Redux Toolkit
    async (userId: number, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;

        
        try {
            // Send a PUT request to update user data based on provided userData
            const response = await axios.put(
                `${import.meta.env.VITE_REACT_APP_API_URL}/users/${userId}`,
                {
                    id: state.user.currentUser.id,
                    profile_picture: state.user.currentUser.profilePicture,
                    name: state.user.currentUser.name,
                    email: state.user.currentUser.email,
                    password: state.user.currentUser.password,
                    job : state.user.currentUser.job,
                    description: state.user.currentUser.description,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${state.user.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    // Extract the error message from the response or provide a default error message
                    return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la mise à jour de l\'utilisateur.' });
                }
            }
            // Provide a generic error message for other types of errors or unknown errors
            return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la mise à jour de l\'utilisateur.' });
        }
    }
);

export default updateUser;