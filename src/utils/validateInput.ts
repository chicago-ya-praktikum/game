/* eslint-disable no-unused-expressions */
/* eslint-disable no-case-declarations */
declare global {
    interface Window {
        validateInput: (input: HTMLInputElement) => boolean
    }
}

export function validateInput(inputName: string | number, inputValue: any) {
    let status = false;

	type ValidationRule = (...args: any) => boolean;
	type FieldName = string;

	const validationRules: Record<FieldName, ValidationRule> = {
	    first_name: (value) => value.length > 4,
	    second_name: (value) => value.length > 4,
	    display_name: (value) => value.length > 4,
	    login: (value) => value.length > 4,
	    message: (value) => value.length > 4,
	    title: (value) => value.length > 4,
	    password: (value) => value.length > 6,
	    oldPassword: (value) => value.length > 6,
	    newPassword: (value) => value.length > 6,
	    email: (value) => {
	        const regexpEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
	        return regexpEmail.test(value);
	    },
	    phone: (value) => {
	        const regexpPhone = /\+\d{1,3}\s?\(\d{3}\)\s?\d{3}(-\d{2}){2}/g;
	        return regexpPhone.test(value)
	    }
	}
	status = validationRules[inputName](inputValue)

	return status;
}
