import React from 'react'
import {authView} from '../../utils/authView'
import {SignInForm} from '../../components/forms/SignInForm/index'

function SignIn() {
    return (
        <SignInForm/>
    )
}
export const SignInPage = authView(SignIn)
