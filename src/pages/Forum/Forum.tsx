import React, {FC} from 'react'
import {Box, Typography, withStyles} from '@material-ui/core'
import {styles} from './styles'
import {Props} from './types'

const Forum: FC<Props> = (props: Props) => {
    const {classes} = props
    return (
        <Box className={classes.root}>
            <Typography variant='h4'>Someday there will be the bubbling forum here)))</Typography>
        </Box>
    )
}

export const ForumTSX = withStyles(styles)(Forum)
