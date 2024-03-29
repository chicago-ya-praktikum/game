/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/naming-convention */
import React, {FC, useState} from 'react'
import {Box, Button, withStyles} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import {useDispatch} from 'react-redux'
import {validateInput} from '../../../utils/validateInput'
import {Auth} from '../../../API'
import {styles} from './styles'
import {Props} from './types'
import {Actions} from '../../../store/actions'
import {actionCreator} from '../../../utils/actionCreator'
import {OauthButtons} from '../../oauth/OauthButtons/index'

const SignInForm: FC<Props> = (props: Props) => {
    const {classes} = props

    const [loginState, loginSetState] = useState({value: '', error: false})
    const [passwordState, passwordSetState] = useState({value: '', error: false})

    const formIsValid = () => !loginState.error
        && !passwordState.error
        && loginState.value !== ''
        && passwordState.value !== ''

    type SetStateRule = (...args: any) => void
    type FieldName = string

    const setState: Record<FieldName, SetStateRule> = {
        login: loginSetState,
        password: passwordSetState
    }

    const color = 'primary'

    const formElements = [
        {
            error: loginState.error,
            label: 'Login',
            name: 'login',
            type: 'text'
        },
        {
            error: passwordState.error,
            label: 'Password',
            name: 'password',
            type: 'password'
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
            loginState,
            passwordState
        ]
    )

    const dispatch = useDispatch()

    const userSignIn = (
        data: Partial<{
            login: string;
            password: string;
        }>
    ) => {
        Auth.signIn(data).then(response => dispatch(actionCreator(Actions.SIGNIN, response)))
    }

    const submitForm = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            if (formIsValid()) {
                userSignIn({
                    login: loginState.value,
                    password: passwordState.value
                })
            } else {
            // нужно нормальное сообщение об ошибке
                throw new Error('form is invalid')
            }
        }, [
            loginState,
            passwordState
        ]
    )

    return (
        <div className={classes.root}>
            <form className={classes.form} noValidate autoComplete='off'>
                {
                    formElements.map((input) => (
                        <TextField
                            key={input.name}
                            fullWidth
                            margin='normal'
                            error={input.error}
                            color={color}
                            label={input.label}
                            name={input.name}
                            // variant='outlined'
                            type={input.type}
                            onChange={(e) => inputHandler(e)}
                        />
                    ))
                }
                <Box>
                    <Button variant='contained' color='primary' type='submit' onClick={(e) => submitForm(e)}>SignIn</Button>
                    <OauthButtons/>
                </Box>
            </form>
        </div>
    )
}
export const SignInFormTSX = withStyles(styles)(SignInForm)
