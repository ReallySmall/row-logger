import * as actions from '../../constants/actions';
import * as auth from './../auth';
import { appConfig } from '../../config';

export const tabChange = (index: number): Function => {

    return (dispatch) => {

        dispatch(<ReduxAction>{
            type: actions.DASHBOARD_TAB_CHANGE,
            data: index
        });

    };

};