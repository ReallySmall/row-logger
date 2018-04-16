import * as React from 'react';
import * as pagingActions from '../../actions/paging';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Pager } from '../../components';
import { RootState } from '../../reducers';
import { appConfig } from '../../config';
import { utilsHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class PaginationContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { pagingActions, pageSize, pageCount, currentPage } = this.props;
        const { pageSizeOptions, pageLinksToShow } = appConfig.pagination;

        return (

            <Pager
                pageSizeOptions={pageSizeOptions}
                pageSizeValue={pageSize}
                pageCount={pageCount}
                currentPage={currentPage}
                pageLinksToShow={pageLinksToShow}
                changePerPageAction={pagingActions.changeRecordsPerPage}
                changePageAction={pagingActions.changePage} />

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState) {
    return {
        pageSize: state.dashboard.pageSize,
        pageCount: state.dashboard.pages.length,
        currentPage: state.dashboard.currentPage
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        pagingActions: bindActionCreators(pagingActions as any, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(PaginationContainer);