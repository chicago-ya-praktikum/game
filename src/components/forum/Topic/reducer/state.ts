import {getDefaultFormField} from '../../../../utils/getDefaultFormField'

export const fields = {
    topicId: getDefaultFormField('topicId', 'ID', {required: false}),
    topicTitle: getDefaultFormField('topicTitle', 'Title'),
    topicContent: getDefaultFormField('topicContent', 'Content')
}

export const initialState = {
    fields,
    init: false,
    readOnly: true
}
