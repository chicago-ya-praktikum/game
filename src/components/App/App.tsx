import React from 'react'
import {NoSsr} from '@material-ui/core'
import {MainRouter} from '../routers/MainRouter/MainRouter'
import {ErrorBoundary} from '../ErrorBoundary/ErrorBoundary'
import {AlertProvider} from '../UI/Alert/AlertProvider/AlertProvider'
import {AlertUI} from '../UI/Alert/AlertUI'
import {Layout} from '../Layout/index'
import {OauthRedirect} from '../oauth/OauthRedirect/index'

export function App() {
    return (
        <ErrorBoundary>
            <OauthRedirect/>
            <AlertProvider>
                <NoSsr>
                    <AlertUI/>
                    <Layout>
                        <MainRouter/>
                    </Layout>
                </NoSsr>
            </AlertProvider>
        </ErrorBoundary>
    )
}
