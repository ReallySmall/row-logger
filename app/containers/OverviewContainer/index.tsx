import * as React from 'react';
import * as sessionActions from '../../actions/sessions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { GridBodyContainer } from '../../containers';
import { Page, Column, ChartOverview, Loading, StyledPaper } from '../../components';
import { NavLink } from 'react-router-dom';
import { columns } from '../../columns/columns';
import { totalsColumns } from '../../columns/totals';
import { routes } from '../../routes';
import { RootState } from '../../reducers';
import { utilsHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class OverviewContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {

        super(props, context);

    }

    componentDidMount(){

        const { sessionActions, 
                processing, 
                totals, 
                recentSessions } = this.props;
        const { sessionsRequest, sessionTotalsRequest } = sessionActions;

        if(!processing){

            !totals && sessionTotalsRequest();
            !recentSessions && sessionsRequest({
                showRecent: true,
                limit: 5
            });

        }

    }

    render() {

        const { processing, 
                error, 
                totals, 
                recentSessions } = this.props;

        const progress: number = totals ? totals.items[totals.ids[0]].distance : 0;
        const hasSessions: boolean = recentSessions && recentSessions.ids && recentSessions.ids.length > 0;

        return (

            <Page title="Overview">
                <Column title="Totals" width={4}>
                    {processing &&                    
                        <StyledPaper>
                            <Loading />
                        </StyledPaper>
                    }
                    {!processing && totals &&
                        <>
                            <Paper>
                                <GridBodyContainer 
                                    columns={totalsColumns} 
                                    items={totals.items} 
                                    ids={totals.ids} 
                                    showHeader={true} 
                                    sortable={false} />
                            </Paper>
                            <ChartOverview total={112000} progress={progress} />
                        </>
                    }                 
                </Column>
                <Column title="Recent" width={8}>
                    {processing && 
                        <StyledPaper>
                            <Loading />
                        </StyledPaper>
                    }
                    {!processing && recentSessions && 
                        <Paper>
                            <GridBodyContainer 
                                columns={columns} 
                                items={recentSessions.items} 
                                ids={recentSessions.ids} 
                                showHeader={true} 
                                sortable={false} />
                        </Paper>
                    }
                    {hasSessions

                        ?   <Button 
                                style={{ marginTop: '20px' }} 
                                variant="raised">
                                    <NavLink to="/sessions">View all sessions</NavLink>
                            </Button>
                        
                        :   null

                    }
                </Column>
            </Page>

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {
    return {
        processing: state.loading['SESSION_TOTALS'],
        error: state.error['SESSION_TOTALS'],
        totals: state.overview.totals,
        recentSessions: state.overview.recentSessions
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        sessionActions: bindActionCreators(sessionActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(OverviewContainer);