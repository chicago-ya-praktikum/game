import {FormField} from '../../../../types/formTypes'
import {checkFields} from '../../../../utils/checkFields'

export const checkForm = (fields: {[key: string]: FormField}): {
    err: Boolean, updateErr: string[], message: string
} => {
    const res = checkFields(fields)
    let {err} = res
    const {updateErr} = res
    let message: string = ''
    if (fields.newPassword.val !== fields.confirmPassword.val) {
        err = true
        message = message.concat(' The new password and its confirmation are not equal.')
    }
    return {err, updateErr, message}
}
