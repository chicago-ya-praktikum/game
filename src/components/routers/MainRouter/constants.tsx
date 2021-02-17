import React from 'react'
import {Leaderboard} from '../../../pages/Leaderboard/index'
import {SignInPage} from '../../../pages/SignIn/SignIn'
import {LayOut} from '../../LayOut/index'
import {SignUpPage} from '../../../pages/SignUp/SignUp'

export const PageHome = () => <h1>home</h1>
export const PageLeaderboard = Leaderboard
export const PageForum = () => <h1>forum</h1>
export const PageGame = LayOut
export const PageProfile = () => <h1>profile</h1>
export const PageSignup = SignUpPage
export const PageSignin = SignInPage
export const PageError = () => <h1>error</h1>

export const routeHome = '/'
export const routeLeaderboard = '/leaderboard'
export const routeForum = '/forum'
export const routeGame = '/game'
export const routeProfile = '/profile'
export const routeSignup = '/signup'
export const routeSignin = '/signin'
