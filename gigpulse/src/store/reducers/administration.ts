import { createReducer } from "@reduxjs/toolkit";
import { UserAuth } from "../../@types/user";
import fetchUsers from "../asyncActions/fetchUsers";
import actionFetchSearchGigs from "../asyncActions/fetchGigs";
import { updateUserRole } from "../asyncActions/updateUserRole";
import { updateUserStatus } from "../asyncActions/updateUserStatus";
import actionAdminGigUpdate from "../asyncActions/adminGigUpdate";
import { Gig } from "../../@types/gig";


export interface UserState {
  users: UserAuth[];
  gigs: Gig[];
  lastPage: number;
}
// Define the initial state
export const initialState: UserState = {
  users: [], // Initialize users as an empty array
  gigs: [], // Initialize gigs as an empty array
  lastPage: 1
};

// Create the adminReducer using createReducer from Redux Toolkit
const adminReducer = createReducer(initialState, (builder) => {
  builder
    // When fetchUsers.fulfilled action is dispatched, update the users array in the state
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload; // Set users to the payload received from the action
    })
    // When updateUserStatus.fulfilled action is dispatched, update the user's status in the state
    .addCase(updateUserStatus.fulfilled, (state, action) => {
      const { status } = action.payload; // Extract the status from the payload
      // Map over the users and update the status of the user with the matching id
      state.users = state.users.map((user) =>
        user.id === status.user.id
          ? action.payload.status.user// Update the is_active property
          : user
      );
    })
    // When updateUserRole.fulfilled action is dispatched, update the user's role in the state
    .addCase(updateUserRole.fulfilled, (state, action) => {
      const { role } = action.payload; // Extract the role from the payload
      // Map over the users and update the role of the user with the matching id
      state.users = state.users.map((user) =>
        user.id === role.user.id
          ? action.payload.role.user // Update the role property
          : user
      );
    })
    // When actionFetchSearchGigs.fulfilled action is dispatched, update the gigs array in the state
    .addCase(actionFetchSearchGigs.fulfilled, (state, action) => {
      state.gigs = action.payload.gigs; // Set gigs to the payload received from the action
      state.lastPage = action.payload.lastPage;
    })
    // When actionAdminGigUpdate.fulfilled action is dispatched, update the isActive property of the gig in the state
    .addCase(actionAdminGigUpdate.fulfilled, (state, action) => {
      const { status } = action.payload as { status: {gig: Gig }}; // Extract the status from the payload
      // Map over the gigs and update the isActive property of the gig with the matching id
      
      state.gigs = state.gigs.map((gig) =>
        gig.id === status.gig.id
          ? action.payload.status.gig // Update the isActive property
          : gig
      );
    })     
});

export default adminReducer;