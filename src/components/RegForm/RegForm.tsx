/* eslint-disable @typescript-eslint/naming-convention */
import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import {Button} from '@material-ui/core'
import {validateInput} from '../../utils/validateInput'
import {Auth} from '../../API'

export function RegForm() {
    const [first_name_state, first_name_setState] = useState({value: '', error: false})
    const [second_name_state, second_name_setState] = useState({value: '', error: false})
    const [login_state, login_setState] = useState({value: '', error: false})
    const [email_state, email_setState] = useState({value: '', error: false})
    const [password_state, password_setState] = useState({value: '', error: false})
    const [phone_state, phone_setState] = useState({value: '', error: false})

    type SetStateRule = (...args: any) => void
    type FieldName = string

    const setState: Record<FieldName, SetStateRule> = {
        first_name: (value: string, error: boolean) => first_name_setState({value, error}),
        second_name: (value: string, error: boolean) => second_name_setState({value, error}),
        login: (value: string, error: boolean) => login_setState({value, error}),
        password: (value: string, error: boolean) => password_setState({value, error}),
        email: (value: string, error: boolean) => email_setState({value, error}),
        phone: (value: string, error: boolean) => phone_setState({value, error})
    }

    const color = 'primary'

    const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {value, name} = e.target
        const status = validateInput(name, value)
        if (status) {
            setState[name](value, true)
        } else {
            setState[name](value, false)
        }
    }

    const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        Auth.signUp(
            first_name_state.value,
            second_name_state.value,
            login_state.value,
            email_state.value,
            password_state.value,
            phone_state.value
        )
            .then((data: any) => data)
    }

    return (
        <div className="form-wrapper">
            <div className="container">
                <div className="form-container">
                    <form className="form" noValidate autoComplete="off">
                        <TextField error={first_name_state.error} color={color} label="First name" name="first_name" variant="outlined" onChange={(e) => inputHandler(e)}/>
                        <TextField error={second_name_state.error} color={color} label="Second name" name="second_name" variant="outlined" onChange={(e) => inputHandler(e)}/>
                        <TextField error={login_state.error} color={color} label="Login" name="login" variant="outlined" onChange={(e) => inputHandler(e)}/>
                        <TextField error={email_state.error} color={color} label="E-mail" name="email" variant="outlined" onChange={(e) => inputHandler(e)}/>
                        <TextField error={password_state.error} color={color} label="Password" name="password" variant="outlined" type="password" onChange={(e) => inputHandler(e)}/>
                        <TextField error={phone_state.error} color={color} label="Phone" variant="outlined" name="phone" onChange={(e) => inputHandler(e)}/>
                        <Button variant="contained" color="primary" type="submit" onClick={(e) => submitForm(e)}>SignUp</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
