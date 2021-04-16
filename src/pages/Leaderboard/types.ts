import {WithStyles} from '@material-ui/core'
import {styles} from './styles'
import {ratingFieldName} from '../../contstants/apiYandex/ratingFieldName'

// LB - Leaderboard
export type LBItem = {
    id: number,
    login: string,
    points: number,
    mark: boolean,
    [ratingFieldName]?: number,
    key?: number
}

export type Props = {

} & WithStyles<typeof styles>
