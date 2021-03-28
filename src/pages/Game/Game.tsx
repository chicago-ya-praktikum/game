import React, {FC} from 'react'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core'
import {SokobanMain} from '../../components/SokobanMain/SokobanMain'
import {styles} from './styles'
import {Props} from './types'
import {PageMeta} from '../../components/PageMeta/PageMeta'

const Game: FC<Props> = (props: Props) => {
    const {classes} = props

    return (
        <>
            <PageMeta
                title='Game page'
                description='Some description'
            />
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className={classes.paper}>
                            <SokobanMain/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
export const GameTSX = withStyles(styles)(Game)
