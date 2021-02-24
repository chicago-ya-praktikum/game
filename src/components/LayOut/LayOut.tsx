/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import {Typography, withStyles} from '@material-ui/core'
import {SokobanMain} from '../SokobanMain/SokobanMain'
import {styles} from './styles'
import {Props} from './types'
import {LogoutButton} from '../LogoutButton/LogOutButton'

const LayOut: FC<Props> = (props: Props) => {
    const {classes} = props

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <div className={classes.paper}>
                        <Link><Typography variant="h4" color="primary" gutterBottom>Меню</Typography></Link>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div className={classes.paper}>
                        <Typography variant="h2" color="primary" gutterBottom>SOKOBAN</Typography>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div className={classes.paper}>
                        <LogoutButton/>
                        {/* <Link><Typography variant="h4" color="primary" gutterBottom>Выход</Typography></Link> */}
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className={classes.paper}>
                        <SokobanMain/>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
export const LayOutTSX = withStyles(styles)(LayOut)
