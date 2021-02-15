import { WithStyles } from "@material-ui/core"
import { styles } from './styles'

export type FunctionOnBlur = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void

export type Props = {

    id: string,
    label: string,
    name?: string,
    error?: boolean,
    color?: 'primary' | 'secondary',
    variant?: string
    onBlur?: FunctionOnBlur

} & WithStyles<typeof styles>
