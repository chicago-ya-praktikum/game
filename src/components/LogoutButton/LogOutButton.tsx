import {Button, Typography} from '@material-ui/core';
import React, {FC} from 'react'
import {useDispatch} from 'react-redux'
import {Actions} from '../../actions'
import {Auth} from '../../API'
import {actionCreator} from '../../utils/actionCreator'

export const LogoutButton: FC = () => {
    const dispatch = useDispatch()

    const userLogout = () => {
        const getResponse = () => Auth.logout().then(() => dispatch(actionCreator(Actions.LOGOUT)))
        return getResponse()
    }

    return (
        <Button onClick={() => userLogout()}><Typography variant="h4" color="primary" gutterBottom>Выход</Typography></Button>
    )
}
