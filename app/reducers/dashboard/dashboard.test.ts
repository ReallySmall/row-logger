import dashboard from './index';
import initialState from './initialState';
import * as actions from '../../constants/actions';

describe('Dashboard reducer', () => {

    it('Should correctly set the initial state', () => {

        expect(dashboard(undefined, { type: 'mock' })).toMatchObject(initialState);

    });

    it('Should set the processing flag when exporting files', () => {

        const returnedState = dashboard(undefined, {
            type: actions.EXPORT_RECORDS_REQUEST,
            data: 'mock message'
        });

        expect(typeof returnedState['processing']).toBe('string');

    });

    it('Should unset the processing flag when a file export succeeeds or fails', () => {

        const actionTypes: Array<any> = [actions.EXPORT_RECORDS_REQUEST_SUCCESS, actions.EXPORT_RECORDS_REQUEST_ERROR];
        const expectedObject = {
            processing: undefined
        };

        actionTypes.forEach(actionType => {

            const returnedState = dashboard(undefined, { type: actionType });

            expect(returnedState).toMatchObject(expectedObject);

        });

    });

    it('Should set the processing flag when the allowed form types are being requested', () => {

        const returnedState = dashboard(undefined, {
            type: actions.QUERY_ALLOWED_FORM_TYPES_REQUEST,
            data: 'mock message'
        });

        const expectedObject = {
            fieldsAsyncRequesting: true,
            error: undefined
        };

        expect(returnedState).toMatchObject(expectedObject);
        expect(typeof returnedState['processing']).toBe('string');

    });

    it('Should update the store with the allowed form types', () => {

        const mockFormTypes: Array<any> = [
            { value: 1, label: 'mockLabel1' },
            { value: 2, label: 'mockLabel2' },
            { value: 3, label: 'mockLabel3' }
        ];

        const returnedState = dashboard(undefined, {
            type: actions.QUERY_ALLOWED_FORM_TYPES_REQUEST_SUCCESS,
            data: mockFormTypes
        });

        const expectedObject = {
            fieldsAsyncPopulated: true,
            fieldsAsyncRequesting: false,
            processing: undefined,
            error: undefined
        };

        expect(returnedState).toMatchObject(expectedObject);

    });

    it('Should recieve an error message when the request for allowed form types fails', () => {

        const returnedState = dashboard(undefined, {
            type: actions.QUERY_ALLOWED_FORM_TYPES_REQUEST_ERROR,
            data: 'testError'
        });

        const expectedObject = {
            processing: undefined
        };

        expect(returnedState).toMatchObject(expectedObject);
        expect(returnedState['error']).toBeDefined();

    });

    it('Should update the items per page', () => {

        const mockItemsPerPage = 20;

        const returnedState = dashboard(undefined, {
            type: actions.PAGING_CHANGE_ITEMS_PER_PAGE,
            data: mockItemsPerPage
        });

        const expectedObject = {
            pageSize: mockItemsPerPage,
            currentPage: 1
        };

        expect(returnedState).toMatchObject(expectedObject);

    });

    it('Should change the current page', () => {

        const returnedState = dashboard(undefined, {
            type: actions.PAGING_CHANGE_PAGE,
            data: 2
        });

        const expectedObject = {
            currentPage: 2
        };

        expect(returnedState).toMatchObject(expectedObject);

    });

    it('Should update a selected record as selected', () => {

        const mockState = {
            items: {
                mockItemId: {
                    selected: false
                }
            }
        };

        const returnedState = dashboard(mockState, {
            type: actions.GRID_SELECT_RECORD,
            data: 'mockItemId'
        });

        expect(returnedState.items['mockItemId'].selected).toBe(true);

    });

    it('Should update an deselected record as deselected', () => {

        const mockState = {
            items: {
                mockItemId: {
                    selected: true
                }
            }
        };

        const returnedState = dashboard(mockState, {
            type: actions.GRID_DESELECT_RECORD,
            data: 'mockItemId'
        });

        expect(returnedState.items['mockItemId'].selected).toBe(false);

    });

    it('Should update the column sort state', () => {

        // TODO

    });

    it('Should reset to initial state on logout', () => {

        const returnedState = dashboard(undefined, { type: actions.LOGOUT_REQUEST });

        expect(returnedState).toMatchObject(initialState);

    });

});