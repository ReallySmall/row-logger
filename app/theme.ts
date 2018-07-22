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
    MuiToolbar: {
      root: {
        padding: '0px'
      }
    },
    MuiTab: {
      root: {
        minHeight: '64px'
      }
    },
    MuiButton: {
      root: {
        color: 'white'
      }
    },
    MuiFormControl: {
      root: {
        marginBottom: '20px'
      }
    }
  }
});
