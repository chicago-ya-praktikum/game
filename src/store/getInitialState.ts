import { RouterState } from 'connected-react-router'
import { initialState as user, State } from './reducers/user/state'
import { initialState as auth } from './reducers/auth/state';

export const getInitialState = (pathname: string = '/') => {
    return {
        user,
        auth,
        router: {
            location: { pathname, search: '', hash: '', key: '' },
            action: 'POP',
        } as RouterState,
    };
};
