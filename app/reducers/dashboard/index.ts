// reducers are pure functions which recieve the current state object and an action object
// if the action type has a matching case, the reducer should return a NEW COPY of the state object with required changes applied, rather than mutating the existing state
// if the action matches no cases, the reducer should return the existing state
// if no state object is passed in, the reducer can optionally fall back to using a defined default value for the state

import initialState from './initialState';
import * as actions from '../../constants/actions';
import exporting from './exporting';
import paging from './paging';
import query from './query';
import selection from './selection';
import sorting from './sorting';
import tabs from './tabs';
import DashboardInterface from './interfaces';

// TODO currently an es5 import - needs changing to es6 import when type file is available on npm @types
// or one is written manually and added to /types
// es6 imports without types cause misleading errors in VS build process
const reduceReducers = require('reduce-reducers');

const dashboard = <DashboardInterface>(state = initialState, action) => state;

// the dashboard contains a lot of different functionality which shares the same slice of the reducer state
// rather than one giant file, reduceReducers is used to chain multiple reducers, which together create one slice of the state
// state and action will be passed through each reducer
// this index reducer defines the state defaults for all sibling reducers
export default reduceReducers(dashboard, query, paging, sorting, selection, exporting, tabs);