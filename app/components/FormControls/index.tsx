import { TextFormControl } from './Text';
import { NumberFormControl } from './Number';
import { TextAreaFormControl } from './TextArea';
import { DateTimeFormControl } from './DateTime';
import { SelectFormControl } from './Select';
import { MultiSelectFormControl } from './MultiSelect';
import { SingleCheckBoxFormControl } from './SingleCheckBox';

export const formControls = {
    text: TextFormControl,
    number: NumberFormControl,
    textArea: TextAreaFormControl,
    dateTime: DateTimeFormControl,
    select: SelectFormControl,
    multiSelect: MultiSelectFormControl,
    singleCheckBox: SingleCheckBoxFormControl
};