import { createAction, createReducer } from '@reduxjs/toolkit';
import actionGigStore from '../asyncActions/gigStore';

// Define the state shape
export interface GigStoreState {
   inputValueStore: {
      category: number;
      tags: number[];
      title: string;
      picture: string;
      description: string;
      price: number;
   };
}

// Define the initial state
export const initialState: GigStoreState = {
   inputValueStore: {
      category: 1,
      tags: [],
      title: '',
      picture: '',
      description: '',
      price: 0,
   },
};

// Define the action to update the form inputs
export interface ActionInputValueGigStoreForm {
   type: 'category' | 'title' | 'picture' | 'description' | 'price';
   value: string | number;
}

// Create the action to update the form inputs
export const actionInputValueGigStoreForm = createAction<ActionInputValueGigStoreForm>('GIG_CREATE_INPUT');

// Create an action to manage tags when two checkboxes are checked
export const actionInputValueTagsStoreForm = createAction<number>('GIG_ADD_TAGS');

// Create the reducer
const gigStoreReducer = createReducer(initialState, (builder) => {
   builder
      // Handle the action to update the form inputs
      .addCase(actionInputValueGigStoreForm, (state, action) => {
         // Update the inputValueStore with the payload values entered in the form inputs
         // Convert the type of price to number instead of string
         if (action.payload.type === 'category' || action.payload.type === 'price') {
            state.inputValueStore[action.payload.type] = action.payload.value as number;
         } else {
            state.inputValueStore[action.payload.type] = action.payload.value as string;
         }
      })
      // Handle the action to manage tags when two checkboxes are checked
      .addCase(actionInputValueTagsStoreForm, (state, action) => {
         // If the tag.id is in the tags array
         if (state.inputValueStore.tags.includes(action.payload)) {
            // Find the index of the tag in the array
            const index = state.inputValueStore.tags.indexOf(action.payload);
            // Remove the tag from the array
            state.inputValueStore.tags.splice(index, 1);
         } else {
            // Otherwise, add the tag to the array
            state.inputValueStore.tags.push(action.payload);
         }
      })
      // Handle the action when a gig is successfully stored
      .addCase(actionGigStore.fulfilled, (state) => {
         // Clear the tags in the inputValueStore
         state.inputValueStore = initialState.inputValueStore;
         
      })
      .addCase(actionGigStore.rejected, (state) => {
         // Clear the tags in the inputValueStore
         state.inputValueStore = initialState.inputValueStore;
         
      });
});

export default gigStoreReducer;
