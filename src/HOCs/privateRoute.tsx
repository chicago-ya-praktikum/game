import React, {FC} from 'react'
import {useSelector} from 'react-redux'
// eslint-disable-next-line import/no-cycle
import {SignInPage} from '../pages/SignIn/SignIn'

export function privateRoute(this: any, WrappedComponent: React.ComponentType) {
    const PrivateComponent: FC = () => {
        // eslint-disable-next-line max-len
        const authStatus = useSelector((state: {userAsync: any, user: any}) => state.userAsync.authStatus || state.user.authStatus)
        return (
            <>
                {authStatus ? <WrappedComponent/> : <SignInPage/>}
            </>
        )
    }
    return PrivateComponent
}
