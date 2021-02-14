/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import {SokobanMain} from '../SokobanMain/SokobanMain'

export function LayOut() {
    return (
        <div className="root">
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <div className="paper">
                        <Link><h3>Меню</h3></Link>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div className="paper">
                        <h1>SOKOBAN</h1>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div className="paper">
                        <Link><h3>Профиль/выход</h3></Link>
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
        </div>
    );
}
