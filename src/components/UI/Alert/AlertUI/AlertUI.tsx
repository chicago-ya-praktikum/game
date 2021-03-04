import React, {FC} from 'react'
import {Box, withStyles} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {styles} from './styles'
import {Props} from './types'
import {useAlert} from '../AlertProvider/AlertProvider'

const AlertUI: FC<Props> = (props: Props) => {
    const {classes} = props

    const alert = useAlert()
    const {visible, severity, text} = alert

    if (!visible) return null

    return (
        <Box className={classes.root}>
            <Alert severity={severity} onClose={window.alertHide}>{text}</Alert>
        </Box>
    )
}

export const AlertUITSX = withStyles(styles)(AlertUI)
