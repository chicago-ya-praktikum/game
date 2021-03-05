import {WithStyles} from '@material-ui/core'
import {styles} from './styles'

export type Props = {
    children: React.ReactNode
} & WithStyles<typeof styles>
