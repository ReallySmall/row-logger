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

const getSteps = () => ['Connecting to service', 'Connecting to rower', 'Ready'];

const getStepContent = (step: number) => {

  switch (step) {
    case 0:
      return ``;
    case 1:
      return 'Connect logger to the rower and switch on';
    case 2:
      return `Start rowing to begin the session`;
    default:
      return '';
  }

}

class CurrentSessionContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {

        super(props, context);

    }

    render() {

        const { appConnected, loggerConnected, times, constant, multi } = this.props;
        
        let activeStep: number = 0;

        const steps = getSteps();

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
                {!appConnected || !loggerConnected || !steps.length}
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((label, index) => {
                    return (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                          <Typography variant="caption">{getStepContent(index)}</Typography>
                        </StepContent>
                      </Step>
                    );
                  })}
                </Stepper>
                {loggerConnected && appConnected &&
                    <React.Fragment>
                        {!times.length && 
                            <Column width={12}>
                                <StyledPaper>
                                    <p>Start rowing</p>
                                </StyledPaper>
                            </Column>
                        }
                        {times.length && 
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