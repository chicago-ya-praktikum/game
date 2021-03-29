import {Severity} from './types'

export const initialState = {
    visible: false,
    severity: <Severity>'error',
    text: ''
}

export type State = typeof initialState
