import * as React from 'react';
import * as sessionActions from '../../actions/sessions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GridBodyContainer } from '../../containers';
import { FormContainer } from '../..//containers/FormContainer';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Page, Column, Loading, ErrorPage, Icon, MainContentWrapper, PageHeader, LineChart, StyledPaper, ErrorModal } from '../../components';
import { columns } from '../../columns/columns';
import { sessionFilters } from '../../forms';
import { routes } from '../../routes';
import { RootState } from '../../reducers';
import { utilsHelpers, rowingHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class CurrentSessionContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {

        super(props, context);

        this.getSteps = this.getSteps.bind(this);

    }

    private getSteps() {

        return [
            {
                label: ['Connecting to service', 'Connected to service'],
                content: [``, ``]
            },
            {
                label: ['Connecting to rower', 'Connected to rower'],
                content: ['Connect logger to the rower and switch on, then ', ``]
            },
            {
                label: ['Ready', 'In progress'],
                content: [`Start rowing to begin the session`, ``]
            }
        ];


    } 

    render() {

        const { appConnected, 
                loggerConnected, 
                times, 
                constant, 
                multi } = this.props;

        const steps: Array<any> = this.getSteps();
        
        let activeStep: number = 0;
        let data: any = {};
        let options: any = {};
        let metres: number = 0;
        let time: number = 0;

        if(appConnected){

            activeStep = 1;

        }

        if(loggerConnected){

            activeStep = 2;

        }

        if(times.length){

            const chart: any = utilsHelpers.createLineChartData(times, multi);

            data = chart.data;
            options = chart.options;
            metres = rowingHelpers.timesToMetres([times], multi, constant);
            time = rowingHelpers.timesToTotalMillis([times]);

        }

        return (

            <Page title="Current session">
                {(!appConnected || !loggerConnected || !steps.length) &&
                    <React.Fragment>
                        <Column width={4}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                              {steps.map((step, index) => {
                                return (
                                  <Step key={index}>
                                    <StepLabel>{activeStep > index ? step.label[1] : step.label[0]}</StepLabel>
                                    <StepContent>
                                      <Typography variant="caption">{activeStep > index ? step.content[1] : step.content[0]}</Typography>
                                    </StepContent>
                                  </Step>
                                );
                              })}
                            </Stepper>
                        </Column>
                        <Column width={4}>
                            <Loading message="Getting ready..." />
                        </Column>
                    </React.Fragment>
                }
                {loggerConnected && appConnected && times.length &&
                    <React.Fragment>
                        <Column width={6}>
                            <StyledPaper>
                                <h2>{metres}</h2>
                                <h2>{time}</h2>
                            </StyledPaper>
                        </Column>
                        <Column width={6}>
                            <StyledPaper>
                                <LineChart data={data} options={options} />
                            </StyledPaper>
                        </Column>
                    </React.Fragment>
                }
            </Page>

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {
    return {
        appConnected: state.active.appConnected,
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