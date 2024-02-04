import { createAction, createReducer } from '@reduxjs/toolkit';

// Define actions to toggle, open, and close the sidebar
export const toggleSidebar = createAction('sidebar/toggle');
export const openSidebar = createAction('sidebar/open');
export const closeSidebar = createAction('sidebar/close');

// Define the initial state for the sidebar
const initialState = {
    isOpen: false,
};

// Create the reducer to manage the sidebar state
const sidebarReducer = createReducer(initialState, (builder) => {
    builder
        // Handle the toggleSidebar action to toggle the isOpen state
        .addCase(toggleSidebar, (state) => {
            state.isOpen = !state.isOpen; // Toggle the isOpen state
        })
        // Handle the openSidebar action to set isOpen to true
        .addCase(openSidebar, (state) => {
            state.isOpen = true; // Set isOpen to true
        })
        // Handle the closeSidebar action to set isOpen to false
        .addCase(closeSidebar, (state) => {
            state.isOpen = false; // Set isOpen to false
        });
});

export default sidebarReducer;
