import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import Leaderboard from '../../../pages/Leaderboard/index'

export const PageHome           = () => <h1>home</h1> 
export const PageLeaderboard    = Leaderboard 
export const PageForum          = () => <h1>forum</h1> 
export const PageGame           = () => <h1>game</h1> 
export const PageProfile        = () => <h1>profile</h1> 
export const PageSignup         = () => <h1>signup</h1> 
export const PageSignin         = () => <h1>signin</h1> 
export const PageError          = () => <h1>error</h1> 

export const routeHome          = '/'
export const routeLeaderboard   = '/leaderboard'
export const routeForum         = '/forum'
export const routeGame          = '/game'
export const routeProfile       = '/profile'
export const routeSignup        = '/signup'
export const routeSignin        = '/signin'

export const MainRouter: FC = () => {
    
    return (
        <Switch>
            <Route path={ routeHome }         exact component={ PageHome } />
            <Route path={ routeLeaderboard }  exact component={ PageLeaderboard } />
            <Route path={ routeForum }        exact component={ PageForum } />
            <Route path={ routeGame }         exact component={ PageGame } />
            <Route path={ routeProfile }      exact component={ PageProfile } />
            <Route path={ routeSignup }       exact component={ PageSignup } />
            <Route path={ routeSignin }       exact component={ PageSignin } />
            <Route component={ PageError } />
        </Switch>
    )
}
