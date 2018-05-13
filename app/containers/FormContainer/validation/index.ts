import { required } from './required';
import { date } from './date';
import { dateRange } from './dateRange';
import { email } from './email';
import { maxNumber } from './maxNumber';
import { minNumber } from './minNumber';
import { maxLength } from './maxLength';

// form field validation types
// functions should return undefined if validation passes or an error message if it fails
const validationMethods = {
    required, // does the field need a value?
    date, // does the field contain a valid date?
    dateRange, // is date valid as part of a date range?
    email, // looks like an email address?
    maxNumber, // is the number less than or equal to the max?
    minNumber, // is the number greater than or equal to the min?
    maxLength, // is the length of the text string longer than the max?
};

export const fieldValidationMethods = (fieldValidationMethodList) => {

    if (!fieldValidationMethodList) { return []; }

    const fieldValidationMethodsArray = fieldValidationMethodList.map(function (validationMethod) { // Convert array from validation method label strings to function references
        if (validationMethod in validationMethods) { // if a corresponding validation method exists
            return validationMethods[validationMethod]; // add it as a test to run against this control whenver it is updated
        }
    });

    return fieldValidationMethodsArray;

};