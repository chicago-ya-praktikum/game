import React from 'react'
import Grid from '@material-ui/core/Grid'
import {SokobanMain} from '../SokobanMain/SokobanMain'

export function LayOut() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={2}>
                <div className="paper">Меню</div>
            </Grid>
            <Grid item xs={8}>
                <div className="paper">
                    <h1>SOKOBAN</h1>
                </div>
            </Grid>
            <Grid item xs={2}>
                <div className="paper">Профиль/выход</div>
            </Grid>
            <Grid item xs={12}>
                <div className="paper">
                    <SokobanMain/>
                </div>
            </Grid>
        </Grid>
    );
}
