import {WithStyles} from '@material-ui/core'
import {styles} from './styles'

export type Props = {
    cb: () => void,
    id: number,
    isNew: boolean
} & WithStyles<typeof styles>

export type InputOnBlur = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
