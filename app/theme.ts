import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';
import pink from '@material-ui/core/colors/pink';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';

// All the following keys are optional.
// We try our best to provide a great default value.
export const theme = createMuiTheme({
  overrides: {
    MuiPaper: { // Name of the component ⚛️ / style shee
      root: {
        //padding: '20px'
      }
    },
    MuiToolbar: {
      root: {
        padding: '0px'
      }
    },
    MuiAppBar: {
      root: {
      }
    },
    MuiTab: {
      root: {
        minHeight: '64px'
      }
    },
    MuiFormControl: {
      root: {
        marginBottom: '20px'
      }
    }
  }
});
