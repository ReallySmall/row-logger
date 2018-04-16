import * as moment from 'moment';
import * as clone from 'clone';
import { appConfig } from '../../config';
import DashboardInterface from './interfaces';

export default <DashboardInterface> {
    processing: undefined,
    items: {},
    ids: [],
    itemsSelected: 0,
    overallCount: 0,
    currentQuery: null,
    pages: [[]], // default to always having a page 1
    pageSize: appConfig.pagination.pageSizeDefault,
    currentPage: 1,
    error: undefined
};