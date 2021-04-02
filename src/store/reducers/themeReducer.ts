import {Actions} from '../actions'
import {GameTheme} from '../../GameCore/enums/GameTheme'

export function themeReducer(state: GameTheme = GameTheme.Stone,
    action: {type: Actions, payload: any}): GameTheme {
    switch (action.type) {
        case Actions.SAND_THEME:
            return GameTheme.Sand
        case Actions.STONE_THEME:
            return GameTheme.Stone
        case Actions.BASIC_THEME:
            return GameTheme.Basic
        default:
            return state
    }
}
