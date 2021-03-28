import React, {FC} from 'react'
import {
    Box, Button, Typography, withStyles
} from '@material-ui/core'
import {styles} from './styles'
import {Props} from './types'
import {PageMeta} from '../../components/PageMeta/PageMeta'

const Err: FC<Props> = (props: Props) => {
    const {
        classes, error, errorInfo, hideBtn
    } = props

    return (
        <>
            <PageMeta
                title='Error 404'
                description='Some description'
            />
            <Box className={classes.content}>
                <Typography
                    align='center'
                    variant='h3'
                    color='error'
                >
                    {error || 'Sorry'}
                </Typography>
                <Typography
                    align='center'
                    variant='h5'
                >
                    {errorInfo || 'Something went wrong'}
                </Typography>
                { !hideBtn
                && (
                    <Button
                        className={classes.buttonBack}
                        color='primary'
                    >
                        Back
                    </Button>
                ) }
            </Box>
        </>
    )
}

export const ErrTSX = withStyles(styles)(Err)
