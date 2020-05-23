import * as React from 'react';
import * as sessionActions from '../../actions/sessions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Column, Loading, LineChart, StyledPaper } from '../../components';
import { RootState } from '../../reducers';
import { utilsHelpers, rowingHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class CurrentSessionContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {

        super(props, context);

        this.handleConnect = this.handleConnect.bind(this);

        this.state = {
            isLoggerConnected: false
        };

    }

    private handleConnect(): void {

        this.setState({
            isLoggerConnected: true
        });

    }

    render() {

        const { isLoggerConnected } = this.state;
        const { times, 
                constant, 
                multi } = this.props;

        const isSessionActive: boolean = isLoggerConnected && times.length > 0;
        
        let activeStep: number = 0;
        let data: any = {};
        let options: any = {};
        let metres: number = 0;
        let time: number = 0;

        if(isLoggerConnected){

            activeStep = 1;

        }

        if(times.length){

            const chart: any = utilsHelpers.createLineChartData(times, multi);

            data = chart.data;
            options = chart.options;
            metres = rowingHelpers.timesToMetres([times], multi, constant);
            time = rowingHelpers.timesToTotalMillis([times]);

        }

        return (

            <>        
                <Stepper activeStep={activeStep} orientation="vertical">
                        <Step>
                            <StepLabel>
                                {activeStep === 0 

                                    ?   'Switch on the logger and connect' 
                                    :   'Connected to logger'

                                }
                            </StepLabel>
                            <StepContent>
                                <Typography variant="caption">
                                    {activeStep === 0 

                                        ?   <Button 
                                                variant="contained"
                                                size="large" 
                                                color="secondary"
                                                onClick={this.handleConnect}>
                                                    Connect
                                            </Button> 
                                        :   null

                                    }
                                </Typography>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>
                                {activeStep === 0

                                    ?   <>
                                            Waiting for connection
                                            <Loading variant="linear" message={null} />
                                        </>
                                    :   activeStep === 1
                                        
                                        ?   'Start rowing to begin the session'
                                        :   'Session complete'

                                }
                            </StepLabel>
                        </Step>
                        {isSessionActive &&
                            <Step>
                                <StepLabel>
                                    {activeStep < 2 

                                        ?   'Session complete' 
                                        :   <Button 
                                                size="large" 
                                                color="secondary"
                                                onClick={this.handleConnect}>
                                                    Save
                                            </Button>

                                    }
                                </StepLabel>
                            </Step>
                        }     
                    </Stepper>
                {isSessionActive &&
                    <>
                        <Column width={8}>
                            <StyledPaper>
                                <h2>{metres}</h2>
                                <h2>{time}</h2>
                            </StyledPaper>
                        </Column>
                        <Column width={8}>
                            <StyledPaper>
                                <LineChart data={data} options={options} />
                            </StyledPaper>
                        </Column>
                    </>
                        
                }
            </>

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {
    return {
        loggerConnected: state.active.loggerConnected,
        times: state.active.times,
        multi: state.active.multi,
        constant: state.active.constant
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        sessionActions: bindActionCreators(sessionActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(CurrentSessionContainer);