import { Action } from '@ngrx/store';
import { Jwt } from './auth';


export enum AuthActions {
    SIGN_IN = '[AUTH] - Sign in -',
    SIGN_IN_SUCCESS = '[AUTH] - Sign in success -',
    CHECK_SIGIN_IN = '[AUTH] - Check user localStorage -',
    SIGN_IN_ERROR = '[AUTH] - Sign In Error -',
    LOGOUT = '[AUTH] - Logout -',
    LOGOUT_SUCCESS = '[AUTH] - Logout Success -'
}

interface SignPayload {
    email: string,
    password: string
}

/**
{
    type: '[AUTH] - Sign in -',
    payload: {
        email: 'xxx',
        password: 'xxx'
    }
} 
 */
export class SignInAction implements Action {
    readonly type = AuthActions.SIGN_IN;
    payload: SignPayload;

    constructor(payload: SignPayload) {
        this.payload = payload;
    }
}


export class SignSuccessAction implements Action {
    readonly type = AuthActions.SIGN_IN_SUCCESS;
    payload: Jwt;

    constructor(payload) {
        this.payload = payload;
    }
}

export class CheckSiginInAction implements Action {
    readonly type = AuthActions.CHECK_SIGIN_IN;
}

export class SignInErrorAction implements Action {
    readonly type = AuthActions.SIGN_IN_ERROR;
    payload: string;
    constructor(payload: string) {
        this.payload = payload;
    }
}

export class LogoutAction implements Action {
    readonly type = AuthActions.LOGOUT
}

export class LogoutSuccessAction implements Action {
    readonly type = AuthActions.LOGOUT_SUCCESS;
}


export type AuthAction = 
    | SignInAction
    | SignSuccessAction
    | CheckSiginInAction
    | SignInErrorAction
    | LogoutAction
    | LogoutSuccessAction

