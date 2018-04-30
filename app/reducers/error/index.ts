import * as actions from '../../constants/actions';
import initialState from './initialState';
import LoadingInterface from './interfaces';

export default (state = initialState, action) => {

    return {
        ...state,
        [action.type]: action.error
    };

};