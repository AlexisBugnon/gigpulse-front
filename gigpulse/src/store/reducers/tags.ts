import { createAction, createReducer } from "@reduxjs/toolkit";
import actionFetchTags from "../asyncActions/fetchTags";
import { Tag } from "../../@types/tag";
import actionFetchTagById from "../asyncActions/fetchTagById";
import actionTagStore from "../asyncActions/tagStore";

export interface TagState {
  tags: Tag[];
  tag: Tag;
  isLoading: boolean;
  inputValueStore: {
    name: string;
  };
}

export const initialState: TagState = {
  tags: [],
  tag: {
    id: 0,
    name: '',
    createdAt: '',
    updatedAt: '',
  },
  isLoading: true,
  inputValueStore: {
    name: '',
  },
};

// Define the ActionInputValueTagForm interface for action payloads
export interface ActionInputValueTagForm {
  type: 'name';
  value: string;
}

// Create an action to update the tag form inputs when creating a tag
export const actionInputValueTagStoreForm = createAction<ActionInputValueTagForm>('TAG_CREATE_INPUT');

// Create an action to update the tag form inputs when updating a tag
export const actionInputValueTagUpdateForm = createAction<ActionInputValueTagForm>('TAG_UPDATE_INPUT');

// Create the tagsReducer to handle tag-related actions
const tagsReducer = createReducer(initialState, (builder) => {
  builder
    // Handle successful fetch of tags
    .addCase(actionFetchTags.fulfilled, (state, action) => {
      // Update the state with the fetched tags and set isLoading to false
      state.tags = action.payload;
      state.isLoading = false;
    })
    // Handle pending state while fetching tags
    .addCase(actionFetchTags.pending, (state) => {
      // Set isLoading to true while fetching
      state.isLoading = true;
    })
    // Handle rejection when fetching tags
    .addCase(actionFetchTags.rejected, (state) => {
      // Set isLoading to false in case of rejection
      state.isLoading = false;
    })
    // Handle successful fetch of a tag by ID
    .addCase(actionFetchTagById.fulfilled, (state, action) => {
      // Update the state with the fetched tag by ID and set isLoading to false
      state.tag = action.payload;
      state.isLoading = false;
    })
    // Handle pending state while fetching a tag by ID
    .addCase(actionFetchTagById.pending, (state) => {
      // Set isLoading to true while fetching
      state.isLoading = true;
    })
    // Handle rejection when fetching a tag by ID
    .addCase(actionFetchTagById.rejected, (state) => {
      // Set isLoading to false in case of rejection
      state.isLoading = false;
    })
    // Handle action to update tag form inputs when creating a tag
    .addCase(actionInputValueTagStoreForm, (state, action) => {
      // Update the name field in inputValueStore with the payload value
      state.inputValueStore.name = action.payload.value;
    })
    .addCase(actionTagStore.fulfilled, (state) =>{
      state.inputValueStore = initialState.inputValueStore;
    })
    // Handle action to update tag form inputs when updating a tag
    .addCase(actionInputValueTagUpdateForm, (state, action) => {
      // Update the name field in the tag with the payload value
      state.tag.name = action.payload.value;
    });
});

export default tagsReducer;