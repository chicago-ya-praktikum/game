import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import {Button} from '@material-ui/core'
import {validateInput} from '../../utils/validateInput'
import {Auth} from '../../API'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(3),
            width: '50ch',
            display: 'flex',
            flexDirection: 'column'
        }
    }
}));

export function RegForm() {
    const [state, setState] = useState({
        first_name: {value: '', error: false},
        second_name: {value: '', error: false},
        login: {value: '', error: false},
        email: {value: '', error: false},
        password: {value: '', error: false},
        confirm_password: {value: '', error: false},
        phone: {value: '', error: false}
    })

    const color = 'primary'

    const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const inputValue = e.target.value as string
        const inputName = e.target.name as string
        const status = validateInput(e.target.name, inputValue)
        console.log(status)
        if (status) {
            setState({
                ...state,
                [`${inputName}`]: {
                    value: inputValue,
                    error: false
                }
            })
        } else {
            setState({
                ...state,
                [`${inputName}`]: {
                    value: '',
                    error: !!inputValue
                }
            })
            console.log('invalid')
        }
    }

    const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        Auth.signUp(
            state.first_name.value,
            state.second_name.value,
            state.login.value,
            state.email.value,
            state.password.value,
            state.phone.value
        )
            .then((data: any) => {
                console.log(data)
            })
    }

    const classes = useStyles()

    return (
        <div className="form-wrapper">
            <div className="container">
                <div className="form-container">
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField error={state.first_name.error} color={color} id="outlined-basic" label="First name" name="first_name" variant="outlined" onChange={(e) => inputHandler(e)}/>
                        <TextField error={state.second_name.error} color={color} id="outlined-basic" label="Second name" name="second_name" variant="outlined" onChange={(e) => inputHandler(e)}/>
                        <TextField error={state.login.error} color={color} id="outlined-basic" label="Login" name="login" variant="outlined" onChange={(e) => inputHandler(e)}/>
                        <TextField error={state.email.error} color={color} id="outlined-basic" label="E-mail" name="email" variant="outlined" onChange={(e) => inputHandler(e)}/>
                        <TextField error={state.password.error} color={color} id="outlined-basic" label="Password" name="password" variant="outlined" type="password" onChange={(e) => inputHandler(e)}/>
                        <TextField error={state.confirm_password.error} color={color} id="outlined-basic" label="Confirm password" name="confirm_password" variant="outlined" type="password" onChange={(e) => inputHandler(e)}/>
                        <TextField error={state.phone.error} color={color} id="outlined-basic" label="Phone" variant="outlined" name="phone" onChange={(e) => inputHandler(e)}/>
                        <Button variant="contained" color="primary" type="submit" onClick={(e) => submitForm(e)}>SignUp</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
