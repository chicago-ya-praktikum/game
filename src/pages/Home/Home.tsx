import React, {FC, MouseEvent, useCallback} from 'react'
import {
    Box, Button, withStyles
} from '@material-ui/core'
import {withRouter} from 'react-router-dom'
import {styles} from './styles'
import {Props} from './types'
// eslint-disable-next-line import/no-cycle
import {
    routeGame, routeForum, routeProfile, routeLeaderboard
} from '../../components/routers/MainRouter/constants'

const Home: FC<Props> = (props: Props) => {
    const {classes, history} = props
    const onClick = useCallback((e: MouseEvent<HTMLButtonElement>, path: string) => {
        e.preventDefault()
        history.push(path)
    }, [history])
    return (
        <Box className={classes.root}>
            <Button
                size='large'
                onClick={useCallback((e) => onClick(e, routeGame), [onClick])}
            >
                Game
            </Button>
            <Button
                size='large'
                onClick={useCallback((e) => onClick(e, routeForum), [onClick])}
            >
                Forum
            </Button>
            <Button
                size='large'
                onClick={useCallback((e) => onClick(e, routeProfile), [onClick])}
            >
                Profile
            </Button>
            <Button
                size='large'
                onClick={useCallback((e) => onClick(e, routeLeaderboard), [onClick])}
            >
                Leaderboard
            </Button>
        </Box>
    )
}

export const HomeTSX = withStyles(styles)(withRouter(Home))
