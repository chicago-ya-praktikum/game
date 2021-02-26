import React, {FC} from 'react'
import {useSelector} from 'react-redux'
import {SignInPage} from '../pages/SignIn/SignIn'

export function privateRoute(this: any, WrappedComponent: React.ComponentType) {
    const PrivateComponent: FC = () => {
        const authStatus = useSelector(state => state.user.authStatus)
        return (
            <>
                {authStatus ? <WrappedComponent/> : <SignInPage/>}
            </>
        )
    }
    return PrivateComponent
}
