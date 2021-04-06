import React, {Component} from 'react'
import {ClientManager} from '../Manager/ClientManager'
import {CookiesContext} from './context'
import {Props} from './types'

// eslint-disable-next-line react/prefer-stateless-function
export class CookiesProvider extends Component<Props> {
    // eslint-disable-next-line react/static-property-placement
    static defaultProps = {
        manager: new ClientManager()
    }

    render() {
        const {manager, children} = this.props

        return (
            <CookiesContext.Provider value={{manager}}>
                {children}
            </CookiesContext.Provider>
        )
    }
}
