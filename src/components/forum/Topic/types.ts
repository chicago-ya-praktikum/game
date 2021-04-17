import {WithStyles} from '@material-ui/core'
import {styles} from './styles'

export type Props = {
    cb?: () => void,
    rights?: 'edit' | 'view'
} & WithStyles<typeof styles>
