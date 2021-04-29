import React, {useEffect, useState} from 'react'
import {createMuiTheme, CssBaseline, NoSsr} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/core/styles'
import {MainRouter} from '../routers/MainRouter/MainRouter'
import {ErrorBoundary} from '../ErrorBoundary/ErrorBoundary'
import {AlertProvider} from '../UI/Alert/AlertProvider/AlertProvider'
import {AlertUI} from '../UI/Alert/AlertUI'
import {Layout} from '../LayOut'
import {OauthRedirect} from '../oauth/OauthRedirect/index'
import {appThemeSelector} from '../../store/selectors'
import {AppTheme} from '../../enums/AppTheme'

export function App() {
    const getTheme = (type: AppTheme) => createMuiTheme({
        palette: {
            type
        }
    })

    const [theme, setTheme] = useState(getTheme(AppTheme.Dark))

    const type = appThemeSelector()

    useEffect(() => {
        setTheme(getTheme(type))
    }, [type])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
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
        </ThemeProvider>
    )
}
