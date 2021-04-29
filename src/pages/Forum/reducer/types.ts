import {Action as ReduxAction} from 'redux'
import {initialState, visible} from './state'

export type Action = {
    payload?: Payload
} & ReduxAction

export type Payload = {
    [key: string]: string | number | boolean
}

export type State = typeof initialState
export type Visible = typeof visible
