/* eslint-disable no-unused-expressions */
/* eslint-disable no-case-declarations */
declare global {
    interface Window {
        validateInput: (input: HTMLInputElement) => boolean
    }
}

function minLength(value: string, length: number) {
    return value.length > length
}

export function validateInput(inputName: string | number, inputValue: any) {
    let status = false;

	type ValidationRule = (...args: any) => boolean;
	type FieldName = string;

	const validationRules: Record<FieldName, ValidationRule> = {
	    first_name: (value) => minLength(value, 4),
	    second_name: (value) => minLength(value, 4),
	    display_name: (value) => minLength(value, 4),
	    login: (value) => minLength(value, 4),
	    message: (value) => minLength(value, 4),
	    title: (value) => minLength(value, 4),
	    password: (value) => minLength(value, 6),
	    oldPassword: (value) => minLength(value, 6),
	    newPassword: (value) => minLength(value, 6),
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
