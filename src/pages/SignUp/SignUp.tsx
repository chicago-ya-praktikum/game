import React from 'react'
import {authView} from '../../HOCs/authView'
import {RegForm} from '../../components/forms/RegForm/index'
import {PageMeta} from '../../components/PageMeta/PageMeta'

function SignUp() {
    return (
        <>
            <PageMeta
                title='Signup page'
                description='Some description'
            />
            <RegForm/>
        </>
    )
}
export const SignUpPage = authView(SignUp)
