import {WithStyles} from '@material-ui/core'
import {RouteComponentProps} from 'react-router-dom'
import {styles} from './styles'

export type Props = {
} & WithStyles<typeof styles> & RouteComponentProps

export type InputOnBlur = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
export type SelectOnChange = React.ChangeEvent<{name?: string; value: unknown}>
