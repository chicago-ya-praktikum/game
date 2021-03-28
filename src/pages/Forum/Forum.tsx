import React, {FC} from 'react'
import {Box, Typography, withStyles} from '@material-ui/core'
import {styles} from './styles'
import {Props} from './types'
import {PageMeta} from '../../components/PageMeta/PageMeta'

const Forum: FC<Props> = (props: Props) => {
    const {classes} = props
    return (
        <>
            <PageMeta
                title='Forum'
                description='Some description'
            />
            <Box className={classes.root}>
                <Typography variant='h4'>Someday there will be the bubbling forum here)))</Typography>
            </Box>
        </>
    )
}

export const ForumTSX = withStyles(styles)(Forum)
