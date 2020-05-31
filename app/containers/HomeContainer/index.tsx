import * as React from 'react';
import * as sessionActions from '../../actions/sessions';
import * as authActions from '../../actions/auth';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CurrentSessionContainer } from '../../containers';
import { Page, Column, StyledPaper } from '../../components';
import { RootState } from '../../reducers';
import { utilsHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class HomeContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {

        super(props, context);

        this.handleFilterSubmit = this.handleFilterSubmit.bind(this);

    }

    private handleFilterSubmit(filterValues): void {

        const { fromDate, toDate } = filterValues;
        const { sessionActions: { sessionsRequest } } = this.props;

        sessionsRequest({
            showRecent: false,
            limit: 100,
            fromDate: fromDate,
            toDate: toDate
        });

    }

    render() {

        const { sessions } = this.props;

        const createData = (date, distance, time) => {
            return { date, distance, time };
        }

        const rows = [
            createData(new Date(), 5000, 6000000),
            createData(new Date(), 5000, 6000000),
            createData(new Date(), 5000, 6000000),
            createData(new Date(), 5000, 6000000),
            createData(new Date(), 5000, 6000000),
        ];

        const hasSessions: boolean = sessions && sessions.ids && sessions.ids.length;

        return (

            <Page title="Home">
                <Column title="Start Session" width={3}>
                    <Paper>
                        <CurrentSessionContainer />
                    </Paper>
                </Column>
                <Column width={1}></Column>
                <Column title="Recent sessions" width={8}>
                    <Paper>
                        <Table className="" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="right">Distance</TableCell>
                                    <TableCell align="right">Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="right">{row.date.toString()}</TableCell>
                                        <TableCell align="right">{row.distance}</TableCell>
                                        <TableCell align="right">{row.time}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Column>
            </Page>

        );

    }

}

const mapStateToProps = (state: RootState): any => {
    return {
        sessions: state.sessions.sessions
    };
}

const mapDispatchToProps = (dispatch: any): any => {
    return {
        authActions: bindActionCreators(authActions as any, dispatch),
        sessionActions: bindActionCreators(sessionActions as any, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(HomeContainer);