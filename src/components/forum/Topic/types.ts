import {WithStyles} from '@material-ui/core'
import {styles} from './styles'

export type Props = {
    cb?: () => void,
    rights?: 'edit' | 'view',
    id?: number
} & WithStyles<typeof styles>

export type InputOnBlur = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
