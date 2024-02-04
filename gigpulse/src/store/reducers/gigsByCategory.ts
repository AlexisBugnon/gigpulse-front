import { createAction, createReducer } from "@reduxjs/toolkit";
import actionFetchGigsByCategory from "../asyncActions/fetchGigsByCategory";
import { Gig } from "../../@types/gig";
import { Category } from "../../@types/category";

export interface GigsState {
  categoryGigs: Gig[];
  category: Category[];
  selectedTags: number[];
  isLoading: boolean;
  categoryId: number | null;
  sort: 'average_rating' | 'created_at' | 'price';
  order: 'desc' | 'asc';
  selectedSortOption: string;
  lastpage: number;
}

const initialState: GigsState = {
  categoryGigs: [],
  category: [],
  selectedTags: [],
  isLoading: false,
  categoryId: null,
  sort: 'created_at',
  order: 'desc',
  selectedSortOption: "Plus récent",
  lastpage: 1
};

const sortOptions = {
  'created_at-desc': "Plus récent",
  'created_at-asc': "Plus ancien",
  'average_rating-desc': "Mieux notés",
  'average_rating-asc': "Moins bien notés",
  'price-asc': "Moins cher",
  'price-desc': "Plus cher"
};


// Create actions to update selected tags and reset selected tags
export const actionUpdateSelectedTags = createAction<number>('UPDATE_SELECTED_TAGS');
export const actionResetSelectedTags = createAction('RESET_SELECTED_TAGS');

// Create the reducer to handle Gigs-related actions
const gigsByCategoryReducer = createReducer(initialState, (builder) => {
  builder
    // Handle the successful fetch of Gigs by category
    .addCase(actionFetchGigsByCategory.fulfilled, (state, action) => {
      const sort = action.payload.sort as 'average_rating' | 'created_at' | 'price';
      const order = action.payload.order as 'desc' | 'asc';

      state.sort = sort;
      state.order = order;
      state.selectedSortOption = sortOptions[`${sort}-${order}`];

      state.categoryGigs = action.payload.gigs;
      state.categoryId = action.payload.categoryId;
      state.lastpage = action.payload.lastpage;
      state.isLoading = false; // Set isLoading to false as data has been loaded
    })
    // Set isLoading to true when fetching Gigs by category
    .addCase(actionFetchGigsByCategory.pending, (state) => {
      state.isLoading = true; // Set isLoading to true when fetching data
    })
    // Handle the case where fetching Gigs by category fails
    .addCase(actionFetchGigsByCategory.rejected, (state) => {
      state.isLoading = false; // Set isLoading to false in case of failure
    })
    // Handle the action to update selected tags
    .addCase(actionUpdateSelectedTags, (state, action) => {
      // Check if the tag.id is in the selectedTags array
      if (state.selectedTags.includes(action.payload)) {
        // Find the index of the tag in the array
        const index = state.selectedTags.indexOf(action.payload);
        state.selectedTags.splice(index, 1); // Remove the tag from the array
      } else {
        // Add the tag to the array if not already present
        state.selectedTags.push(action.payload);
      }
    })
    // Handle the action to reset selected tags
    .addCase(actionResetSelectedTags, (state) => {
      state.selectedTags = initialState.selectedTags; // Reset selectedTags to initial state
    });
});

export default gigsByCategoryReducer; // Export the gigsByCategoryReducer