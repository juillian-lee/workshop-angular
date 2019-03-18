import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as authActions from './auth.actions';
import { map, mergeMap, catchError, tap, filter } from 'rxjs/operators';
import { Jwt } from './auth';
import { of, interval } from 'rxjs';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService
    ){}

    @Effect()
    signInAction$ = this.actions$.pipe(
        ofType<authActions.SignInAction>(authActions.AuthActions.SIGN_IN),
        map(action => action.payload),
        mergeMap(payload => {
            return this.authService.signIn(payload.email, payload.password).pipe(
                map((response) : Jwt => {
                    return {
                        accessToken: response.access_token,
                        refreshToken: response.refresh_token
                    }
                }),
                tap(jwt => {
                    localStorage.setItem("jwt", JSON.stringify(jwt));
                }),
                map(jwt => {
                    return new authActions.SignSuccessAction(jwt);
                }),
                catchError(err => {
                    // Swal.fire('Opss...', 'Não foi possível realizar o login...', 'error');
                    // return empty();
                    if(err.status === 400) {
                        return of(new authActions.SignInErrorAction('Formulario inválido'));
                    }

                    if(err.status === 401) {
                        return of(new authActions.SignInErrorAction('Usuário ou senha inválido'));
                    }

                    return of(new authActions.SignInErrorAction('Não foi possível realizar o login...'));
                    
                })
            )
        })
    )
    
    @Effect()
    checkSignInAction$ = this.actions$.pipe(
        ofType<authActions.AuthAction>(authActions.AuthActions.CHECK_SIGIN_IN),
        map(_ => {
            try {
                return JSON.parse(localStorage.getItem("jwt"));

            } catch(ex) {
                return null;
            }
        }),
        filter(jwt => jwt != null),
        map(jwt => {
            return new authActions.SignSuccessAction(jwt);
        })
    )

    @Effect()
    logoutAction$ = this.actions$.pipe(
        ofType<authActions.LogoutAction>(authActions.AuthActions.LOGOUT),
        map(_ => {
            localStorage.clear();
            return new authActions.LogoutSuccessAction();
        })
    )
}