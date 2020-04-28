import * as actions from '../../constants/actions';
import initialState from './initialState';
import LoadingInterface from './interfaces';

export default (state = initialState, action) => {

    const { type, payload } = action;

    const requestSuffix: string = '_REQUEST';
    const requestSuccessSuffix: string = '_REQUEST_COMPLETE';

    const isLoading: boolean = (new RegExp(requestSuffix + '$')).test(type);
    const isLoadingComplete: boolean = (new RegExp(requestSuccessSuffix + '$')).test(payload);

    let actionTypeBase: string = '';

    if(isLoading){

        actionTypeBase = type.substring(0, type.lastIndexOf(requestSuffix));

        return {
            ...state,
            [actionTypeBase]: true
        };

    } else if(isLoadingComplete){

        actionTypeBase = type.substring(0, type.lastIndexOf(requestSuccessSuffix));

        const nextState = {...state};

        if(nextState.actionTypeBase){

            delete nextState.actionTypeBase;

        }

        return nextState;

    }

    return state;

};