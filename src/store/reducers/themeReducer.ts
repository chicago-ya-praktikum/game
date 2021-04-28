import {Actions} from '../actions'
import {AppTheme} from '../../enums/AppTheme'

interface ActionToTheme {
    [_: string]: AppTheme
}

const actionToTheme: ActionToTheme = {
    [Actions.APP_THEME_LIGHT]: AppTheme.Light,
    [Actions.APP_THEME_DARK]: AppTheme.Dark
}

export function themeReducer(
    state: AppTheme = AppTheme.Dark,
    action: {type: Actions, payload: any}
) {
    return actionToTheme[action.type] ?? state
}
