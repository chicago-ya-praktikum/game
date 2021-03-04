import React, {
    FC, MouseEvent, useCallback, useReducer
} from 'react'
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles
} from '@material-ui/core'
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

const ChangePasswordForm: FC<Props> = (props: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {open, fields} = state
    const {oldPassword, newPassword, confirmPassword} = fields
    const {classes} = props

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
        const check = checkForm(state.fields)
        const {err, message, updateErr} = check
        if (err) {
            if (message) window.alertShow('error', 'Form is filled in incorrectly.'.concat(message))
            updateErr.forEach((name) => dispatch(fieldUpdateErr(fields, name)))
            // return
        }
        // dispatch(asyncSavePassword(fields))
    }, [fields])

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
                    <TextField
                        id='oldPassword'
                        name='oldPassword'
                        fullWidth
                        label='Old password (required)'
                        error={oldPassword.err}
                        defaultValue={oldPassword.val}
                        onBlur={inputBlurHandler}
                    />
                    <TextField
                        id='newPassword'
                        name='newPassword'
                        fullWidth
                        label='New password (required)'
                        error={newPassword.err}
                        defaultValue={newPassword.val}
                        onBlur={inputBlurHandler}
                    />
                    <TextField
                        id='confirmPassword'
                        name='confirmPassword'
                        fullWidth
                        label='Confirm password (required)'
                        error={confirmPassword.err}
                        defaultValue={confirmPassword.val}
                        onBlur={inputBlurHandler}
                    />
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
