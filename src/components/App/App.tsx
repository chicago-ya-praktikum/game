import React from 'react'
import {NoSsr} from '@material-ui/core'
import {MainRouter} from '../routers/MainRouter/MainRouter'
import {ErrorBoundary} from '../ErrorBoundary/ErrorBoundary'
import {AlertProvider} from '../UI/Alert/AlertProvider/AlertProvider'
import {AlertUI} from '../UI/Alert/AlertUI'
import {Layout} from '../Layout/index'
import {apiPostYandexOauth} from '../../services/API/index'

if (IS_CLIENT) {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (code) {
        apiPostYandexOauth(code)
            .then((res) => console.log('Oauth', res))
        // if (resApi.data !== 'OK') {
        //     console.log('Oauth: something went wrong')
        // }
    }
}

export function App() {
    return (
        <ErrorBoundary>
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
