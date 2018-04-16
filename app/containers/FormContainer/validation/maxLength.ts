export const maxLength = (value: any, values: any, form: any) => { // is the number less than or equal to the max?

    let thisFieldName: string = null;

    for (var key in values) { // get the field owning the value
        if (values[key] === value && values.hasOwnProperty(key)) {
            thisFieldName = key;
        }
    }

    if (form && form.fieldData && form.fieldData[thisFieldName]){

        const thisField: any = form.fieldData[thisFieldName];

        if (thisField.typeSpecific && thisField.typeSpecific.maxLength){

            const maxLength: number = parseInt(thisField.typeSpecific.maxLength, 10);
            const inputValueLength: number = parseInt(value.length, 10);

            if (inputValueLength > maxLength) {
                return 'Value longer than ' + maxLength + ' characters';
            }

        }

    }

    return undefined;

};