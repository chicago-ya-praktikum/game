import React, { FC, useCallback, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { styles } from './styles'
import { Props, Field, Setter } from './types'
import { validateInput } from '../../../utils/validateInput'

const ChangePasswordForm: FC<Props> = (props: Props) => {

    const [oldPassword, setOldPassword] = useState({val: '', err: true, required: true} as Field)
    const [newPassword, setNewPassword] = useState({val: '', err: true, required: true} as Field)
    const [newPasswordConfirm, setNewPasswordConfirm] = useState({val: '', err: true, required: true} as Field)
    const [showAlert, setShowAlert] = useState(false)
    const [open, setOpen] = useState(false);

    const { classes } = props

    const inputBlurHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, field: Field, setter: Setter) => {

        const curr = e.target.value as string
        if (curr === field.val) return
        const err = !validateInput(e.target.name as string, curr, field.required)
        if (err !== field.err) field.err = err
        field.val = curr
        setter({...field})

    }, [])

    const handleClickOpen = useCallback(() => {
        setOpen(true)
    }, [])

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [])

    const handleAlertClose = useCallback(() => {
        setShowAlert(false)
    }, [])

    const formIsValid = () => {

        let res = true
        const fields = [oldPassword, newPassword, newPasswordConfirm]
        fields.forEach((field: Field) => (
            res = res && !field.err
        ))
        return res

    }

    const handleSave = useCallback(() => {

        if (!formIsValid()) {
            setShowAlert(true)
            return
         }

        // TODO: save new password

        setOpen(false)
    }, [])

    return (
        <Box>
            <Button id='change-password_show' variant='outlined' color='primary' onClick={handleClickOpen}>
                Change password
            </Button>
            <Dialog
                open={open}
                aria-labelledby='change-password-dialog-title'
            >
                {showAlert && <Alert severity="error" onClose={handleAlertClose}>Fields are not filled in correctly!</Alert>}
                <DialogTitle id='change-password-dialog-title'>Change password</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <TextField
                        id='oldPassword'
                        name='oldPassword'
                        fullWidth
                        label='Old password (required)'
                        error={oldPassword.err}
                        onBlur={(e) => inputBlurHandler(e, oldPassword, setOldPassword)}/>
                    <TextField
                        id='newPassword'
                        name='newPassword'
                        fullWidth
                        label='New password (required)'
                        error={newPassword.err}
                        onBlur={(e) => inputBlurHandler(e, newPassword, setNewPassword)}/>
                    <TextField
                        id='newPasswordConfirm'
                        name='newPasswordConfirm'
                        fullWidth
                        label='New password confirm (required)'
                        error={newPasswordConfirm.err}
                        onBlur={(e) => inputBlurHandler(e, newPasswordConfirm, setNewPasswordConfirm)}/>
                </DialogContent>
                <DialogActions>
                    <Button id='change-password_save' autoFocus onClick={handleSave} color='primary'>
                        Save
                    </Button>
                    <Button id='change-password_cancel' onClick={handleClose} color='primary' autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
      </Box>
    )
}

export const ChangePasswordFormTSX = withStyles(styles)(ChangePasswordForm)
