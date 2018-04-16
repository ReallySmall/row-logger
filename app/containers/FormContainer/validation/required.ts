export const required = (value: any) => {

    const validationMessage: string = 'Required';

    if (value) {

        // if value is an array, check if it's empty'
        if (value.hasOwnProperty('length') && value.length === 0){
            return validationMessage;
        }

        // otherwise if it's a string, trim it before evaluating
        if (value.trim && value.trim() === ''){
            return validationMessage;
        }

        return undefined;

    }

    return validationMessage;

};