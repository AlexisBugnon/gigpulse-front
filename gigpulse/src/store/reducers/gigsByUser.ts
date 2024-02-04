import { createReducer } from '@reduxjs/toolkit';
import actionFetchGigsByUser from '../asyncActions/fetchGigsByUser';
import { Gig, User } from '../../@types/gig';

// Define the state shape
export interface GigsState {
   gigs: Gig[];
   user: User[];
   isLoading: boolean;
}

// Define the initial state
export const initialState: GigsState = {
   gigs: [],
   user: [],
   isLoading: false,
};

// Create the reducer
const gigsReducer = createReducer(initialState, (builder) => {
   builder
      // Add a case for handling the successful action
      .addCase(actionFetchGigsByUser.fulfilled, (state, action) => {
         // Update the state with the payload received from the action
         state.gigs = action.payload;
         state.isLoading = false;
      })
      // Add a case for handling the pending action
      .addCase(actionFetchGigsByUser.pending, (state) => {
         // Set isLoading to true while the action is pending
         state.isLoading = true;
      })
      // Add a case for handling the rejected action
      .addCase(actionFetchGigsByUser.rejected, (state) => {
         // Set isLoading to false in case of rejection
         state.isLoading = false;
      })
      
});

export default gigsReducer;
