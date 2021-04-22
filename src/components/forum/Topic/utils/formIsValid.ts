import {checkFields} from '../../../../utils/checkFields'
import {setFieldErr} from '../reducer/actions'
import {Fields} from '../reducer/types'

export const formIsValid = (fields: Fields, dispatch: any) => {
    const check = checkFields(fields)
    const {err, updateErr} = check
    if (err) {
        window.alertShow('error', 'Form is filled in incorrectly.')
        updateErr.forEach((name) => dispatch(setFieldErr(fields, name)))
    }
    return !err
}
