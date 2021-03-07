import {WithStyles} from '@material-ui/core'
import {RouteComponentProps} from 'react-router-dom'
import {styles} from './styles'

export type Props = {
    children: React.ReactNode
} & WithStyles<typeof styles> & RouteComponentProps
