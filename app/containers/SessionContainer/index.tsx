import * as React from 'react';
import * as errorActions from '../../actions/error';
import * as sessionActions from '../../actions/sessions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import TimerIcon from '@material-ui/icons/Timer';
import TimeLineIcon from '@material-ui/icons/Timeline';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import { FormContainer } from '../../containers/FormContainer';
import { Page, Column, Loading, ErrorPage, Icon, MainContentWrapper, PageHeader, LineChart, StyledPaper, ErrorModal } from '../../components';
import { routes } from '../../routes';
import { RootState } from '../../reducers';
import { utilsHelpers, dateTimeHelpers, rowingHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class SessionContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    componentDidMount(){

        const { session, sessionActions, processing, routing } = this.props;
        const { sessionRequest } = sessionActions;
        const id: string = routing.pathname.replace('/sessions/', '');

        if(!processing && !session){
            sessionRequest(id);
        }

    }

    render() {

        const { processing, error, session } = this.props;

        let data: any = {};
        let options: any = {};

        if(session && session.times){

            const chart: any = utilsHelpers.createLineChartData(session.times, session.multi);

            data = chart.data;
            options = chart.options;

        }
   
        return (

            <div>
                {error && <ErrorModal error={error} name="SESSION" clearErrorAction={errorActions.clearError} />}
                {processing &&
                    <Page title="Session">
                        <Loading message="Getting session data" />
                    </Page>
                }
                {!processing && session &&
                    <Page title="Session">
                        <Column width={12}>
                            <Typography variant="display3" gutterBottom>{dateTimeHelpers.formatDateHumanFriendly(session.createdAt)}</Typography>
                        </Column>
                        <Column title="Data" width={3}>
                            <Paper>
                                <List>
                                    {session.distance &&
                                        <ListItem>
                                            <Avatar>
                                                <TrendingFlatIcon />
                                            </Avatar>
                                            <ListItemText primary="Distance" secondary={rowingHelpers.metrestoKmString(session.distance)} />
                                        </ListItem>
                                    }
                                    {session.time &&
                                        <ListItem>
                                            <Avatar>
                                                <TimerIcon />
                                            </Avatar>
                                            <ListItemText primary="Time" secondary={dateTimeHelpers.millisToDuration(session.time)} />
                                        </ListItem>
                                    }
                                    {session.distance && session.time &&
                                        <ListItem>
                                            <Avatar>
                                                <TimeLineIcon />
                                            </Avatar>
                                            <ListItemText primary="Average speed" secondary={rowingHelpers.metresSecondstoAverageSpeedString(session.distance, session.time)} />
                                        </ListItem>
                                    }
                                    {session.machineId &&
                                        <ListItem>
                                            <Avatar>
                                                <SettingsRemoteIcon />
                                            </Avatar>
                                            <ListItemText primary="Rower type" secondary={session.machineId} />
                                        </ListItem>
                                    }
                                    {session.damping &&
                                        <ListItem>
                                            <Avatar>
                                                <SettingsRemoteIcon />
                                            </Avatar>
                                            <ListItemText primary="Damping level" secondary={session.damping} />
                                        </ListItem>
                                    }
                                </List>
                            </Paper>
                        </Column>
                        <Column title="Chart" width={9}>
                            <StyledPaper>
                                <LineChart data={data} options={options} />
                            </StyledPaper>
                        </Column>
                    </Page>
                }
            </div>

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {

    const {routing} = props;
    const id: string = routing.pathname.replace('/sessions/', '');

    return {
        processing: state.loading['SESSION'],
        error: state.error['SESSION'],
        session: state.session.data[id]
    };

}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        sessionActions: bindActionCreators(sessionActions as any, dispatch),
        errorActions: bindActionCreators(errorActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(SessionContainer);