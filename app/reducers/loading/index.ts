import * as actions from '../../constants/actions';
import initialState from './initialState';
import LoadingInterface from './interfaces';

export default (state = initialState, action) => {

    const actionType: string = action.type;

    const requestSuffix: string = '_REQUEST';
    const requestSuccessSuffix: string = '_REQUEST_COMPLETE';

    const isLoading: boolean = (new RegExp(requestSuffix + '$')).test(actionType);
    const isLoadingComplete: boolean = (new RegExp(requestSuccessSuffix + '$')).test(actionType);

    let actionTypeBase: string = '';

    if(isLoading){

        actionTypeBase = actionType.substring(0, actionType.lastIndexOf(requestSuffix));

        return {
            ...state,
            [actionTypeBase]: true
        };

    } else if(isLoadingComplete){

        actionTypeBase = actionType.substring(0, actionType.lastIndexOf(requestSuccessSuffix));

        return {
            ...state,
            [actionTypeBase]: false
        };

    }

    return state;

};