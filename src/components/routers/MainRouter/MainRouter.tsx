import React, {FC, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {
    PageError, PageForum, PageGame, PageHome, PageLeaderboard, PageProfile, PageSignin, PageSignup,
    routeForum, routeGame, routeHome, routeLeaderboard, routeProfile, routeSignin, routeSignup
} from './constants'
import {getUserData} from '../../../store/reducers/user/actions'

export const MainRouter: FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {dispatch(getUserData())})

    return (
        <Switch>
            <Route path={routeHome} exact component={PageHome}/>
            <Route path={routeLeaderboard} exact component={PageLeaderboard}/>
            <Route path={routeForum} exact component={PageForum}/>
            <Route path={routeGame} exact component={PageGame}/>
            <Route path={routeProfile} exact component={PageProfile}/>
            <Route path={routeSignup} exact component={PageSignup}/>
            <Route path={routeSignin} exact component={PageSignin}/>
            <Route component={PageError}/>
        </Switch>
    )
}
