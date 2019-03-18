import * as authActions from './auth.actions';
import * as authState from './auth.state';

export function authReducer(
    state: authState.AuthState = authState.initialState,
    action: authActions.AuthAction
): authState.AuthState {
    
    switch (action.type) {
        case authActions.AuthActions.SIGN_IN:
            return {
                ...state,
                isLoading: true,
                jwt: null,
                isLoggedIn: false,
                error: null
            }
        case authActions.AuthActions.SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload,
                isLoggedIn: true
            }
        case authActions.AuthActions.SIGN_IN_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case authActions.AuthActions.LOGOUT_SUCCESS:
            return {
                ...authState.initialState
            }
        default:
            return state;
    }
}