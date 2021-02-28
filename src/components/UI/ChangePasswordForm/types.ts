import { WithStyles } from '@material-ui/core'
import { styles } from './styles'

export type Props = {

} & WithStyles<typeof styles>

export type Field = {
    val: string,
    err: boolean,
    required?: boolean
}

export type Setter = React.Dispatch<React.SetStateAction<Field>>
