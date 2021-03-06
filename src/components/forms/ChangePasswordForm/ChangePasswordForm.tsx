import React, {
    FC, MouseEvent, useCallback, useReducer
} from 'react'
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, withStyles
} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {styles} from './styles'
import {
    InputOnBlur,
    Props
} from './types'
import {reducer} from './reducer/reducer'
import {initialState} from './reducer/state'
import {
    fieldSet, fieldUpdateErr, formClose, formOpen
} from './reducer/actions'
import {checkForm} from './utils/checkForm'
import {InputForm} from '../../UI/inputs/InputForm/index'
import {putPassword} from '../../../store/reducers/user/actions'

const ChangePasswordForm: FC<Props> = (props: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {open, fields} = state
    const {oldPassword, newPassword, confirmPassword} = fields
    const {classes} = props
    const dispatchStore = useDispatch()

    const inputBlurHandler = useCallback((e: InputOnBlur) => {
        e.preventDefault()
        dispatch(fieldSet(fields, String(e.target.name), String(e.target.value)))
    }, [fields])

    const handleClickOpen = useCallback(() => dispatch(formOpen()), [])

    const handleCancel = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(formClose())
        window.alertHide()
    }, [])

    const handleSave = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const check = checkForm(fields)
        const {err, message, updateErr} = check
        if (err) {
            window.alertShow('error', 'Form is filled in incorrectly.'.concat(message))
            updateErr.forEach((name) => dispatch(fieldUpdateErr(fields, name)))
            return
        }
        dispatchStore(putPassword(oldPassword.val, newPassword.val))
    }, [dispatchStore, fields, newPassword.val, oldPassword.val])

    return (
        <Box>
            <Button id='change-password_show' variant='outlined' color='primary' onClick={handleClickOpen}>
                Change password
            </Button>
            <Dialog
                open={open}
                aria-labelledby='change-password-dialog-title'
            >
                <DialogTitle id='change-password-dialog-title'>Change password</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <InputForm field={oldPassword} onBlur={inputBlurHandler}/>
                    <InputForm field={newPassword} onBlur={inputBlurHandler}/>
                    <InputForm field={confirmPassword} onBlur={inputBlurHandler}/>
                </DialogContent>
                <DialogActions>
                    <Button id='change-password_save' autoFocus onClick={handleSave} color='primary'>
                        Save
                    </Button>
                    <Button id='change-password_cancel' onClick={handleCancel} color='primary' autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export const ChangePasswordFormTSX = withStyles(styles)(ChangePasswordForm)
