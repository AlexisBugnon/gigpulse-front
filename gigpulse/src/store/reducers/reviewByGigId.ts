import { createAction, createReducer } from '@reduxjs/toolkit';
import actionfetchReviewsByGigId from '../asyncActions/fetchReviewsByGigId';
import actionReviewStore from '../asyncActions/reviewStore';
import { ReviewInterface } from '../../@types/review';
import { User } from '../../@types/gig';

// Indique l'état que doit avoir la propriété gig, qui est un tableau (Gigs[]) contenant des objets de type Gigs.
export interface ReviewState {
   reviews: ReviewInterface[];
   isLoading: boolean;
   user: User[]
   inputValueStore: {
      rating: number,
      description: string,
   },
}

// État initial de l'application
export const initialState: ReviewState = {
   reviews: [],
   isLoading: true,
   user: [],
   inputValueStore: {
      rating: 1,
      description: '',
   },
};

// Define the ActionInputValueReviewStoreForm interface for action payloads
export interface ActionInputValueReviewStoreForm {
   type: 'rating' | 'description';
   value: string | number;
}

// Create an action to update review form inputs
export const actionInputValueReviewStoreForm = createAction<ActionInputValueReviewStoreForm>('REVIEW_CREATE_INPUT');

// Create the reviewsReducer to handle review-related actions
const reviewsReducer = createReducer(initialState, (builder) => {
   builder
      // Handle successful fetch of reviews
      .addCase(actionfetchReviewsByGigId.fulfilled, (state, action) => {
         // Update the state with the fetched reviews and set isLoading to false
         state.reviews = action.payload;
         state.isLoading = false;
      })
      // Handle pending state while fetching reviews
      .addCase(actionfetchReviewsByGigId.pending, (state) => {
         // Set isLoading to true while fetching
         state.isLoading = true;
      })
      // Handle rejection when fetching reviews
      .addCase(actionfetchReviewsByGigId.rejected, (state) => {
         // Set isLoading to false in case of rejection
         state.isLoading = false;
      })
      // Handle successful submission of a new review
      .addCase(actionReviewStore.fulfilled, (state, action) => {
         // Add the new review to the beginning of the reviews array
         state.reviews.unshift(action.payload);
      })
      // Handle action to update review form inputs
      .addCase(actionInputValueReviewStoreForm, (state, action) => {
         // Update the appropriate field (rating or description) based on the payload type
         if (action.payload.type === 'rating') {
            state.inputValueStore.rating = action.payload.value as number;
         } else {
            state.inputValueStore.description = action.payload.value as string;
         }
      });
});

export default reviewsReducer;