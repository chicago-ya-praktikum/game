import {validateInput} from '@utils'
import {noActions, setField, fillFields} from './actions'
import {Action, Fields, FieldsKeys} from './types'

export const preSetField = (fields: Fields, name: string, val: string): Action => {
    const stateField = fields[<FieldsKeys>name]
    if (val === stateField.val) return noActions()
    const err = !validateInput(String(name), val, stateField.required)
    return setField(
        name,
        {
            ...stateField,
            val,
            err
        }
    )
}

export const preFillFields = (fieldsOld: Fields, res: any): Action => {
    const fields = {...fieldsOld}
    const {record} = res
    fields.topicId.val = record.id
    fields.topicTitle.val = record.title
    fields.topicContent.val = record.content

    return fillFields(fields)
}
