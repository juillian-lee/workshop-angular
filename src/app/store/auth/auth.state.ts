import { Jwt } from './auth';

export const STATE_NAME = 'auth';

export interface AuthState {
    isLoading: boolean;
    jwt: Jwt;
    isLoggedIn: boolean,
    error: string
}

export const initialState: AuthState = {
    isLoading: false,
    jwt: null,
    isLoggedIn: false,
    error: null
}

export const selectIsLoading = (state: AuthState) => state.isLoading;
export const selectJwt = (state: AuthState) => state.jwt;
export const isLoggedIn = (state: AuthState) => state.isLoggedIn;
export const error = (state: AuthState) => state.error;
