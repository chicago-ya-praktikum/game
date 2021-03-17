import React, {FC} from 'react'
// eslint-disable-next-line import/no-cycle
import {Game} from '../pages/Game/index'
import {authStatusSelector} from '../store/selectors'

export function authView(this: any, WrappedComponent: React.ComponentType) {
    const LoggedInComponent: FC = () => {
        const authStatus = authStatusSelector()
        return (
            <>
                {!authStatus ? <WrappedComponent/> : <Game/>}
            </>
        )
    }
    return LoggedInComponent
}
