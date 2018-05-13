import * as actions from '../../constants/actions';
import initialState from './initialState';
import LoadingInterface from './interfaces';

export default (state = initialState, action) => {

	const actionType: string = action.type;
    const requestCompleteSuffix: string = '_REQUEST_COMPLETE';
    const isRequestComplete: boolean = (new RegExp(requestCompleteSuffix + '$')).test(actionType);

    if(isRequestComplete){

        const actionTypeBase: string = actionType.substring(0, actionType.lastIndexOf(requestCompleteSuffix));

    	switch (action.error) {

        	case true:

		    	return {
		        	...state,
		        	[actionTypeBase]: action.payload
		    	};

	    	default:

	    		if(state[actionTypeBase]){

	    			const updatedState = {...state};

	    			delete updatedState[actionTypeBase];

	    			return updatedState;

	    		}

	    	return state;

		}

	} else {

		return state;

	}

};