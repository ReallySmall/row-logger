import * as moment from 'moment';
import { appConfig } from '../../../config';

export const date = (value: string) => { // is value a valid date?

    if (!value) { // don't validate against date if not supplied
        return undefined;
    }

    console.log(value, moment(value, appConfig.dateFormats.date, true).isValid());

    // validate input date with moment.js
    const isDate: boolean = moment(value, appConfig.dateFormats.date, true).isValid();

    return isDate ? undefined : 'Invalid date';

};