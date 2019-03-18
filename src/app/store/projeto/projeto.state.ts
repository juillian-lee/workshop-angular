import { Projeto } from './projeto';

export const STATE_NAME = 'projeto';

export interface ProjetoState {
    list: Projeto[];
    projeto: Projeto;
    isLoading: boolean;
    isLoadingDeleteProjeto: boolean;
    isProjetoCreatedUpdated: boolean;
}

export const initialState: ProjetoState = {
    list: [],
    projeto: null,
    isLoading: false,
    isLoadingDeleteProjeto: false,
    isProjetoCreatedUpdated: false
}


export const selectProjetos = (state: ProjetoState) => state.list;
export const selectProjeto = (state: ProjetoState) => state.projeto;
export const selectIsLoadig = (state: ProjetoState) => state.isLoading;
export const selectIsLoadigDeleteProjeto = (state: ProjetoState) => state.isLoadingDeleteProjeto;
export const selectIsProjetoCreatedUpdated = (state: ProjetoState) => state.isProjetoCreatedUpdated;
