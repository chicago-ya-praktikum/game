import React from 'react'
import {authView} from '../../HOCs/authView'
import {SignInForm} from '../../components/forms/SignInForm/index'

function SignIn() {
    return (
        <SignInForm/>
    )
}
export const SignInPage = authView(SignIn)
