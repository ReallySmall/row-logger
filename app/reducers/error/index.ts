import * as actions from '../../constants/actions';
import initialState from './initialState';
import LoadingInterface from './interfaces';

export default (state = initialState, action) => {

    const actionType: string = action.type;

    const requestErrorSuffix: string = '_REQUEST_ERROR';
    const isRequestError: boolean = (new RegExp(requestErrorSuffix + '$')).test(actionType);

    let actionTypeBase: string = '';

    if(isRequestError){

        actionTypeBase = actionType.substring(0, actionType.lastIndexOf(requestErrorSuffix));

        return {
            ...state,
            [actionTypeBase]: true
        };

    }

    return state;

};