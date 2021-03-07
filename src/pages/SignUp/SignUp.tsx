import React from 'react'
import {authView} from '../../utils/authView'
import {RegForm} from '../../components/forms/RegForm/index'

function SignUp() {
    return (
        <RegForm/>
    )
}
export const SignUpPage = authView(SignUp)
