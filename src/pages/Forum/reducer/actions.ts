import {Actions} from './EnumActions'
import {Action} from './types'

export const setVisibleList = (): Action => ({
    type: Actions.SET_VISIBLE_LIST
})

export const setVisibleTopic = (topicId: number = 0, newTopic: boolean = false): Action => ({
    type: Actions.SET_VISIBLE_TOPIC,
    payload: {topicId, newTopic}
})

export const setAvailable = (): Action => ({
    type: Actions.SET_AVAILABLE
})
