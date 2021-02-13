import React from 'react'
import {SignUpPage} from '../../pages/SignUp/SignUp'
import { BrowserRouter } from 'react-router-dom'
import { MainRouter } from '../routers/MainRouter/MainRouter'

export function App() {
    return (
        <BrowserRouter>
            <MainRouter/>
            <div className="workspace__wrapper">
                <h1>SOKOBAN</h1>
                <SignUpPage/>
            </div>
        </BrowserRouter>
    )
}
