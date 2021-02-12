import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MainRouter } from '../routers/MainRouter/MainRouter'

export const App: FC = () => {
    return (
        < BrowserRouter>
            <MainRouter/>
        </BrowserRouter>
    )
}
