import {GameTSX} from './Game'
import {privateRoute} from '../../HOCs/privateRoute'

export const Game = privateRoute(GameTSX)
