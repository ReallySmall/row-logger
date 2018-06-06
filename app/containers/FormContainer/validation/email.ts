export const email = (value: any) => {

    const validationMessage: string = 'Must be an email address';

    if (value) {

		const isEmailAddress: boolean =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);

        if(isEmailAddress){
        	return undefined;
        }

    }

    return validationMessage;

};