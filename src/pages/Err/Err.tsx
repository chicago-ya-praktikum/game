import React, { FC } from 'react'
import { Box, Button, Typography, withStyles } from '@material-ui/core'
import { styles } from './styles'
import { Props } from './types'

const Err: FC<Props> = (props: Props) => {
    
    const { classes } = props

    return (
        <Box className={classes.content}>
            <Typography 
                className={classes.title}
                align='center'
                variant='h1'
            >
                { props.error ? props.error : 'Sorry' }
            </Typography>
            <Typography 
                align='center'
                variant='h3'
            >
                { props.errorInfo ? props.errorInfo : 'Something went wrong' }
            </Typography>
            { props.hideBtn ? null : 
                <Button
                    className={classes.buttonBack}
                    color='primary'
                >
                    Back
                </Button> }
        </Box>
    )
}

export default withStyles(styles)(Err)