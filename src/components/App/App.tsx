import React from 'react'
import {NoSsr, ThemeProvider} from '@material-ui/core'
import {unstable_createMuiStrictModeTheme} from '@material-ui/core/styles'
import {MainRouter} from '../routers/MainRouter/MainRouter'
import {ErrorBoundary} from '../ErrorBoundary/ErrorBoundary'
import {AlertProvider} from '../UI/Alert/AlertProvider/AlertProvider'
import {AlertUI} from '../UI/Alert/AlertUI'
import {Layout} from '../Layout/index'

const theme = unstable_createMuiStrictModeTheme()

export function App() {
    return (
        <ErrorBoundary>
            <ThemeProvider theme={theme}>
                <AlertProvider>
                    <NoSsr>
                        <AlertUI/>
                        <Layout>
                            <MainRouter/>
                        </Layout>
                    </NoSsr>
                </AlertProvider>
            </ThemeProvider>
        </ErrorBoundary>
    )
}
