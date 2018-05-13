import loading from './index';
import initialState from './initialState';
import * as actions from '../../constants/actions';

describe('Loading reducer', () => {

    it('Should correctly set the initial state', () => {

        expect(loading(undefined, { type: 'mock' })).toMatchObject(initialState);

    });

});