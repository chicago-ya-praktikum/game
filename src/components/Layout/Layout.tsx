import React, {FC} from 'react'
import {
    AppBar, Button, Container, Grid, IconButton, Typography, withStyles
} from '@material-ui/core'
import {withRouter} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import {useSelector} from 'react-redux'
import {Props} from './types'
import {styles} from './styles'
import {
    routeSignin, routeSignup, routeProfile, routeHome
} from '../routers/MainRouter/constants'
import {userLoginSelector} from '../../store/selectors'
import {useTypedSelector} from '../../hooks/useTypedSelector'

const Layout: FC<Props> = (props: Props) => {
    const {children, classes, history} = props
    // const userId = userIdSelector(useTypedSelector(rootState => rootState))
    const userLogin = userLoginSelector(useTypedSelector(rootState => rootState))
    const title = history.location.pathname.substr(1) || 'home'

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, route: string) => {
        e.preventDefault()
        history.push(route)
    }

    const UserCell = () => {
        // if (userId === 0) {
        console.log('Layout isAuth', useSelector((state: {userAsync: any, user: any}) => state.userAsync.authStatus || state.user.authStatus))
        // eslint-disable-next-line max-len
        if (!useSelector((state: {userAsync: any, user: any}) => state.userAsync.authStatus || state.user.authStatus)) {
            return (
                <>
                    <Button color='inherit' onClick={(e) => onClick(e, routeSignin)}>Log in</Button>
                    <Button color='inherit' onClick={(e) => onClick(e, routeSignup)}>Sign up</Button>
                </>
            )
        }

        return (
            <>
                <Button color='inherit' onClick={(e) => onClick(e, routeProfile)}>{userLogin}</Button>
            </>
        )
    }

    return (
        <>
            <AppBar position='relative'>
                <Container fixed>
                    <Grid container spacing={3} alignItems='center'>
                        <Grid item sm={3}>
                            <IconButton color='inherit' onClick={(e) => onClick(e, routeHome)}>
                                <HomeIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item sm={6}>
                            <Typography className={classes.title} align='center' variant='h5'>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item sm={3}>
                            <Grid container spacing={3} alignItems='center' justify='flex-end'>
                                <UserCell/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
            {children}
        </>
    )
}
export const LayoutTSX = withStyles(styles)(withRouter(Layout))
