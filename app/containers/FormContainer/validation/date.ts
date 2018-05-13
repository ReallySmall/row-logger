import * as moment from 'moment';
import { appConfig } from '../../../config';

export const date = (value: string) => { // is value a valid date?

    if (!value) { // don't validate against date if not supplied
        return undefined;
    }

    // validate input date with moment.js - either date alone, or date + time are acceptable
    const isDate: boolean = moment(value, appConfig.dateFormats.date, true).isValid() || moment(value, appConfig.dateFormats.dateTime, true).isValid();

    return isDate ? undefined : 'Invalid date';

};