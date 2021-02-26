import React, {FC} from 'react'
import {useSelector} from 'react-redux'
import {LayOutTSX} from '../components/LayOut/LayOut'

export function authView(this: any, WrappedComponent: React.ComponentType) {
    const LoggedInComponent: FC = () => {
        const authStatus = useSelector(state => state.user.authStatus)
        return (
            <>
                {!authStatus ? <WrappedComponent/> : <LayOutTSX/>}
            </>
        )
    }
    return LoggedInComponent
}
