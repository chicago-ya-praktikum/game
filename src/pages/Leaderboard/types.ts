//import { FC } from 'react'
import { WithStyles } from '@material-ui/core'
import { styles } from './styles'

// LB - Leaderboard
export type LBItem = {
    id: string,
    login: string,
    points: number,
    mark: boolean  
}

export type Props = {
  
} & WithStyles<typeof styles>

//export type Props = FC<OwnProps>