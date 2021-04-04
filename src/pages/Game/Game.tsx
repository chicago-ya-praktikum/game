import React, {FC} from 'react'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core'
import {SokobanMain} from '../../components/SokobanMain/SokobanMain'
import {styles} from './styles'
import {Props} from './types'

const Game: FC<Props> = (props: Props) => {
    const {classes} = props

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className={classes.paper}>
                        {IS_CLIENT && <SokobanMain/>}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
export const GameTSX = withStyles(styles)(Game)
