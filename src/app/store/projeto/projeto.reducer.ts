import * as projetoState from  './projeto.state';
import * as projetoActions from './projeto.actions';

export function projetoReducer(
    state: projetoState.ProjetoState = projetoState.initialState,
    action: projetoActions.ProjetoAction
): projetoState.ProjetoState {

    switch (action.type) {
        case projetoActions.ProjetoActions.LIST_PROJETO:
            return {
                ...state,
                list: [],
                isLoading: true
            }
        case projetoActions.ProjetoActions.LIST_PROJETO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                list: action.payload
            }
        case projetoActions.ProjetoActions.GET_PROJETO:
            return {
                ...state,
                isLoading: true
            }
        case projetoActions.ProjetoActions.GET_PROJETO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                projeto: action.payload
            }
        case projetoActions.ProjetoActions.DELETE_PROJETO:
            return {
                ...state,
                isLoadingDeleteProjeto: true
            }
        case projetoActions.ProjetoActions.DELETE_PROJETO_SUCCESS:
            return {
                ...state,
                isLoadingDeleteProjeto: false,
                //list: state.list.filter(p => p.id !== action.payload.id)
            }
        case projetoActions.ProjetoActions.CREATE_UPDATE_PROJETO:
            return {
                ...state,
                isLoading: true,
                isProjetoCreatedUpdated: false
            }
        case projetoActions.ProjetoActions.CREATE_UPDATE_PROJETO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isProjetoCreatedUpdated: true
            }
        case projetoActions.ProjetoActions.CREATE_UPDATE_PROJETO_RESET:
            return {
                ...state,
                isProjetoCreatedUpdated: false
            }
        default:
            return state;
    }

}