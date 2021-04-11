import {WithStyles} from '@material-ui/core'
import {styles} from './styles'

export type Props = {
    cb?: (topicId: string) => void
} & WithStyles<typeof styles>
