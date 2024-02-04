import { createReducer } from '@reduxjs/toolkit';
import actionFetchFeatured from '../asyncActions/fetchFeaturedGig';
import { Gig } from '../../@types/gig';

// Define the state shape
export interface FeatureState {
  featureGigs: Gig[];
};

// Define the initial state
export const initialState: FeatureState = {
  featureGigs: []
};

// Create the reducer
const featuredReducer = createReducer(initialState, (builder) => {
  builder
    // Add a case for handling the successful action
    .addCase(actionFetchFeatured.fulfilled, (state, action) => {
      // Update the state with the payload received from the action
      state.featureGigs = action.payload;
    });
});

export default featuredReducer;
