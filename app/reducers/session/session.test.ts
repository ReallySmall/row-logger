import details from './index';
import initialState from './initialState';
import * as actions from '../../constants/actions';

describe('Details reducer', () => {

    it('Should correctly set the initial state', () => {

        expect(details(undefined, {})).toMatchObject(initialState);

    });

    it('Should reset to initial state on logout', () => {

        const returnedState = details(undefined, { type: actions.LOGOUT_REQUEST });

        expect(returnedState).toMatchObject(initialState);

    });

});