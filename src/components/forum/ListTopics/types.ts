import {WithStyles} from '@material-ui/core'
import {styles} from './styles'

export type Props = {
    cb: (topicId: number) => void
} & WithStyles<typeof styles>

export type RowTopic = {
    userId: number,
    id: number,
    title: string
    content: string,
    createdAt: string,
    updatedAt: string,
    user: {
        displayName: string,
        avatar: string | null
    }
}
