import { createAction, createReducer } from "@reduxjs/toolkit";
import actionFetchCategories from "../asyncActions/fetchCategories";
import { Category } from "../../@types/category";
import actionCategoryStore from "../asyncActions/categoryStore ";
import actionCategoryDestroy from "../asyncActions/categoryDestroy";
import actionFetchCategoryById from "../asyncActions/fetchCategoryById";

export interface CategoryState {
  categories: Category[];
  categoriesById: Category;
  isLoading: boolean;
  inputValueStore: {
    name: string,
    picture: string,
    description: string,
    react_icon: string,
  },
}
export const initialState: CategoryState = {
  categories: [],
  categoriesById: {
    id: 0,
    name: '',
    picture: '',
    description: '',
    slug: '',
    react_icon: '',
    createdAt: '',
    updatedAt: '',
  },
  isLoading: true,
  inputValueStore: {
    name: '',
    picture: '',
    description: '',
    react_icon: '',
  },
};

// Type definition for the payload of category creation
export interface ActionInputValueCategoryStoreForm {
  type: 'name' | 'picture' | 'description' | 'react_icon';
  value: string;
}

// Type definition for the payload of category update
export interface ActionInputValueCategoryUpdateForm {
  type: 'name' | 'picture' | 'description' | 'react_icon';
  value: string;
}

// Create actions for updating input values during category creation and update
export const actionInputValueCategoryStoreForm = createAction<ActionInputValueCategoryStoreForm>('CATEGORY_CREATE_INPUT');
export const actionInputValueCategoryUpdateForm = createAction<ActionInputValueCategoryUpdateForm>('CATEGORY_UPDATE_INPUT');

// Define the categories reducer
const categoriesReducer = createReducer(initialState, (builder) => {
  builder
    // Handle the successful fetch of categories
    .addCase(actionFetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    })
    // Set isLoading to true when categories are being fetched
    .addCase(actionFetchCategories.pending, (state) => {
      state.isLoading = true;
    })
    // Set isLoading to false when categories fetching fails
    .addCase(actionFetchCategories.rejected, (state) => {
      state.isLoading = false;
    })
    // Update input values during category creation
    .addCase(actionInputValueCategoryStoreForm, (state, action) => {
      
      state.inputValueStore[action.payload.type] = action.payload.value;
    })
    // Handle successful category creation
    .addCase(actionCategoryStore.fulfilled, (state, action) => {
      state.categories.push(action.payload);
      state.inputValueStore = initialState.inputValueStore; // Reset input values
    })
    .addCase(actionCategoryStore.rejected, (state) => {
      state.inputValueStore = initialState.inputValueStore; // Reset input values
    })
    // Handle successful category deletion
    .addCase(actionCategoryDestroy.fulfilled, (state, action) => {
      state.categories = state.categories.filter(category => category.id !== action.payload);
    })
    // Handle successful fetch of a single category by ID
    .addCase(actionFetchCategoryById.fulfilled, (state, action) => {
      state.categoriesById = action.payload;
    })
    // Update input values during category update
    .addCase(actionInputValueCategoryUpdateForm, (state, action) => {
      if (state.categoriesById) {
        state.categoriesById[action.payload.type] = action.payload.value;
      }
    });
});

export default categoriesReducer;