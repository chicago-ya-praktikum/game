import {LeaderboardTSX} from './Leaderboard'
import {privateRoute} from '../../HOCs/privateRoute'

export const Leaderboard = privateRoute(LeaderboardTSX)
