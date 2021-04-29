import {WithStyles} from '@material-ui/core'
import {styles} from './styles'

export type Props = {
    cb: (content?: string) => void,
} & WithStyles<typeof styles>
