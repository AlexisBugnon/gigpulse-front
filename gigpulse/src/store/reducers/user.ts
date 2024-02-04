import { createAction, createReducer } from '@reduxjs/toolkit';
import { UserAuth } from '../../@types/user';
import actionLoginUser from '../asyncActions/loginUser';
import actionLogoutUser from '../asyncActions/logoutUser';
import { removeTokenFromLocalStorage, setTokenToLocalStorage } from '../../localStorage/localStorage';
import actionCheckValidityToken from '../asyncActions/checkValidityToken';
import actionUpdateFavoriteGigs from '../asyncActions/updateFavoriteGigs';
import actionFetchFavoritesGigs from '../asyncActions/fetchFavoritesGigs';
import { ErrorResponse } from '../../@types/errorResponse';

export interface UserState {
    currentUser: UserAuth;
    logged: boolean;
    token: string;
    login: {
        email: string;
        password: string;
    };
    message: {
        type: 'success' | 'error';
        content: string;
    };
}

interface ActionInputsLoginForm {
    type: 'email' | 'password';
    value: string;
}

// Type definition for the payload of account update
export interface ActionInputsAccounForm {
    type: 'profilePicture' | 'name' | 'email' | 'password' | 'job' | 'description';
    value: string;
}

export const initialState: UserState = {
    currentUser: {
        id: 0,
        name: '',
        email: '',
        password: '',
        profilePicture: '',
        description: '',
        job: '',
        role: '',
        isActive: true,
        numberOfGigs: null,
        createdAt: '',
        gigsFavorites: [],
        gigsObjectFavorites: [],
    },
    logged: false,
    token: '',
    login: {
        email: '',
        password: '',
    },
    message: {
        type: 'error',
        content: ''
    }
};

// Create an action to update the login form inputs
export const actionUpdateInputsLoginForm = createAction<ActionInputsLoginForm>('UPDATE_INPUT_LOGIN_FORM');
export const actionUpdateInputsAccountForm = createAction<ActionInputsAccounForm>('UPDATE_INPUT_ACCOUNT_FORM');
export const actionResetMessageLogin = createAction('RESET_MESSAGE_LOGIN');

// Create the userReducer to handle user-related actions
const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(actionLoginUser.fulfilled, (state, action) => {
            // if the token is succesfully retrived from the back-end then consider the user logged
            if (action.payload.access_token !== '') {
                state.message = {type: 'success', content: 'Connexion réussie !'};
                state.logged = true;
                state.currentUser = { ...action.payload.user };
                state.token = action.payload.token;
                setTokenToLocalStorage(action.payload.token, state.currentUser.name);
            }
            state.login = initialState.login;
        })
        .addCase(actionLoginUser.rejected, (state, action) => {
            const { message } = action.payload as ErrorResponse;
            state.message = {type: 'error', content: message};
        })
        // Handle user logout
        .addCase(actionLogoutUser.fulfilled, (state) => {
            // if fulfilled, logout the user and reset user state
            state.logged = false;
            state.currentUser = initialState.currentUser;
            removeTokenFromLocalStorage();
        })
        // Handle checking the validity of the user's token
        .addCase(actionCheckValidityToken.fulfilled, (state, action) => {
            // if the token is succesfully checked from the back-end then get the user infos
            if (action.payload.access_token !== '') {
                state.logged = true;
                state.currentUser = { ...action.payload.user };
                state.token = action.payload.token;
            }
        })
        // Handle updating the user's favorite gigs
        .addCase(actionUpdateFavoriteGigs.fulfilled, (state, action) => {
            state.currentUser.gigsFavorites = action.payload.gigsFavorites;

        })
        // Handle fetching the user's favorite gigs
        .addCase(actionFetchFavoritesGigs.fulfilled, (state, action) => {
            state.currentUser.gigsObjectFavorites = action.payload;
        })
        .addCase(actionUpdateInputsLoginForm, (state, action) => {
            // update in real time the state matching the login form
            if (!state.logged) {
                state.login[action.payload.type] = action.payload.value;
            }
        })
        // Update input values during account update
        .addCase(actionUpdateInputsAccountForm, (state, action) => {
            if (state.currentUser) {
                state.currentUser[action.payload.type] = action.payload.value;
            }
        })
        .addCase(actionResetMessageLogin, (state) => {
            // update in real time the state matching the login form
            state.message = initialState.message;
        });
});

export default userReducer;
