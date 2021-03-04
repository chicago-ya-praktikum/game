import React, {FC, useCallback, useReducer} from 'react'
import {
    Box, Button, TextField, Typography, withStyles
} from '@material-ui/core'
import {styles} from './styles'
import {
    InputOnBlur, Props
} from './types'
import {AvatarUI} from '../../components/UI/AvatarUI/index'
import {ChangePasswordForm} from '../../components/UI/ChangePasswordForm/index'
import {reducer} from './reducer/reducer'
import {initialState} from './reducer/state'
import {fieldSet, fieldUpdateErr} from './reducer/actions'
import {checkFields} from '../../utils/checkFields'

const Profile: FC<Props> = (props: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {fields} = state
    const {
        firstName, secondName, displayName, login, email, phone
    } = fields
    const {classes} = props

    const inputBlurHandler = useCallback((e: InputOnBlur) => {
        e.preventDefault()
        dispatch(fieldSet(fields, String(e.target.name), String(e.target.value)))
    }, [fields])

    const submitForm = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const check = checkFields(fields)
        const {err, updateErr} = check
        if (err) {
            window.alertShow('error', 'Form is filled in incorrectly.')
            updateErr.forEach((name) => dispatch(fieldUpdateErr(fields, name)))
            // return
        }
    }, [fields])

    return (
        <Box className={classes.root}>
            <Box>
                <Typography align='center' variant='h5'>
                    Profile
                </Typography>
            </Box>
            <form className={classes.content}>
                <AvatarUI showBtn/>
                <TextField
                    id='firstName'
                    name='firstName'
                    label='First name (required)'
                    fullWidth
                    variant='outlined'
                    error={firstName.err}
                    onBlur={inputBlurHandler}
                />
                <TextField
                    id='secondName'
                    name='secondName'
                    label='Second name (required)'
                    fullWidth
                    variant='outlined'
                    error={secondName.err}
                    onBlur={inputBlurHandler}
                />
                <TextField
                    id='displayName'
                    name='displayName'
                    label='Display name (required)'
                    fullWidth
                    variant='outlined'
                    error={displayName.err}
                    onBlur={inputBlurHandler}
                />
                <TextField
                    id='login'
                    name='login'
                    label='Login (required)'
                    fullWidth
                    variant='outlined'
                    error={login.err}
                    onBlur={inputBlurHandler}
                />
                <TextField
                    id='email'
                    name='email'
                    label='email (required)'
                    fullWidth
                    variant='outlined'
                    error={email.err}
                    onBlur={inputBlurHandler}
                />
                <TextField
                    id='phone'
                    name='phone'
                    label='phone'
                    fullWidth
                    variant='outlined'
                    error={phone.err}
                    onBlur={inputBlurHandler}
                />
                <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    onClick={submitForm}
                >
                    Save
                </Button>

            </form>
            <Box className={classes.changePasswordForm}>
                <ChangePasswordForm/>
            </Box>

        </Box>
    )
}

export const ProfileTSX = withStyles(styles)(Profile)
