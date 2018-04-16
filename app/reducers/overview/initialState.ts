import * as moment from 'moment';
import * as clone from 'clone';
import { queryGeneral, exportRecord, exportRecords } from '../../forms';
import { columns } from '../../columns/columns';
import { appConfig } from '../../config';
import DashboardOverviewInterface from './interfaces';

export default <DashboardOverviewInterface> {
    processing: undefined,
    error: undefined,
    recentSessions: undefined,
    totals: undefined
};