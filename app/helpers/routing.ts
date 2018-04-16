import * as rolesConstants from '../constants/roles';
import { routes } from '../routes';

// return the appropriate dashboard type for the current user and route
export const getDashboardType = (route: string, roles: UserDataRoleArray): string => {

    // if at the root of the app, display the dashboard for the highest permission level of the user
    if (route === routes.base.pathname) {

        if (roles.includes(rolesConstants.ADMINROLENAME)) {
            return rolesConstants.ADMIN;
        } else if (roles.includes(rolesConstants.MONITORROLENAME)) {
            return rolesConstants.MONITOR;
        } else if (roles.includes(rolesConstants.SUPERVISORROLENAME)) {
            return rolesConstants.SUPERVISOR;
        } else if (roles.includes(rolesConstants.OPERATORROLENAME)) {
            return rolesConstants.OPERATOR;
        }

    // else if on a role dashboard route, display it if the user has permission
    } else {

        if (route === routes.adminDashboard.pathname && roles.includes(rolesConstants.ADMINROLENAME)) {
            return rolesConstants.ADMIN;
        } else if (route === routes.monitorDashboard.pathname && roles.includes(rolesConstants.MONITORROLENAME)) {
            return rolesConstants.MONITOR;
        } else if (route === routes.supervisorDashboard.pathname && roles.includes(rolesConstants.SUPERVISORROLENAME)) {
            return rolesConstants.SUPERVISOR;
        } else if (route === routes.operatorDashboard.pathname && roles.includes(rolesConstants.OPERATORROLENAME)) {
            return rolesConstants.OPERATOR;
        }

    }

};

// return the appropriate dashboard type for the current user and route
export const getHighestUserRole = (roles: UserDataRoleArray): string => {

    if (roles.includes(rolesConstants.ADMINROLENAME)) {
        return rolesConstants.ADMIN;
    } else if (roles.includes(rolesConstants.MONITORROLENAME)) {
        return rolesConstants.MONITOR;
    } else if (roles.includes(rolesConstants.SUPERVISORROLENAME)) {
        return rolesConstants.SUPERVISOR;
    } else if (roles.includes(rolesConstants.OPERATORROLENAME)) {
        return rolesConstants.OPERATOR;
    }

};