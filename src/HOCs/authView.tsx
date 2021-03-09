import React, {FC} from 'react'
import {useSelector} from 'react-redux'
// eslint-disable-next-line import/no-cycle
import {Game} from '../pages/Game/index'

export function authView(this: any, WrappedComponent: React.ComponentType) {
    const LoggedInComponent: FC = () => {
        // eslint-disable-next-line max-len
        const authStatus = useSelector((state: {userAsync: any, user: any}) => state.userAsync.authStatus || state.user.authStatus)
        return (
            <>
                {!authStatus ? <WrappedComponent/> : <Game/>}
            </>
        )
    }
    return LoggedInComponent
}
