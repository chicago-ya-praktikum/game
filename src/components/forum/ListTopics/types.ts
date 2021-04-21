import {WithStyles} from '@material-ui/core'
import {styles} from './styles'

export type Props = {
    cb?: (topicId: number) => void
} & WithStyles<typeof styles>

export type RowTopic = {
    id: number,
    userId: number,
    title: string
}
