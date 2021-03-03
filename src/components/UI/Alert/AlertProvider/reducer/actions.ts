import {Severity} from './types'

export enum Actions {
    VISIBLE_ON = 'VISIBLE_ON',
    VISIBLE_OFF = 'VISIBLE_OFF',
    VISIBLE_INVERT = 'VISIBLE_INVERT'
}

export type Action = {
    type: Actions
    payload?: {
        severity: Severity,
        text: string
    }
}

export const visibleInvert = (): Action => ({type: Actions.VISIBLE_INVERT})
export const visibleOff = (): Action => ({type: Actions.VISIBLE_OFF})
export const visibleOn = (severity: Severity, text: string): Action => ({
    type: Actions.VISIBLE_ON,
    payload: {severity, text}
})
