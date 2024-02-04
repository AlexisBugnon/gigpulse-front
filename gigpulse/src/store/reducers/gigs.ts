import { createReducer } from "@reduxjs/toolkit";
import actionFetchSearchGigs from "../asyncActions/fetchGigs";
import { Gig } from "../../@types/gig";

// Define the shape of the Gigs state
export interface GigsState {
  Gigs: Gig[]; // Array of Gig objects
  isLoading: boolean; // Loading flag
}

// Initial state for the Gigs slice
export const initialState: GigsState = {
  Gigs: [], // Initialize Gigs array
  isLoading: false, // Initialize loading flag
};

// Create a reducer for handling Gigs-related actions
const gigsReducer = createReducer(initialState, (builder) => {
  builder
    // Handle the successful fetch of Gigs
    .addCase(actionFetchSearchGigs.fulfilled, (state, action) => {
      state.Gigs = action.payload.gigs; // Update Gigs array with fetched data
      state.isLoading = false; // Set isLoading to false as data has been loaded
    })
    // Set isLoading to true when fetching Gigs
    .addCase(actionFetchSearchGigs.pending, (state) => {
      state.isLoading = true; // Set isLoading to true when fetching data
    })
    // Handle the case where fetching Gigs fails
    .addCase(actionFetchSearchGigs.rejected, (state) => {
      state.isLoading = false; // Set isLoading to false in case of failure
    });
});

export default gigsReducer; // Export the gigsReducer
