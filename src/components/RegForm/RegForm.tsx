import React, {FC, useState} from 'react'
import {Button, withStyles} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import {useDispatch} from 'react-redux'
import {Actions} from '../../actions'
import {actionCreator} from '../../utils/actionCreator'
import {validateInput} from '../../utils/validateInput'
import {Auth} from '../../API'
import {styles} from './styles'
import {Props} from './types'

const RegForm: FC<Props> = (props: Props) => {
    const {classes} = props

    const [firstNameState, firstNameSetState] = useState({value: '', error: false})
    const [secondNameState, secondNameSetState] = useState({value: '', error: false})
    const [loginState, loginSetState] = useState({value: '', error: false})
    const [emailState, emailSetState] = useState({value: '', error: false})
    const [passwordState, passwordSetState] = useState({value: '', error: false})
    const [phoneState, phoneSetState] = useState({value: '', error: false})

    const formIsValid = () => !firstNameState.error
        && !secondNameState.error
        && !loginState.error
        && !emailState.error
        && !passwordState.error
        && !phoneState.error
        && firstNameState.value !== ''
        && secondNameState.value !== ''
        && loginState.value !== ''
        && emailState.value !== ''
        && passwordState.value !== ''
        && phoneState.value !== ''

    type SetStateRule = (...args: any) => void
    type FieldName = string

    const setState: Record<FieldName, SetStateRule> = {
        first_name: firstNameSetState,
        second_name: secondNameSetState,
        login: loginSetState,
        password: passwordSetState,
        email: emailSetState,
        phone: phoneSetState
    }

    const color = 'primary'

    const formElements = [
        {
            error: firstNameState.error,
            label: 'First name',
            name: 'first_name',
            type: 'text'
        },
        {
            error: secondNameState.error,
            label: 'Second name',
            name: 'second_name',
            type: 'text'
        },
        {
            error: loginState.error,
            label: 'Login',
            name: 'login',
            type: 'text'
        },
        {
            error: emailState.error,
            label: 'Email',
            name: 'email',
            type: 'text'
        },
        {
            error: passwordState.error,
            label: 'Password',
            name: 'password',
            type: 'password'
        },
        {
            error: phoneState.error,
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
            firstNameState,
            secondNameState,
            loginState,
            emailState,
            passwordState,
            phoneState
        ]
    )

    const dispatch = useDispatch()

    const userSignUp = (
        data: {
            first_name: string,
            second_name: string,
            login: string,
            email: string,
            password: string,
            phone: string
        }
    ) => {
        Auth.signUp(data).then(response => dispatch(actionCreator(Actions.SIGNIN, response)))
    }

    const submitForm = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            if (formIsValid()) {
                userSignUp({
                    first_name: firstNameState.value,
                    second_name: secondNameState.value,
                    login: loginState.value,
                    email: emailState.value,
                    password: passwordState.value,
                    phone: phoneState.value
                })
            } else {
                // нужно нормальное сообщение об ошибке
                throw new Error('form is invalid')
            }
        }, [
            firstNameState,
            secondNameState,
            loginState,
            emailState,
            passwordState,
            phoneState
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
                            variant='outlined'
                            type={input.type}
                            onChange={(e) => inputHandler(e)}
                        />
                    ))
                }
                <Button variant='contained' color='primary' type='submit' onClick={(e) => submitForm(e)}>SignUp</Button>
            </form>
        </div>
    )
}
export const RegFormTSX = withStyles(styles)(RegForm)
