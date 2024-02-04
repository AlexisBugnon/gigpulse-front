import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '..';
import { ErrorResponse } from '../../@types/errorResponse';

interface UserRoleUpdateData {
  userId: number;
  newRole: string;
}


// Create an asynchronous Redux Thunk action with createAsyncThunk
export const updateUserRole = createAsyncThunk(
  'user/updateRole', // Action type for Redux Toolkit
  async (userData: UserRoleUpdateData, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    try {
      // Send a PUT request to update the user's role based on provided userData
      const roleResponse = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_URL}/users/${userData.userId}`,
        {
          role: userData.newRole,
        },
        {
          headers: {
            'Authorization': `Bearer ${state.user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return {
        role: roleResponse.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
          // Extract the error message from the response or provide a default error message
          return thunkAPI.rejectWithValue({ message: axiosError.response.data.message || 'Erreur lors de la mise à jour du rôle de l\'utilisateur.' });
        }
      }
      // Provide a generic error message for other types of errors or unknown errors
      return thunkAPI.rejectWithValue({ message: 'Erreur inconnue lors de la mise à jour du rôle de l\'utilisateur.' });
    }
  }
);

export default updateUserRole;
