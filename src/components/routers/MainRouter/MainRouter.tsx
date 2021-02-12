import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
//import { Hi } from './Hi'

export const pageHome           = () => <h1>home</h1> 
//export const pageHome           = Hi 
export const pageLeaderboard    = () => <h1>leaderboard</h1> 
export const pageForum          = () => <h1>forum</h1> 
export const pageGame           = () => <h1>game</h1> 
export const pageProfile        = () => <h1>profile</h1> 
export const pageSignup         = () => <h1>signup</h1> 
export const pageSignin         = () => <h1>signin</h1> 
export const pageError          = () => <h1>error</h1> 
export const a = 5

export const MainRouter: FC = () => {
    
    return (
        <div >
            <Switch>
                <Route path='/'             exact component={ pageHome } />
                <Route path='/leaderboard'  exact component={ pageLeaderboard } />
                <Route path='/forum'        exact component={ pageForum } />
                <Route path='/game'         exact component={ pageGame } />
                <Route path='/profile'      exact component={ pageProfile } />
                <Route path='/signup'       exact component={ pageSignup } />
                <Route path='/signin'       exact component={ pageError } />
                <Route component={ pageError } />
            </Switch>
        </div>  
    )
}
