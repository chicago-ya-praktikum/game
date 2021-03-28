import React from 'react'
import {authView} from '../../HOCs/authView'
import {SignInForm} from '../../components/forms/SignInForm/index'
import {PageMeta} from '../../components/PageMeta/PageMeta'

function SignIn() {
    return (
        <>
            <PageMeta
                title='Sign in page'
                description='Some description'
            />
            <SignInForm/>
        </>
    )
}
export const SignInPage = authView(SignIn)
