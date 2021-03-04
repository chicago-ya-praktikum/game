enum Actions {
    INCREMENT = 'INCREMENT',
    DECREMENT = 'DECREMENT'
}

export function countReducer(state: number = 0, action: { type: Actions }): number {
    switch (action.type) {
        case Actions.INCREMENT:
            return state + 1;
        case Actions.DECREMENT:
            return state - 1;
        default:
            return state;
    }
}
