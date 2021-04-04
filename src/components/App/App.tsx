import React from 'react'
import {MainRouter} from '../routers/MainRouter/MainRouter'
import {ErrorBoundary} from '../ErrorBoundary/ErrorBoundary'
import {AlertProvider} from '../UI/Alert/AlertProvider/AlertProvider'
import {AlertUI} from '../UI/Alert/AlertUI'
import {Layout} from '../Layout/index'

export function App() {
    return (
        <ErrorBoundary>
            <AlertProvider>
                <AlertUI/>
                <Layout>
                    <MainRouter/>
                </Layout>
            </AlertProvider>
        </ErrorBoundary>
    )
}
