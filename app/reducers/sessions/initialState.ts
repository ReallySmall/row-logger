import * as moment from 'moment';
import * as clone from 'clone';
import { appConfig } from '../../config';
import DashboardSessionsInterface from './interfaces';

export default <DashboardSessionsInterface> {
    processing: undefined,
    error: undefined,
    sessions: undefined
};