import React, {FC} from 'react'
import {authStatusSelector} from '../store/selectors'
// eslint-disable-next-line import/no-cycle
import {SignInPage} from '../pages/SignIn/SignIn'

export function privateRoute(this: any, WrappedComponent: React.ComponentType) {
    const PrivateComponent: FC = () => {
        const authStatus = authStatusSelector()
        return (
            <>
                {authStatus ? <WrappedComponent/> : <SignInPage/>}
            </>
        )
    }
    return PrivateComponent
}
