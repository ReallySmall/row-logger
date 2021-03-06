import auth from './index';
import initialState from './initialState';
import * as actions from '../../constants/actions';

describe('Auth reducer', () => {

    it('Should correctly set the initial state', () => {

        expect(auth(undefined, {})).toMatchObject(initialState);

    });

    it('Should set processing flag to true when login request is initiated', () => {

        const actionTypes: Array<any> = [
            { type: actions.LOGIN_REQUEST, data: 'mock message' },
            { type: actions.LOGIN_WITH_JWT_REQUEST, data: 'mock message' }
        ];

        const expectedObject = {
            isLoggedIn: false
        };

        actionTypes.forEach(actionType => {

            const returnedState = auth(undefined, actionType);

            expect(returnedState).toMatchObject(expectedObject);

        });

    });

    it('Should log in a successfully authenticated user', () => {

        const actionTypes: Array<any> = [
            { type: actions.LOGIN_REQUEST_COMPLETE, data: ['Admins'] },
            { type: actions.LOGIN_WITH_JWT_REQUEST_COMPLETE, data: ['Admins'] }
        ];

        const expectedObject = {
            isLoggedIn: true
        };

        actionTypes.forEach(actionType => {

            const returnedState = auth(undefined, actionType);

            expect(returnedState).toMatchObject(expectedObject);

        });

    });

    it('Should recieve an error message on login error', () => {

        const returnedState = auth(undefined, { type: actions.LOGIN_REQUEST_COMPLETE, error: true });
        const expectedObject: Object = {
            isLoggedIn: false
        };

        expect(returnedState).toMatchObject(expectedObject);
        expect(returnedState['error']).toBeDefined();

    });

    it('Should reset to initial state on logout', () => {

        const returnedState = auth(undefined, { type: actions.LOGOUT_REQUEST });

        expect(returnedState).toMatchObject(initialState);

    });

});