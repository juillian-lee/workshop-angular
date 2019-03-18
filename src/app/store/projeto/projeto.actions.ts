import { Action } from '@ngrx/store';
import { Projeto } from './projeto';

export enum ProjetoActions {
    CREATE_UPDATE_PROJETO = '[PROJETO] - Create/Update projeto -',
    CREATE_UPDATE_PROJETO_SUCCESS = '[PROJETO] - Create/Update projeto success -',
    CREATE_UPDATE_PROJETO_RESET = '[PROJETO] - Create/Update projeto reset -',
    LIST_PROJETO = '[PROJETO] - List projeto -',
    LIST_PROJETO_SUCCESS = '[PROJETO] - List projeto success -',
    GET_PROJETO = '[PROJETO] - Get projeto -',
    GET_PROJETO_SUCCESS = '[PROJETO] - Get projeto success -',
    DELETE_PROJETO = '[PROJETO] - Delete projeto -',
    DELETE_PROJETO_SUCCESS = '[PROJETO] - Delete projeto success -',
}

export class CreateUpdateProjetoAction implements Action {
    readonly type = ProjetoActions.CREATE_UPDATE_PROJETO;
    payload: Projeto;

    constructor(payload: Projeto) {
        this.payload = payload;
    }
}

export class CreateUpdateProjetoSuccessAction implements Action {
    readonly type = ProjetoActions.CREATE_UPDATE_PROJETO_SUCCESS;
}

export class CreateUpdateProjetoResetAction implements Action {
    readonly type = ProjetoActions.CREATE_UPDATE_PROJETO_RESET;
}

export class ListProjetoAction implements Action {
    readonly type = ProjetoActions.LIST_PROJETO;
}

export class ListProjetoSuccessAction implements Action {
    readonly type = ProjetoActions.LIST_PROJETO_SUCCESS;
    payload: any;

    constructor(payload: any) {
        this.payload = payload;
    }

}

export class GetProjetoAction implements Action {
    readonly type = ProjetoActions.GET_PROJETO;
    payload: number;

    constructor(payload) {
        this.payload = payload;
    }
}

export class GetProjetoSuccessAction implements Action {
    readonly type = ProjetoActions.GET_PROJETO_SUCCESS;

    payload: Projeto;

    constructor(payload) {
        this.payload = payload;
    }

}

export class DeleteProjetoAction implements Action {
    readonly type = ProjetoActions.DELETE_PROJETO;
    payload: Projeto;

    constructor(payload) {
        this.payload = payload;
    }

}

export class DeleteProjetoSuccessAction implements Action {
    readonly type = ProjetoActions.DELETE_PROJETO_SUCCESS;

    payload: Projeto;

    constructor(payload) {
        this.payload = payload;
    }
}

export type ProjetoAction = 
    ListProjetoAction
    | ListProjetoSuccessAction
    | GetProjetoAction
    | GetProjetoSuccessAction
    | DeleteProjetoAction
    | DeleteProjetoSuccessAction
    | CreateUpdateProjetoAction
    | CreateUpdateProjetoSuccessAction
    | CreateUpdateProjetoResetAction