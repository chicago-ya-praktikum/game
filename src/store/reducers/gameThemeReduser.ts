import {Actions} from '../actions'

enum Theme {
    SAND = 'sand',
    STONE = 'stone'
}

type ThemeReducer = {
    ground: string | null
    box: string
    walls: string
}

const defaultReducer: ThemeReducer = {
    ground: Theme.SAND,
    box: 'metall',
    walls: 'bricks'
}

export function themeReducer(state: ThemeReducer = defaultReducer,
    action: {type: Actions, payload: any}): ThemeReducer {
    switch (action.type) {
        case Actions.SWITCH_TO_SAND_THEME:
            return {
                ...state,
                ground: Theme.SAND
            }
        case Actions.SWITCH_TO_STONE_THEME:
            return {
                ...state,
                ground: Theme.STONE
            }
        default:
            return state
    }
}
