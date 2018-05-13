export const maxNumber = (value: any, values: any, form: any) => { // is the number less than or equal to the max?

    let thisFieldName: string = null;

    for (var key in values) { // get the field owning the value
        if (values[key] === value && values.hasOwnProperty(key)) {
            thisFieldName = key;
        }
    }

    if (form && form.fieldData && form.fieldData[thisFieldName]){

        const thisField: any = form.fieldData[thisFieldName];

        if (thisField.typeSpecific && thisField.typeSpecific.max){

            const maxNumber: number = parseInt(thisField.typeSpecific.max, 10);
            const inputValue: number = parseInt(value, 10);

            if (inputValue > maxNumber) {
                return 'Value greater than ' + maxNumber;
            }

        }

    }

    return undefined;

};