import React, {FC, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {
    PageError, PageForum, PageGame, PageHome, PageLeaderboard, PageProfile, PageSignin, PageSignup,
    routeForum, routeGame, routeHome, routeLeaderboard, routeProfile, routeSignin, routeSignup
} from './constants'
import {Actions} from '../../../actions'
import {Auth} from '../../../API'

export const MainRouter: FC = () => {
    const dispatch = useDispatch()

    function createCheckStatusAction(data: any) {
        return {
            type: Actions.APPLOAD,
            payload: data
        }
    }

    const userLogIn = () => {
        const getResponse = () => Auth.user().then(data => dispatch(createCheckStatusAction(data)))
        return getResponse()
    }
    useEffect(() => {
        userLogIn()
    })

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
