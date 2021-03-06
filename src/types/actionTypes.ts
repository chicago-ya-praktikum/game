import {Action} from 'redux'
import {FormField} from './formTypes'

export type FormAction = {
    payload?: FormFieldPayload
} & Action

export type FormFieldPayload = {
    [key: string]: FormField | string | number | boolean
}
