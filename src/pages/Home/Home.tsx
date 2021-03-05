import React, {FC, MouseEvent, useCallback} from 'react'
import {
    Box, Button, withStyles
} from '@material-ui/core'
import {withRouter} from 'react-router-dom'
import {styles} from './styles'
import {Props} from './types'

const Home: FC<Props> = (props: Props) => {
    const {classes, history} = props
    const onClick = useCallback((e: MouseEvent<HTMLButtonElement>, path: string) => {
        e.preventDefault()
        history.push(path)
    }, [history])
    return (
        <Box className={classes.root}>
            <Button id='btn-geme' onClick={useCallback((e) => onClick(e, 'game'), [onClick])}>Game</Button>
            <Button id='btn-forum' onClick={useCallback((e) => onClick(e, 'forum'), [onClick])}>Forum</Button>
            <Button id='btn-profile' onClick={useCallback((e) => onClick(e, 'profile'), [onClick])}>Profile</Button>
        </Box>
    )
}

export const HomeTSX = withStyles(styles)(withRouter(Home))
