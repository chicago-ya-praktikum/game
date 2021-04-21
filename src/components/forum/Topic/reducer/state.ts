import {getDefaultFormField} from '../../../../utils/getDefaultFormField'

export const fields = {
    topicId: getDefaultFormField('topicId', 'ID', {required: false}),
    topicTitle: getDefaultFormField('topicTitle', 'Title'),
    topicContent: getDefaultFormField('topicContent', 'Content')
}

export const initialState = {
    fields,
    init: false
}

export type State = typeof initialState
export type Fields = typeof fields
export type FieldsKeys = keyof Fields
