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

export const defaultState: GameTheme = GameTheme.Stone

export function gameThemeReducer(
    state: GameTheme = defaultState,
    action: {type: Actions, payload: any}
): GameTheme {
    return actionToTheme[action.type] ?? state
}
