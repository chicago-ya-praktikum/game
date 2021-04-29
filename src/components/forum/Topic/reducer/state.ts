import {getDefaultFormField} from '@utils'

export const fields = {
    topicId: getDefaultFormField('topicId', 'ID', {required: false}),
    topicTitle: getDefaultFormField('topicTitle', 'Title'),
    topicContent: getDefaultFormField('topicContent', 'Content'),
    topicAuthor: getDefaultFormField('topicAuthor', 'Author', {required: false})
}

export const initialState = {
    fields,
    init: false,
    readOnly: true,
    error: false
}
