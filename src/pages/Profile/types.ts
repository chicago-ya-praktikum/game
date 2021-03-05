import {WithStyles} from '@material-ui/core'
import {styles} from './styles'

export type Props = {
} & WithStyles<typeof styles>

export type InputOnBlur = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
export type SelectOnChange = React.ChangeEvent<{ name?: string; value: unknown }>
