import { createReducer } from "@reduxjs/toolkit";
import actionGigSearch from "../asyncActions/gigSearch";
import { Gig } from "../../@types/gig";

// Define the state shape
export interface GigsState {
  gigs: Gig[];
  isLoading: boolean;
  lastPage: number;
}

// Define the initial state
export const initialState: GigsState = {
  gigs: [],
  isLoading: false,
  lastPage: 1
};

// Create the reducer
const gigSearchReducer = createReducer(initialState, (builder) => {
  builder
    // Add a case for handling the successful action
    .addCase(actionGigSearch.fulfilled, (state, action) => {
      // Update the state with the gigs received in the payload
      state.gigs = action.payload.gigs;
      state.isLoading = false;
      state.lastPage = action.payload.lastPage;
    })
    // Add a case for handling the pending action
    .addCase(actionGigSearch.pending, (state) => {
      // Set isLoading to true while the action is pending
      state.isLoading = true;
    })
    // Add a case for handling the rejected action
    .addCase(actionGigSearch.rejected, (state) => {
      // Set isLoading to false in case of rejection
      state.isLoading = false;
    });
});

export default gigSearchReducer;
