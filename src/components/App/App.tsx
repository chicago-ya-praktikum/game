import React, {useEffect, useState} from 'react'
import {createMuiTheme, CssBaseline, NoSsr} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/core/styles'
import {useDispatch} from 'react-redux'
import {Actions} from '@state/actions'
import {actionCreator} from '@utils'
import {MainRouter} from '../routers/MainRouter/MainRouter'
import {ErrorBoundary} from '../ErrorBoundary/ErrorBoundary'
import {AlertProvider} from '../UI/Alert/AlertProvider/AlertProvider'
import {AlertUI} from '../UI/Alert/AlertUI'
import {OauthRedirect} from '../oauth/OauthRedirect/index'
import {appThemeSelector, userInfoSelector} from '../../store/selectors'
import {AppTheme} from '../../enums/AppTheme'
import {Layout} from '../Layout/Layout'
import {logIn} from '../../pages/Forum/utils'
import {OurApi} from '../../API'

export function App() {
    const getTheme = (type: AppTheme) => createMuiTheme({
        palette: {
            type
        }
    })

    const userInfo = userInfoSelector()
    const [theme, setTheme] = useState(getTheme(AppTheme.Dark))
    const type = appThemeSelector()
    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo) {
            logIn(userInfo)
                .then(() => OurApi.theme(userInfo.id)
                    .then(response => {
                        const actionTheme = response.themeName === AppTheme.Dark
                            ? Actions.APP_THEME_DARK : Actions.APP_THEME_LIGHT
                        dispatch(actionCreator(actionTheme))
                    }))
        }
    }, [])

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
