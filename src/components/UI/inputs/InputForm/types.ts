import {WithStyles} from '@material-ui/core'
import { FocusEventHandler } from 'react'
import { FormField } from '../../../../types/formTypes'
import {styles} from './styles'

export type Props = {
    onBlur: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>
    field: FormField
} & WithStyles<typeof styles>
