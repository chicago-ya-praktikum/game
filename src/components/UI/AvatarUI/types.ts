import {WithStyles} from '@material-ui/core'
import {styles} from './styles'

export type Props = {
    showBtn?: boolean
} & WithStyles<typeof styles>
