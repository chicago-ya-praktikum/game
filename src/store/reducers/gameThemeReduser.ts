import {Actions} from '../actions'

enum GroundTheme {
    SAND = 'sand',
    STONE = 'stone'
}

export type ThemeReducer = {
    ground: string
    box: string
    walls: string
    player: string
}

const defaultReducer: ThemeReducer = {
    ground: GroundTheme.SAND,
    box: 'metall',
    walls: 'bricks',
    player: 'human'
}

export function themeReducer(state: ThemeReducer = defaultReducer,
    action: {type: Actions, payload: any}): ThemeReducer {
    switch (action.type) {
        case Actions.SWITCH_TO_SAND_THEME:
            return {
                ...state,
                ground: GroundTheme.SAND
            }
        case Actions.SWITCH_TO_STONE_THEME:
            return {
                ...state,
                ground: GroundTheme.STONE
            }
        default:
            return state
    }
}
