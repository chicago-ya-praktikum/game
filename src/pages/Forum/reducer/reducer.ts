import {Actions} from './EnumActions'
import {State, Action} from './types'

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case Actions.SET_VISIBLE_LIST: {
            return {
                ...state,
                topicId: 0,
                visible:
                {
                    ...state.visible,
                    head: true,
                    list: true,
                    topic: false
                }
            }
        }
        case Actions.SET_VISIBLE_TOPIC: {
            return {
                ...state,
                topicId: Number(action.payload?.topicId),
                newTopic: Boolean(action.payload?.newTopic),
                visible:
                {
                    ...state.visible,
                    head: false,
                    list: false,
                    topic: true
                }
            }
        }
        case Actions.SET_AVAILABLE: {
            return {
                ...state,
                available: true
            }
        }
        default:
            return state
    }
}
