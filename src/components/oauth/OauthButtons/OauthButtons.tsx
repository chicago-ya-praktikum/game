import React, {FC, useCallback} from 'react'
import {Box, Button, withStyles} from '@material-ui/core'
import {Props} from './types'
import {styles} from './styles'
import {apiGetYandexServiceId} from '../../../services/API/index'

const OauthButtons: FC<Props> = (props: Props) => {
    const {classes} = props
    const signInByYandex = useCallback(
        async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const reqId = await apiGetYandexServiceId()
            if (!reqId) window.alertShow('error', 'Could not auth by Yandex!')
            const REDIRECT_URI = 'https://local.ya-praktikum.tech:5000'
            window.location.assign(
                `https://oauth.yandex.ru/authorize?response_type=code&client_id=${reqId.data.service_id}&redirect_uri=${REDIRECT_URI}`
            )
        }, []
    )

    return (
        <Box className={classes.root}>
            <Button
                variant='contained'
                color='inherit'
                type='submit'
                onClick={signInByYandex}
            >
                SignIn by Yandex
            </Button>
        </Box>
    )
}

export const OauthButtonsTSX = withStyles(styles)(OauthButtons)