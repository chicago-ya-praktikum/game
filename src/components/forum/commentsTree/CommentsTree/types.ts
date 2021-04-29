import {WithStyles} from '@material-ui/core'
import {styles} from './styles'

export type Props = {
    topicId: number
} & WithStyles<typeof styles>

export type Tree = {
    id: string
    name: string
    content: string
    date: string
    children?: Tree[]
}

export type TreeObj = {
    root: Tree,
    nodes: string[]
}
