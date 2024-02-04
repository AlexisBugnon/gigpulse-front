import { createAction, createReducer } from '@reduxjs/toolkit';
import actionFetchGigById from '../asyncActions/fetchGigById';
import actionGigDestroy from '../asyncActions/gigDestroy';
import { Gig } from '../../@types/gig';
import actionGigUpdate from '../asyncActions/gigUpdate';
// Indique l'état que doit avoir la propriété gig, qui est un tableau (Gigs[]) contenant des objets de type Gigs.
export interface GigsState {
   gig: Gig;
   isLoading: boolean;
   gigUpdate: Gig;
   message: string | null;
   tagsId: number[];
}
// État initial de l'application
export const initialState: GigsState = {
   gig: {
      id: 0,
      userId: 0,
      categoryId: 0,
      title: '',
      picture: '',
      description: '',
      price: 0,
      averageRating: 0,
      isActive: true,
      createdAt: '',
      updatedAt: '',
      inputValueStore: [],
      tags: {
         ids: [],
         name: [],
      },
      slug: '',
      category: '',
      numberOfReviews: 0,
      user: {
         id: 0,
         name: '',
         profilePicture: '',
         job: '',
         description: '',
         numberOfGigs: 0,
         createdAt: '',
         email: ','
      }
   },
   isLoading: true,
   gigUpdate: {
      id: 0,
      userId: 0,
      categoryId: 0,
      title: '',
      picture: '',
      description: '',
      price: 0,
      averageRating: 0,
      isActive: true,
      createdAt: '',
      updatedAt: '',
      inputValueStore: [],
      tags: {
         ids: [],
         name: [],
      },
      slug: '',
      category: '',
      numberOfReviews: 0,
      user: {
         id: 0,
         name: '',
         profilePicture: '',
         job: '',
         description: '',
         createdAt: '',
         numberOfGigs: 0,
         email: '',
      }
   },
   tagsId: [],
   message: null,
};
// Type definition for the payload of Gig update form
export interface ActionInputValueGigUpdateForm {
   type: 'categoryId' | 'title' | 'picture' | 'description' | 'price' | 'isActive';
   value: string | number | boolean;
}
// Create an action to update the Gig form input values
export const actionInputValueGigUpdateForm = createAction<ActionInputValueGigUpdateForm>('GIG_UPDATE_INPUT');
// Create an action to set a message
export const setMessage = createAction<string>('SET_MESSAGE');
// Create an action to manage tags when two checkboxes are checked
export const actionInputValueTagsUpdateForm = createAction<number>('GIG_ADD_TAGS');
// Define the gigReducer
const gigReducer = createReducer(initialState, (builder) => {
   builder
      // Handle the successful fetch of a single gig by ID
      .addCase(actionFetchGigById.fulfilled, (state, action) => {
         state.gig = action.payload;
         state.gigUpdate = action.payload;
         state.isLoading = false;
      })
      // Set isLoading to true when fetching a gig
      .addCase(actionFetchGigById.pending, (state) => {
         state.isLoading = true;
      })
      // Handle the case where fetching a gig fails
      .addCase(actionFetchGigById.rejected, () => {
         // Handle rejection if needed
      })
      // Update input values during gig update
      .addCase(actionInputValueGigUpdateForm, (state, action) => {
         // Update inputValueStore with the payloads (values entered in form inputs)
         if (action.payload.type === 'categoryId' || action.payload.type === 'price') {
            state.gigUpdate[action.payload.type] = action.payload.value as number;
         } else if(action.payload.type === 'isActive'){
            state.gigUpdate[action.payload.type] = action.payload.value as boolean;
         }
          else {
            state.gigUpdate[action.payload.type] = action.payload.value as string;
         }
      })
      // Manage tags when checkboxes are checked/unchecked
      .addCase(actionInputValueTagsUpdateForm, (state, action) => {
         if (state.gigUpdate.tags.ids.includes(action.payload)) {
            const index = state.gigUpdate.tags.ids.indexOf(action.payload);
            state.gigUpdate.tags.ids.splice(index, 1);
         } else {
            state.gigUpdate.tags.ids.push(action.payload);
         }
      })
      // Handle successful gig update
      .addCase(actionGigUpdate.fulfilled, (state) => {
         state.tagsId = initialState.tagsId;
      })
      // Handle successful gig deletion
      .addCase(actionGigDestroy.fulfilled, (state) => {
         state.message = 'Le gig a été supprimé avec succès.';
      })
      // Set a custom message
      .addCase(setMessage, (state, action) => {
         state.message = action.payload;
      });
});
export default gigReducer;