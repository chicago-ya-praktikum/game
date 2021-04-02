import {Actions} from '../actions'
import {GameTheme} from '../../GameCore/enums/GameTheme'

interface ActionToTheme {
    [_: string]: GameTheme
}

const actionToTheme: ActionToTheme = {
    [Actions.SAND_THEME]: GameTheme.Sand,
    [Actions.BASIC_THEME]: GameTheme.Basic,
    [Actions.STONE_THEME]: GameTheme.Stone
}

export function themeReducer(state: GameTheme = GameTheme.Stone,
    action: {type: Actions, payload: any}): GameTheme {
    return actionToTheme[action.type] ?? state
}
