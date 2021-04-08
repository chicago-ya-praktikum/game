import React from 'react'
// eslint-disable-next-line import/no-cycle
import {authView} from '../../HOCs/authView'
import {SignInForm} from '../../components/forms/SignInForm/index'

function SignIn() {
    return (
        <SignInForm/>
    )
}
export const SignInPage = authView(SignIn)
