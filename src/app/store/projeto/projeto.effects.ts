import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { mergeMap, map, filter, switchMap } from 'rxjs/operators';

import * as projetoActions from './projeto.actions';
import { ProjetoService } from './projeto.service';

@Injectable()
export class ProjetoEffects {

    constructor(
        private actions$: Actions,
        private projetoService: ProjetoService
    ) { }

    @Effect()
    createProjetoAction$ = this.actions$.pipe(
        ofType<projetoActions.CreateUpdateProjetoAction>(projetoActions.ProjetoActions.CREATE_UPDATE_PROJETO),
        map(action => action.payload),
        filter(projeto => !projeto.id),
        mergeMap(projeto => {
            return this.projetoService.create(projeto).pipe(
                map(_ => {
                    return new projetoActions.CreateUpdateProjetoSuccessAction();
                })
            );
        })
    )

    @Effect()
    updateProjetoAction$ = this.actions$.pipe(
        ofType<projetoActions.CreateUpdateProjetoAction>(projetoActions.ProjetoActions.CREATE_UPDATE_PROJETO),
        map(action => action.payload),
        filter(projeto => !!projeto.id),
        mergeMap(projeto => {
            return this.projetoService.update(projeto).pipe(
                map(_ => {
                    return new projetoActions.CreateUpdateProjetoSuccessAction();
                })
            );
        })
    )

    @Effect()
    listProjetoAction$ = this.actions$.pipe(
        ofType<projetoActions.ListProjetoAction>(projetoActions.ProjetoActions.LIST_PROJETO),
        mergeMap(action => {
            return this.projetoService.findAll().pipe(
                map(projetos => {
                    return new projetoActions.ListProjetoSuccessAction(projetos);
                })
            )
        })
    )

    @Effect()
    getProjetoAction$ = this.actions$.pipe(
        ofType<projetoActions.GetProjetoAction>(projetoActions.ProjetoActions.GET_PROJETO),
        map(action => action.payload),
        mergeMap(payload => {
            return this.projetoService.get(payload).pipe(
                map(projeto => {
                    return new projetoActions.GetProjetoSuccessAction(projeto);
                })
            )
        })
    )

    @Effect()
    deleteProjetoAction$ = this.actions$.pipe(
        ofType<projetoActions.DeleteProjetoAction>(projetoActions.ProjetoActions.DELETE_PROJETO),
        map(action => action.payload),
        mergeMap(projeto => {
            return this.projetoService.delete(projeto.id).pipe(
                switchMap(_ => {
                    return [
                        new projetoActions.DeleteProjetoSuccessAction(projeto),
                        new projetoActions.ListProjetoAction()
                    ]
                })
            )
        })
    )

}