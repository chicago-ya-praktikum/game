import {Actions, Action} from './actions'
import {State} from './state'

export const reducer = (state: State, action: Action): State => {
    const {payload} = action
    switch (action.type) {
        case Actions.VISIBLE_ON:
            if (!payload) return state
            return {
                ...state,
                visible: true,
                severity: payload.severity,
                text: payload.text
            }
        case Actions.VISIBLE_OFF:
            return {...state, visible: false}
        case Actions.VISIBLE_INVERT:
            return {...state, visible: !state.visible}
        default:
            return state
    }
}
