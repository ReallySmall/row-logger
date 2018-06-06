import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui';

export const formControls = {
    text: TextField,
    dateTime: DatePicker,
    select: SelectField,
    singleCheckBox: Checkbox
};