import {
  Checkbox,
  RadioButtonGroup,
  Select,
  TextField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui';

export const formControls = {
    text: TextField,
    dateTime: DatePicker,
    select: Select,
    singleCheckBox: Checkbox
};