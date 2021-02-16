/* eslint-disable @typescript-eslint/naming-convention */
import React, {FC, useState} from 'react'
import {Button, withStyles} from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import {validateInput} from '../../utils/validateInput'
import {Auth} from '../../API'
import {styles} from './styles'
import {Props} from './types'

const RegForm: FC<Props> = (props: Props) => {
    const {classes} = props

    const [first_name_state, first_name_setState] = useState({value: '', error: false})
    const [second_name_state, second_name_setState] = useState({value: '', error: false})
    const [login_state, login_setState] = useState({value: '', error: false})
    const [email_state, email_setState] = useState({value: '', error: false})
    const [password_state, password_setState] = useState({value: '', error: false})
    const [phone_state, phone_setState] = useState({value: '', error: false})

    const formIsValid = () => !first_name_state.error
        && !second_name_state.error
        && !login_state.error
        && !email_state.error
        && !password_state.error
        && !phone_state.error
        && first_name_state.value !== ''
        && second_name_state.value !== ''
        && login_state.value !== ''
        && email_state.value !== ''
        && password_state.value !== ''
        && phone_state.value !== ''

    type SetStateRule = (...args: any) => void
    type FieldName = string

    const setState: Record<FieldName, SetStateRule> = {
        first_name: first_name_setState,
        second_name: second_name_setState,
        login: login_setState,
        password: password_setState,
        email: email_setState,
        phone: phone_setState
    }

    const color = 'primary'

    const formElements = [
        {
            error: first_name_state.error,
            label: 'First name',
            name: 'first_name',
            type: 'text'
        },
        {
            error: second_name_state.error,
            label: 'Second name',
            name: 'second_name',
            type: 'text'
        },
        {
            error: login_state.error,
            label: 'Login',
            name: 'login',
            type: 'text'
        },
        {
            error: email_state.error,
            label: 'Email',
            name: 'email',
            type: 'text'
        },
        {
            error: password_state.error,
            label: 'Password',
            name: 'password',
            type: 'password'
        },
        {
            error: phone_state.error,
            label: 'Phone',
            name: 'phone',
            type: 'text'
        }
    ]

    const inputHandler = React.useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            const {value, name} = e.target
            const status = validateInput(name, value)
            if (status || value === '') {
                setState[name]({value, error: false})
            } else {
                setState[name]({value, error: true})
            }
        }, [
            first_name_state,
            second_name_state,
            login_state,
            email_state,
            password_state,
            phone_state
        ]
    )

    const submitForm = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            if (formIsValid()) {
                Auth.signUp({
                    first_name: first_name_state.value,
                    second_name: second_name_state.value,
                    login: login_state.value,
                    email: email_state.value,
                    password: password_state.value,
                    phone: phone_state.value
                })
                    .then((data: any) => data)
            } else {
                // нужно нормальное сообщение об ошибке
                throw new Error('form is invalid')
            }
        }, [
            first_name_state,
            second_name_state,
            login_state,
            email_state,
            password_state,
            phone_state
        ]
    )

    return (
        <form className={classes.root} noValidate autoComplete="off">
            {
                formElements.map((input) => (
                    <TextField
                        key={input.name}
                        fullWidth
                        margin="normal"
                        error={input.error}
                        color={color}
                        label={input.label}
                        name={input.name}
                        variant="outlined"
                        type={input.type}
                        onChange={(e) => inputHandler(e)}
                    />
                ))
            }
            <Button variant="contained" color="primary" type="submit" onClick={(e) => submitForm(e)}>SignUp</Button>
        </form>
    )
}
export const RegFormTSX = withStyles(styles)(RegForm)
