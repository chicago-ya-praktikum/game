import React, {
    createContext, FC, useContext, useReducer
} from 'react'
import {Severity} from './reducer/types'
import {State, initialState} from './reducer/state'
import {visibleOn, visibleOff, visibleInvert} from './reducer/actions'
import {reducer} from './reducer/reducer'

export type Context = {
    alertShow: (severity: Severity, text: string) => void,
    alertHide: () => void,
    alertToggle: () => void
} & State

export const AlertContext = createContext<Context>({
    visible: false,
    text: '',
    severity: 'error',
    alertShow: () => {},
    alertHide: () => {},
    alertToggle: () => {}
})

export const useAlert = (): Context => useContext(AlertContext)

declare global {
    interface Window {
        alertShow: (severity: Severity, text: string) => void
        alertHide: () => void
        alertToggle: () => void
    }
}

// eslint-disable-next-line react/prop-types
export const AlertProvider: FC = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const alertShow = (severity: Severity, text: string) => dispatch(visibleOn(severity, text))
    const alertHide = () => dispatch(visibleOff())
    const alertToggle = () => dispatch(visibleInvert())

    const {visible, text, severity} = state

    window.alertShow = alertShow
    window.alertHide = alertHide
    window.alertToggle = alertToggle

    return (
        <AlertContext.Provider value={{
            severity, visible, text, alertShow, alertHide, alertToggle
        } as Context}
        >
            {children}
        </AlertContext.Provider>
    )
}
