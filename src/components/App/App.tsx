import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {MainRouter} from '../routers/MainRouter/MainRouter'
import {ErrorBoundary} from '../ErrorBoundary/ErrorBoundary'

export function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <MainRouter/>
            </BrowserRouter>
        </ErrorBoundary>
    )
}
