import React from 'react'
import { SignUpPage } from '../../../pages/SignUp/SignUp'
import { Profile } from '../../../pages/Profile/index'

export const PageHome           = () => <h1>home</h1>
export const PageLeaderboard    = () => <h1>leaderboard</h1>
export const PageForum          = () => <h1>forum</h1>
export const PageGame           = () => <h1>game</h1>
export const PageProfile        = Profile
export const PageSignup         = SignUpPage
export const PageSignin         = () => <h1>signin</h1>
export const PageError          = () => <h1>error</h1>

export const routeHome          = '/'
export const routeLeaderboard   = '/leaderboard'
export const routeForum         = '/forum'
export const routeGame          = '/game'
export const routeProfile       = '/profile'
export const routeSignup        = '/signup'
export const routeSignin        = '/signin'
