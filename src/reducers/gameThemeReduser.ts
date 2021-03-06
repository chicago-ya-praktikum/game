import {Actions} from '../actions'

enum Theme {
    SAND = 'sand'
}

type ThemeReducer = {
    ground: string | null
    box: string
    walls: string
}

const defaultReducer: ThemeReducer = {
    ground: null,
    box: 'metall',
    walls: 'bricks'
}

export function themeReducer(state: ThemeReducer = defaultReducer,
    action: { type: Actions, payload: any }): ThemeReducer {
    switch (action.type) {
        case Actions.SWITCH_TO_SAND_THEME:
            return {
                ...state,
                ground: Theme.SAND
            }
        default:
            return state
    }
}
