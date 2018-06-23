export namespace Interfaces {

    export interface Props {
    	classes: any;
        heading: string;
        authActions: any;
        isLoggedIn: boolean;
        userName: string;
        handleTabChange: Function;
        tabs: Array<any>;
        activeTab: string;
    }

    export interface State {
    	anchorEl: HTMLElement;
    }

}