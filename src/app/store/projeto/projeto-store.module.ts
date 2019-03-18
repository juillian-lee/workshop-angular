import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProejetoStoreService } from './projeto-store.service';
import { projetoReducer } from './projeto.reducer';
import { ProjetoEffects } from './projeto.effects';
import { ProjetoService } from './projeto.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorRequest } from 'src/app/shared/http-interceptor-request';
import { STATE_NAME } from './projeto.state';


@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature(STATE_NAME, projetoReducer),
        EffectsModule.forFeature([ProjetoEffects]),
        StoreModule,
        EffectsModule
    ],
    exports: [

    ],
    providers: [
        ProejetoStoreService,
        ProjetoService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorRequest, multi: true },
    ]
})
export class ProjetoStoreModule { }
