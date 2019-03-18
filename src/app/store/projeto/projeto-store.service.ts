import { Injectable } from '@angular/core';
import * as projetoActions from './projeto.actions';
import * as state from './projeto.state';
import { createFeatureSelector, Store, createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Projeto } from './projeto';
import { filter, take } from 'rxjs/operators';

@Injectable()
export class ProejetoStoreService {
    private projetoState = createFeatureSelector<state.ProjetoState>(state.STATE_NAME);

    constructor(
        private store: Store<AppState>
    ) {}

    private projetos = createSelector(
        this.projetoState,
        state.selectProjetos
    )

    private projeto = createSelector(
        this.projetoState,
        state.selectProjeto
    )

    private isLoading = createSelector(
        this.projetoState,
        state.selectIsLoadig
    )

    private isLoadingDeleteProjeto = createSelector(
        this.projetoState,
        state.selectIsLoadigDeleteProjeto
    )

    private isProjetoCreatedUpdated = createSelector(
        this.projetoState,
        state.selectIsProjetoCreatedUpdated
    );

    getProjetos() {
        return this.store.select(this.projetos);
    }

    getProjeto() {
        return this.store.select(this.projeto)
            .pipe(
                filter(projeto => !!projeto)
            )
    }

    getIsLoading() {
        return this.store.select(this.isLoading);
    }

    getIsLoadingDelete() {
        return this.store.select(this.isLoadingDeleteProjeto).pipe(
          filter(isLoading => isLoading == false),
          take(1)
        );
    }

    getIsProjetoCreatedUpdated() {
        return this.store.select(this.isProjetoCreatedUpdated).pipe(
            filter(isProjetoCreatedUpdated => isProjetoCreatedUpdated)
        )
    }


    dispatchListProjetoAction() {
        this.store.dispatch(new projetoActions.ListProjetoAction());
    }

    dispatchGetProjetoAction(id: string) {
        this.store.dispatch(new projetoActions.GetProjetoAction(id));
    }

    dispatchDeleteProjetoAction(projeto: Projeto) {
        this.store.dispatch(new projetoActions.DeleteProjetoAction(projeto));
    }

    dispatchCreateUpdateProjetoAction(projeto: Projeto) {
        this.store.dispatch(new projetoActions.CreateUpdateProjetoAction(projeto));
    }

    dispatchCreateUpdateProjetoResetAction() {
        this.store.dispatch(new projetoActions.CreateUpdateProjetoResetAction());
    }
}