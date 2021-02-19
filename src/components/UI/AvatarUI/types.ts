import { WithStyles } from '@material-ui/core'
import { styles } from './styles'

export type Props = {

    cb?: (param: string) => void,
    showBtn?: boolean

} & WithStyles<typeof styles>
