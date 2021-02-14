import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MainRouter } from '../routers/MainRouter/MainRouter'

export function App() {
    return (
        <BrowserRouter>
            <MainRouter/>
        </BrowserRouter>
    )
}
