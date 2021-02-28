import React from 'react'
import {Leaderboard} from '../../../pages/Leaderboard/index'
import {SignInPage} from '../../../pages/SignIn/SignIn'
import {LayOut} from '../../LayOut/index'
import {SignUpPage} from '../../../pages/SignUp/SignUp'
import { Profile } from '../../../pages/Profile/index'
import { Err } from '../../../pages/Err/index'

export const PageHome           = () => <h1>home</h1>
export const PageLeaderboard    = Leaderboard
export const PageForum          = () => <h1>forum</h1>
export const PageGame           = LayOut
export const PageProfile        = Profile
export const PageSignup         = SignUpPage
export const PageSignin         = SignInPage
export const PageError          = Err

export const routeHome          = '/'
export const routeLeaderboard   = '/leaderboard'
export const routeForum         = '/forum'
export const routeGame          = '/game'
export const routeProfile       = '/profile'
export const routeSignup        = '/signup'
export const routeSignin        = '/signin'
