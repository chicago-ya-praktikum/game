import React, { FC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export const MainRouter: FC = () => {
    return (
        <Router>
            <Switch>
                <Route path='/'             exact component={ () => <h1>/home</h1> } />
                <Route path='/leaderboard'  exact component={ () => <h1>/leaderboard</h1> } />
                <Route path='/forum'        exact component={ () => <h1>/forum</h1> } />
                <Route path='/game'         exact component={ () => <h1>/game</h1> } />
                <Route path='/profile'      exact component={ () => <h1>/profile</h1> } />
                <Route path='/auth'         exact component={ () => <h1>/auth</h1> } />
                <Route component={ () => <h1>error</h1> } />
            </Switch>
        </Router>  
    )
}
