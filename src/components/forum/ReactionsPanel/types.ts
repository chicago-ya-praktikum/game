import {WithStyles} from '@material-ui/core'
import {styles} from './styles'

export type Props = {
    topicId: number
} & WithStyles<typeof styles>
