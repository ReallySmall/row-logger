import * as actions from '../../constants/actions';
import initialState from './initialState';
import LoadingInterface from './interfaces';

export default (state = initialState, action) => {

    const actionType: string = action.type;

    const requestSuffix: string = '_REQUEST';
    const requestSuccessSuffix: string = '_REQUEST_SUCCESS';
    const requestErrorSuffix: string = '_REQUEST_ERROR';

    const isLoading: boolean = (new RegExp(requestSuffix + '$')).test(actionType);
    const isLoadingSuccess: boolean = (new RegExp(requestSuccessSuffix + '$')).test(actionType);
    const isLoadingError: boolean = (new RegExp(requestErrorSuffix + '$')).test(actionType);

    let actionTypeBase: string = '';

    if(isLoading){

        actionTypeBase = actionType.substring(0, actionType.lastIndexOf(requestSuffix));

        return {
            ...state,
            [actionTypeBase]: true
        };

    } else if(isLoadingSuccess){

        actionTypeBase = actionType.substring(0, actionType.lastIndexOf(requestSuccessSuffix));

        return {
            ...state,
            [actionTypeBase]: false
        };

    } else if(isLoadingError){

        actionTypeBase = actionType.substring(0, actionType.lastIndexOf(requestErrorSuffix));

        return {
            ...state,
            [actionTypeBase]: false
        };

    }

    return state;

};