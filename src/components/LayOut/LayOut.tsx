import React from 'react'
import Grid from '@material-ui/core/Grid'
import {SokobanMain} from '../SokobanMain/SokobanMain'

export function LayOut() {
    return (
        <Grid container direction="column" className="root">
            <Grid container spacing={3}>
                <Grid item xs={2} className="root">
                    <div className="paper">
                        <h3>Меню</h3>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div className="paper">
                        <h1>SOKOBAN</h1>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div className="paper">
                        <h3>Профиль/выход</h3>
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className="paper">
                        <SokobanMain/>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}
