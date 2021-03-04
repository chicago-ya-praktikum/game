import {WithStyles} from '@material-ui/core'
import {styles} from './styles'

export type Props = {

} & WithStyles<typeof styles>

export type State = {
    nickname: string
}

export type Field = {
    val: string,
    err: boolean,
    required?: boolean
}

export type Setter = React.Dispatch<React.SetStateAction<Field>>
export type InputOnBlur = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
export type SelectOnChange = React.ChangeEvent<{ name?: string; value: unknown }>
