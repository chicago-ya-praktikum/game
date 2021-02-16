import { WithStyles } from "@material-ui/core"
import { styles } from './styles'

export type Props = {

    // error?: string,
    // errorInfo?: string
    // hideBtn?: boolean

} & WithStyles<typeof styles>

export type State = {
    nickname: string
}
