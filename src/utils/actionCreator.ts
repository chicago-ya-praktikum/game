export const actionCreator = (actionType: string, actionPayload?: any) => {
    return {
        type: actionType,
        payload: actionPayload ? actionPayload : null
    }
}