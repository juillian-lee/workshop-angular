import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { authReducer } from './auth.reducer';
import { AuthStoreService } from './auth-store.service';
import { AuthService } from './auth.service';
import { AuthEffects } from './auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { STATE_NAME } from './auth.state';


@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature(STATE_NAME, authReducer),
        EffectsModule.forFeature([AuthEffects]),
        HttpClientModule
    ],
    exports: [
        StoreModule,
        EffectsModule
    ],
    providers: [
        AuthStoreService,
        AuthService,
    ]
})
export class AuthStoreModule { }
