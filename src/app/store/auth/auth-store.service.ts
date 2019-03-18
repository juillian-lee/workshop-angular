import { Injectable } from "@angular/core";
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import * as state from './auth.state';
import * as authActions from './auth.actions';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';


@Injectable()
export class AuthStoreService {
    private authState = createFeatureSelector<state.AuthState>(state.STATE_NAME);
    
    private isLoading = createSelector(
        this.authState,
        state.selectIsLoading
    );

    /**
        private jwt = createSelector(
            this.authState,
            (state: state.AuthState) => state.jwt
        );
    */
    private jwt = createSelector(
        this.authState,
        state.selectJwt
    );

    private isLoggedIn = createSelector(
        this.authState,
        state.isLoggedIn
    );

    private error = createSelector(
        this.authState,
        state.error
    );

    constructor(private store: Store<AppState>) {}


    /**
     getToken() {
        return this.store.select(createSelector(
            this.authState,
            (state: state.AuthState) => state.jwt
        ));
      }
     */
    getToken() {
        return this.store.select(this.jwt);
    }

    getIsLoading() {
        return this.store.select(this.isLoading);
    }

    getIsLoggedIn() {
        return this.store.select(this.isLoggedIn);
    }

    getError() {
        return this.store.select(this.error).pipe(
            filter(err => err != null)
        );
    }


    dispatchSignInAction(email: string, password: string) {
        return this.store.dispatch(new authActions.SignInAction({
            email,
            password
        }));
    }

    dispatchCheckSigninAction() {
        this.store.dispatch(new authActions.CheckSiginInAction());
    }

    dispatchLogoutAction() {
        this.store.dispatch(new authActions.LogoutAction());
    }

}