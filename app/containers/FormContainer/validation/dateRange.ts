export const dateRange = (value: any, values: any, form: any) => { // is date valid as part of a date range?

    let thisFieldName: string = null;

    for (var key in values) { // get the field owning the value
        if (values[key] === value && values.hasOwnProperty(key)) {
            thisFieldName = key;
        }
    }

    if (thisFieldName && form.fieldData[thisFieldName]) {

        const { rangePast, rangeFuture } = form.fieldData[thisFieldName].typeSpecific; // look for related range fields
        const pastDateValue = values[rangePast]; // is there a related from field
        const futureDateValue = values[rangeFuture]; // is there a related to field

        // if part of a date range, both fields have dates, and the from date is after the to date
        if ((pastDateValue && pastDateValue > value) || (futureDateValue && futureDateValue < value)) {
            return 'Invalid range';
        }

    }

    return undefined;

};