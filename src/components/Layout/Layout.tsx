import React, {
    FC, useCallback, useEffect
} from 'react'
import {
    AppBar, Button, Container, Grid, IconButton, Typography, withStyles
} from '@material-ui/core'
import {withRouter} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import {useDispatch} from 'react-redux'
import {Props} from './types'
import {styles} from './styles'
import {
    routeSignin, routeSignup, routeProfile, routeHome
} from '../routers/MainRouter/constants'
import {authStatusSelector, userInfoPropSelector, userInitSelector} from '../../store/selectors'
import {getUserData} from '../../store/reducers/user/thunks'
import {AvatarUI} from '../UI/AvatarUI/index'

const Layout: FC<Props> = (props: Props) => {
    const {children, classes, history} = props
    const dispatchStore = useDispatch()
    const userLogin = userInfoPropSelector('login')
    const authStatus = authStatusSelector()
    // const init = userInitSelector()
    // const [didMount, setDidMount] = useState(false)
    const title = ''

    // useEffect(() => {
    //     if (!init || !didMount) return
    //     dispatchStore(getUserData())
    // }, [authStatus])

    useEffect(() => {
        console.log('IS_SSR', IS_SSR)
        // if (!didMount) setDidMount(true)
        // if (init) return
        dispatchStore(getUserData())
    }, [authStatus])

    const onClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, route: string) => {
            e.preventDefault()
            history.push(route)
        }, [history]
    )

    const UserCell = () => {
        if (!authStatus) {
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
                <AvatarUI/>
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
