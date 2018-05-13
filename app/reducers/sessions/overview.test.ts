import overview from './index';
import initialState from './initialState';
import * as actions from '../../constants/actions';

describe('Overview reducer', () => {

    it('Should correctly set the initial state', () => {

        expect(overview(undefined, { type: 'mock' })).toMatchObject(initialState);

    });

});