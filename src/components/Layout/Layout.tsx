import React, {FC} from 'react'
import {
    AppBar, Button, Container, Grid, Typography, withStyles
} from '@material-ui/core'
import {Props} from './types'
import {styles} from './styles'

const Layout: FC<Props> = (props: Props) => {
    const {children, classes} = props
    return (
        <>
            <AppBar position='relative'>
                <Container fixed>
                    <Grid container spacing={3} alignItems='center'>
                        <Grid item sm={3}/>
                        <Grid item sm={6}>
                            <Typography align='center' variant='h5'>
                                Page tittle
                            </Typography>
                        </Grid>
                        <Grid className={classes.gridRight} item sm={3}>
                            <Button color='inherit'>Log in</Button>
                            <Button color='inherit'>Sign up</Button>
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
            {children}
        </>
    )
}
export const LayoutTSX = withStyles(styles)(Layout)
