import { createAction, createReducer } from '@reduxjs/toolkit';

// Define actions to toggle, open, and close the navbar
export const toggleNavbar = createAction('navbar/toggle');
export const openNavbar = createAction('navbar/open');
export const closeNavbar = createAction('navbar/close');

// Define the initial state for the navbar
const initialState = {
    isOpen: false,
};

// Create the reducer to manage the navbar state
const navbarReducer = createReducer(initialState, (builder) => {
    builder
        // Handle the toggleNavbar action to toggle the isOpen state
        .addCase(toggleNavbar, (state) => {
            state.isOpen = !state.isOpen; // Toggle the isOpen state
        })
        // Handle the openNavbar action to set isOpen to true
        .addCase(openNavbar, (state) => {
            state.isOpen = true; // Set isOpen to true
        })
        // Handle the closeNavbar action to set isOpen to false
        .addCase(closeNavbar, (state) => {
            state.isOpen = false; // Set isOpen to false
        });
});

export default navbarReducer;
