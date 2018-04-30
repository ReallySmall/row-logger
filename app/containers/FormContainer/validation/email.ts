export const email = (value: any) => {

    const validationMessage: string = 'Must be an email address';

    if (value) {

        return undefined;

    }

    return validationMessage;

};